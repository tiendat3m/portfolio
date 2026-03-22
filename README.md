# 🚀 Portfolio Website

A modern, interactive portfolio website built with React, Three.js, and cutting-edge web technologies.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200)

## ✨ Features

### 🎨 Design & UI

- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Animated Galaxy Background** - Dynamic gradient effects
- **Custom Cursor** - Interactive cursor with trail effects
- **Glass Morphism** - Modern frosted glass design
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Framer Motion & GSAP powered

### 📝 Blog System

- **Full CRUD Operations** - Create, Read, Update, Delete posts
- **Real-time Sync** - Supabase integration
- **Image Upload** - Cloudinary support with local fallback
- **Search & Filter** - Category-based filtering
- **Admin Panel** - Password-protected management

### 🤖 AI Chatbot

- **Multiple AI Providers** - Groq, Gemini, Hugging Face, OpenAI
- **Intelligent Responses** - Context-aware conversations
- **Portfolio Knowledge** - Knows all skills, services, projects
- **Fallback System** - Works even without API keys
- **Real-time Chat** - Live chat interface

### 📧 Contact & Communication

- **Contact Form** - EmailJS integration
- **Newsletter** - Subscription management
- **Live Chat** - AI-powered assistance
- **Zalo Integration** - Vietnamese messaging support
- **Social Links** - GitHub, LinkedIn, Twitter, etc.

### 🎯 Sections

- **Hero** - 3D animated introduction
- **About** - Personal information
- **Skills** - Progress bars with categories
- **Services** - 6 service offerings
- **Projects** - Portfolio showcase
- **Experience** - Timeline layout
- **Testimonials** - Client reviews carousel
- **Blog** - Article management
- **Contact** - Form & information

### ⚡ Performance

- **Vite** - Fast build tool
- **Code Splitting** - Lazy loading
- **Image Optimization** - WebP support
- **SEO Optimized** - Meta tags & structured data
- **PWA Ready** - Progressive web app support

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **GSAP** - Scroll animations
- **Three.js** - 3D graphics
- **React Router** - Navigation
- **React Icons** - Icon library

### Backend & Services

- **Supabase** - Database & Auth (FREE)
- **Cloudinary** - Image hosting (FREE)
- **EmailJS** - Email service (FREE)
- **Groq/Gemini** - AI chatbot (FREE)

### Development

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vite** - Dev server & HMR

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/tiendat3m/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173/

## 🔑 Environment Variables

### Required (for full functionality):

```env
# Supabase (Database)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Cloudinary (Image Upload)
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset

# EmailJS (Contact Form)
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key

# AI Chatbot (Choose one)
VITE_AI_PROVIDER=groq
VITE_GROQ_API_KEY=your-groq-key
```

### Get Free API Keys:

| Service    | Free Tier     | Link                                                   |
| ---------- | ------------- | ------------------------------------------------------ |
| Supabase   | 500MB DB      | [supabase.com](https://supabase.com)                   |
| Cloudinary | 25GB storage  | [cloudinary.com](https://cloudinary.com)               |
| EmailJS    | 200 emails/mo | [emailjs.com](https://emailjs.com)                     |
| Groq       | Free tier     | [console.groq.com](https://console.groq.com)           |
| Gemini     | 60 req/min    | [makersuite.google.com](https://makersuite.google.com) |

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Page sections
│   │   ├── three/          # 3D components
│   │   └── ui/             # UI components
│   ├── context/            # React contexts
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── supabase/           # Supabase config
│   ├── App.jsx             # Main app
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── supabase/
│   └── migrations/         # Database schema
├── .env.example            # Environment template
├── .gitignore              # Git ignore
├── index.html              # HTML entry
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind config
└── vite.config.js          # Vite config
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  accent: {
    primary: '#6366f1',   // Indigo
    secondary: '#8b5cf6', // Purple
    tertiary: '#ec4899',  // Pink
    glow: '#22d3ee',      // Cyan
  }
}
```

### Content

- Update `src/components/sections/` for section content
- Update `src/services/aiService.js` for AI context
- Update `.env` for service credentials

### Styling

- Edit `src/index.css` for global styles
- Edit `tailwind.config.js` for theme customization

## 🚀 Deployment

### Deploy to Vercel (FREE)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env`

### Deploy to Netlify (Alternative)

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📊 Features Checklist

### ✅ Completed

- [x] Dark/Light mode toggle
- [x] Animated galaxy background
- [x] Custom cursor effects
- [x] Responsive design
- [x] Blog CRUD with Supabase
- [x] Real-time sync
- [x] Image upload (Cloudinary)
- [x] AI chatbot (multiple providers)
- [x] Contact form (EmailJS)
- [x] Newsletter subscription
- [x] Search functionality
- [x] Category filtering
- [x] Admin authentication
- [x] Toast notifications
- [x] Confirm modals
- [x] Scroll to top
- [x] 404 page
- [x] SEO meta tags
- [x] Live chat widget

### 🔮 Future Enhancements

- [ ] Comments system
- [ ] Like/Share functionality
- [ ] Multi-language support
- [ ] PWA offline support
- [ ] Analytics dashboard
- [ ] A/B testing
- [ ] Performance monitoring

## 🐛 Known Issues

- Custom cursor disabled on touch devices
- Some 3D effects may impact performance on older devices
- AI chatbot requires API key for full functionality

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 👨‍💻 Author

**John Developer**

- Email: hello@portfolio.com
- Location: Ho Chi Minh City, Vietnam
- Website: portfolio.com

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [GSAP](https://greensock.com/gsap/) - Scroll animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend
- [Groq](https://groq.com/) - AI inference

---

**⭐ Star this repo if you found it helpful!**
