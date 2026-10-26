# Roshan Gowda S — Software Engineer Portfolio

![Portfolio Preview Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

A modern, high-performance, and fully interactive **Software Engineer & Full-Stack Developer Portfolio** built for **Roshan Gowda S**. Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion, this portfolio showcases production engineering experience, open-source projects, interactive widgets, and clean visual design.

---

## 🌟 Highlights & Features

- **🌓 Dual Theme Engine**: Seamless toggle between a sleek dark theme and a high-contrast light theme with persisted user preferences.
- **✨ Framer Motion Scroll Entrance**: Smooth fade-in scroll animations for every section on initial viewport reveal.
- **⚡ Glowing Section Dividers**: Subtle, pulsing laser-gradient dividers separating major portfolio sections.
- **🎮 Interactive Project Widgets**: Live interactive sandboxes directly embedded inside project case studies:
  - **`react-status-kit` Sandbox**: Live component playground for Roshan's npm package.
  - **MERN API Console**: Simulated endpoint tester for the Community Resource Sharing Platform.
  - **AI-PetCare Health Dashboard**: Interactive metrics and AI health prediction simulator.
- **⌨️ Keyboard Navigation**: Keyboard shortcuts for quick navigation across the page:
  - `H` — Jump to Home / Hero
  - `A` — Jump to About section
  - `T` — Jump to Tech Stack
  - `E` — Jump to Experience
  - `S` — Jump to Services
  - `P` — Jump to Projects
  - `C` — Jump to Contact
  - `Shift + ?` — Toggle keyboard shortcuts cheat sheet
- **🚀 SEO & Open Graph Ready**: Complete meta tags, Twitter card tags, and JSON-LD structured schema (`Person` and `WebSite`) for rich previews when shared across LinkedIn, X/Twitter, and Discord.
- **📱 Fully Responsive**: Pixel-perfect layout tailored across desktop monitors, tablets, and mobile smartphones.
- **🔒 Zero Private Keys Required**: Completely self-contained client-side application with automated GitHub Actions CI/CD deployment.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS v4, Lucide React Icons |
| **Animations & Effects**| Framer Motion, Canvas 2D Particle Engine |
| **Deployment & CI/CD** | GitHub Pages, GitHub Actions (`deploy.yml`) |
| **Code Quality & Lint** | ESLint, TypeScript Strict Compiler |

---

## 📂 Featured Projects Showcase

1. **`@roshan__gowda/react-status-kit`** (Open-Source NPM Package)
   - *Description*: Lightweight, fully typed React status indicators, badges, and avatars for dashboard systems.
   - *Features*: Zero dependencies, tree-shakeable, built-in themes & interactive status controls.

2. **Community Resource Sharing Platform**
   - *Description*: Full-stack MERN application empowering local communities to share, request, and manage items and services.
   - *Tech Stack*: MongoDB, Express.js, React, Node.js, Firebase Auth, REST APIs.

3. **AI-PetCare Web Platform**
   - *Description*: Responsive pet care application with AI health prediction simulator and symptom tracking.
   - *Tech Stack*: HTML5, CSS3, JavaScript ES6+, Local Storage API.

---

## 💼 Experience & Background

- **Software Trainee** (Present) — Specialized in full-stack development, standard architecture practices, and modern React patterns.
- **Frontend Developer Intern @ Cognifyz Technologies** — Developed responsive user interfaces, optimized web assets, and integrated REST APIs.
- **Open-Source Maintainer** — Author and publisher of `@roshan__gowda/react-status-kit` on npm.

---

## 🚀 Local Development Setup

Follow these simple steps to run the portfolio locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/roshangowda/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or `http://localhost:5173`).

4. **Run production build**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages

This project is configured for **zero-configuration automated deployment** using GitHub Actions.

### Automated Deployment (Recommended)

1. Push the code to your GitHub repository `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Roshan Gowda S Portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```

2. Enable GitHub Pages in your repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
   - The included workflow `.github/workflows/deploy.yml` will automatically build and publish your site to GitHub Pages whenever you push to `main`!

### Manual Deployment via CLI

If you prefer to deploy directly from your command line:
```bash
npm run deploy
```
This builds the site and pushes the compiled static bundle to the `gh-pages` branch. In repository settings (**Settings** > **Pages**), set the source branch to `gh-pages`.

---

##  📫 Contact & Links

- **Email**: [0243roshan@gmail.com](mailto:0243roshan@gmail.com)
- **Developer**: Roshan Gowda S
- **Role**: Software Engineer / Full-Stack Developer

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

