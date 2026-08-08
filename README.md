# 🚀 Aniket Sidhu — AI/ML Engineer Portfolio

A premium, futuristic portfolio website built with **HTML/CSS/JavaScript** and a **Flask** backend, featuring a dark cybernetic design, animated neural-network particles, scroll-reveal animations, and an intelligent **Google Gemini AI Assistant**.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Python](https://img.shields.io/badge/python-3.11+-green)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎨 Futuristic Design
- **Dark cybernetic interface** with vibrant cyan, purple, and magenta accents
- **Animated neural-network canvas** in the hero section
- **Glassmorphism cards** with subtle glow effects
- **Scroll-reveal animations** using IntersectionObserver
- **Responsive** — fully optimized for desktop, tablet, and mobile
- **Accessibility** — respects `prefers-reduced-motion`

### 🤖 AI Assistant
- **Gemini-powered** real-time chat
- Uses verified profile data for accurate first-person responses
- Suggested quick questions
- Requires backend server for API proxying

### 💼 8 Professional Sections
- **Hero** — Animated gradient name, neural-network visual, social links
- **About** — Professional bio with focus-area cards
- **Skills** — Categorized tech tags (no fake percentages)
- **Projects** — Featured project + 6-card grid with real GitHub links
- **Experience** — Education timeline and certifications
- **Achievements** — Hackathon milestones with numbered cards
- **Creative Tech** — 3D/Blender showcase
- **Contact** — Formspree-powered form + social links

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (vanilla) |
| **Backend** | Flask (Python) |
| **AI / Prototyping** | Google Gemini API, Streamlit, OpenCV |
| **Forms** | Formspree |
| **Fonts** | Inter, Space Grotesk, JetBrains Mono |
| **Icons** | Inline SVG Vectors |

---

## 📋 File Structure

```
├── index.html          — Single-page portfolio website
├── styles.css          — Complete design system
├── script.js           — Particles, scroll-reveal, navbar, chat
├── server.py           — Flask backend (static files + Gemini proxy)
├── requirements.txt    — Python dependencies
├── .streamlit/         — API key configuration
│   ├── secrets.toml          — Your API keys (git-ignored)
│   └── secrets.toml.example  — Template
├── .gitignore          — Git configuration
└── README.md           — This file
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/aniketsidhu123/portfolio-website-ai.git
cd portfolio-website-ai
```

### 2. Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure API Keys

Copy `.streamlit/secrets.toml.example` to `.streamlit/secrets.toml`:

```toml
GEMINI_API_KEY = "your-gemini-api-key"
FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id"
```

- Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)
- Create a free form at [formspree.io](https://formspree.io) (optional)

### 5. Run the Server

```bash
python server.py
```

Open **http://localhost:5000** in your browser.

### Alternative: Static Only (No AI Chat)

You can open `index.html` directly in a browser. Everything works except the AI chat (which requires the Flask server).

---

## 🌐 Deployment

### GitHub Pages (Static Frontend)

1. Push code to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root directory
4. Your site will be live at `https://username.github.io/repo-name`

> Note: AI chat requires a separate backend deployment (e.g., Render, Railway, or Streamlit Cloud).

### Full Deployment (with AI Chat)

Deploy on any Python-friendly platform:
- [Render](https://render.com) — free tier available
- [Railway](https://railway.app)
- [Fly.io](https://fly.io)

Set environment variables: `GEMINI_API_KEY`, `FORMSPREE_ENDPOINT`

---

## 🔐 Security

- ✅ API keys stored in `.streamlit/secrets.toml` (git-ignored)
- ✅ `.gitignore` prevents accidental exposure
- ✅ Safe to share repository publicly

---

## 👤 Author

**Aniket Sidhu**
- 🎓 BTech Information Technology, MSIT (GGSIPU)
- 🤖 Aspiring AI Engineer & Full-Stack Developer
- 📍 New Delhi, India

### Connect
- [GitHub](https://github.com/aniketsidhu123)
- [LinkedIn](https://linkedin.com/in/aniket-sidhu-93a823316)
- [Email](mailto:aniketsidhu425@gmail.com)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

**Built with curiosity and code 🚀✨**
