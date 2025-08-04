# Docker 101

A simple landing page project to demonstrate basic Docker usage: building, running, and pushing a Docker image.

---

## � What's in the Dockerfile?
This repo includes a `Dockerfile` with:
- A base image suitable for the landing page app
- Source code copied into the image
- Installation of dependencies
- Exposing a port for the application
- A `CMD` or `ENTRYPOINT` to start the app

**See sample Dockerfile:**  
![image3](3.PNG)  
![image4](4.PNG)  

---

## 🚫 What is `.dockerignore`?
`.dockerignore` in this repo excludes unnecessary files from the build context to keep your image small and efficient, such as:
- `node_modules/`
- `__pycache__/`
- `.git/`
- `*.log`

**See sample dockerignore file:**  
![image5](5.PNG)  

---

## 📝 Docker Compose

The repository includes a `docker-compose.yml` file for orchestrating your Docker containers:

- **Service**: `focusflow-landing`
- Builds from the local `Dockerfile`
- Maps port `3000:3000`
- Sets environment variables for production and disables Next.js telemetry
- Implements a healthcheck by calling `/api/health` endpoint with curl, with retries and intervals for robust monitoring
- Uses `restart: unless-stopped` to keep the service running

**See docker-compose.yml:**  
![image2](2.PNG)  

---

## 📊 Viewing Docker Containers

Once you run your container, you can view its status, resource usage, and details (like name, ports, and image) in your Docker dashboard or CLI.

**Example (from Docker dashboard):**  
- Container name: `boring_edison`
- Image: `focusflow-landing`
- Ports mapped: `3000:3000`
- CPU usage: 0%
- Last started: 33 seconds ago

**See running container:**  
![image1](Capture.PNG)  

---

## 🔨 How to Build the Docker Image

Run the following command from your project directory:
```bash
docker build -t mydocker101-app .
```

---

## ▶ How to Run the Docker Container

```bash
docker run -p 8080:8080 mydocker101-app
```
_You may need to adjust the port depending on what your app exposes in the Dockerfile._

---

## ☁ How to Push to Docker Hub

1. *Login to Docker Hub:*
   ```bash
   docker login
   ```

2. *Tag your image:*
   ```bash
   docker tag mydocker101-app your-dockerhub-username/mydocker101-app
   ```

3. *Push your image:*
   ```bash
   docker push your-dockerhub-username/mydocker101-app
   ```

---

## 🌍 How can someone use this image from Docker Hub?

1. **Pull the image from Docker Hub:**
   ```bash
   docker pull your-dockerhub-username/mydocker101-app
   ```
   *(Replace `your-dockerhub-username` with your actual Docker Hub username.)*

2. **Run a container using the image:**
   ```bash
   docker run -p 8080:8080 your-dockerhub-username/mydocker101-app
   ```
   - This starts a container from your image.
   - The `-p 8080:8080` flag maps port 8080 of the container to port 8080 on your machine (adjust the port if your app uses a different one).

3. **Access the application:**
   - Open a browser and go to [http://localhost:8080](http://localhost:8080) (or the mapped port) to use the app.

---

## ✅ Done!

You've built, run, pushed, and shared a Docker image using your own repo.
Explore further with multi-stage builds, volumes, and Docker Compose!

---

### 🧑‍� Author & Learning

This project was dockerized by myself as part of my Docker learning journey.
I learnt Docker fundamentals from [KodeKloud](https://kodekloud.com/) guided by [Mumshad Mannambeth](https://www.linkedin.com/in/mmumshad/?originalSubdomain=sg).

---
