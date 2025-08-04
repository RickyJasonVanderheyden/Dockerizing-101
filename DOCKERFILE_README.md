# Dockerfile Explanation

This document explains each part of the Dockerfile used to containerize the FocusFlow Next.js application.

## 🐳 Complete Dockerfile Breakdown

```dockerfile
# Use the official Node.js 18 Alpine image as base
FROM node:18-alpine AS base
```
**Purpose:** Sets the base image to Node.js 18 with Alpine Linux (lightweight Linux distribution)
**Why Alpine:** Smaller image size, better security, faster builds

---

## 📦 Dependencies Stage

```dockerfile
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci
```

**Line-by-line explanation:**
- `FROM base AS deps` - Creates a new stage named "deps" from the base image
- `RUN apk add --no-cache libc6-compat` - Installs compatibility library for Node.js on Alpine
- `WORKDIR /app` - Sets the working directory inside the container
- `COPY package.json package-lock.json* ./` - Copies package files for dependency installation
- `RUN npm ci` - Installs all dependencies (faster and more reliable than `npm install`)

**Why separate stage:** Dependencies change less frequently than code, so this layer gets cached

---

## 🔨 Builder Stage

```dockerfile
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build
```

**Line-by-line explanation:**
- `FROM base AS builder` - Creates build stage from base image
- `COPY --from=deps /app/node_modules ./node_modules` - Copies installed dependencies from deps stage
- `COPY . .` - Copies all source code to the container
- `ENV NEXT_TELEMETRY_DISABLED=1` - Disables Next.js telemetry for privacy
- `RUN npm run build` - Builds the Next.js application for production

**Why this stage:** Separates build process from runtime, creates optimized production build

---

## 🚀 Production Stage

```dockerfile
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
```

**Line-by-line explanation:**

### Environment Setup:
- `ENV NODE_ENV=production` - Sets Node.js to production mode (optimizations, no dev tools)
- `ENV NEXT_TELEMETRY_DISABLED=1` - Disables runtime telemetry

### Security Setup:
- `RUN addgroup --system --gid 1001 nodejs` - Creates system group
- `RUN adduser --system --uid 1001 nextjs` - Creates system user
- `USER nextjs` - Switches to non-root user for security

### File Copying:
- `COPY --from=builder /app/public ./public` - Copies static files
- `RUN mkdir .next` - Creates Next.js cache directory
- `RUN chown nextjs:nodejs .next` - Sets proper ownership
- `COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./` - Copies standalone build
- `COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static` - Copies static assets

### Runtime Configuration:
- `EXPOSE 3000` - Documents that container listens on port 3000
- `ENV PORT=3000` - Sets application port
- `ENV HOSTNAME="0.0.0.0"` - Allows external connections
- `CMD ["node", "server.js"]` - Starts the application

---

## 🎯 Multi-Stage Build Benefits

1. **Smaller Final Image:** Only production files are included
2. **Better Caching:** Dependencies are cached separately from code
3. **Security:** No build tools in production image
4. **Performance:** Optimized for runtime, not development

---

## 🔧 Key Features

- **Alpine Linux:** Lightweight base image (~5MB vs ~300MB for Ubuntu)
- **Non-root User:** Security best practice
- **Standalone Output:** Next.js optimized for containers
- **Layer Caching:** Faster rebuilds when only code changes
- **Production Optimized:** No development dependencies in final image

---

## 📊 Image Size Comparison

- **Single-stage build:** ~500MB
- **Multi-stage build:** ~150MB
- **Savings:** ~70% smaller image

---

## 🚀 Usage

```bash
# Build the image
docker build -t focusflow-landing .

# Run the container
docker run -p 3000:3000 focusflow-landing

# Or use Docker Compose
docker-compose up --build
```

---

## 🔍 Troubleshooting

**Common Issues:**
- **Build fails:** Check if all dependencies are in package.json
- **Permission errors:** Ensure proper file ownership
- **Port conflicts:** Change EXPOSE port if 3000 is in use
- **Memory issues:** Increase Docker memory allocation for builds

**Debug Commands:**
```bash
# Check image layers
docker history focusflow-landing

# Run interactive shell
docker run -it focusflow-landing /bin/sh

# Check container logs
docker logs <container_id>
``` 