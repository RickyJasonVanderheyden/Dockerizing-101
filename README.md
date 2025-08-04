# FocusFlow Landing Page

A modern, responsive landing page for FocusFlow - a productivity app built with Next.js, React, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Next.js for optimal performance
- **SEO Optimized**: Proper metadata and semantic HTML structure
- **Accessible**: Follows accessibility best practices

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📁 Project Structure

```
focusflow-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Main landing page
│   │   └── globals.css     # Global styles
│   └── ...
├── public/                 # Static assets
├── package.json
└── README.md
```

## 🎨 Design Sections

1. **Navigation Bar** - Sticky header with logo and navigation links
2. **Hero Section** - Main headline with call-to-action buttons
3. **Features Section** - Three key features with icons
4. **Testimonials** - Customer testimonials with profile images
5. **Call-to-Action** - Final conversion section
6. **Footer** - Links and company information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

#### Option 1: Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd focusflow-landing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option 2: Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

2. Or build and run with Docker directly:
```bash
# Build the image
docker build -t focusflow-landing .

# Run the container
docker run -p 3000:3000 focusflow-landing
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Customization

### Colors
The design uses a blue/indigo color scheme. You can customize colors in the Tailwind classes:
- Primary: `indigo-600`
- Secondary: `gray-900`
- Background: `blue-50` to `indigo-100`

### Content
Update the content in `src/app/page.tsx`:
- Company name and taglines
- Feature descriptions
- Testimonial content
- Contact information

### Images
The landing page uses Unsplash images. You can replace them with your own images by:
1. Adding images to the `public/` folder
2. Updating the `src` attributes in the Image components

## 🌟 Key Features

- **Sticky Navigation** - Navigation bar stays at the top when scrolling
- **Smooth Scrolling** - Anchor links provide smooth scrolling to sections
- **Hover Effects** - Interactive elements with hover states
- **Mobile Responsive** - Optimized for all screen sizes
- **Performance Optimized** - Images are optimized with Next.js Image component

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🔧 Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js and Tailwind CSS
