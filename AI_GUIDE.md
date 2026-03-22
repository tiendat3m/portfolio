# AI Guide - Portfolio Website

## 📋 Project Overview

Đây là một **portfolio website cá nhân** được xây dựng với phong cách hiện đại, dark theme, có 3D animations và các hiệu ứng mượt mà. Mục đích: showcase công việc, kỹ năng và kinh nghiệm của developer/designer.

## 🛠️ Tech Stack

| Công nghệ                    | Phiên bản         | Mục đích                    |
| ---------------------------- | ----------------- | --------------------------- |
| React                        | 18.2.0            | UI framework                |
| Vite                         | 5.0.8             | Build tool & dev server     |
| Tailwind CSS                 | 3.4.0             | Utility-first CSS           |
| Framer Motion                | 10.16.16          | Animations & transitions    |
| GSAP                         | 3.12.4            | Scroll-triggered animations |
| Three.js / React Three Fiber | 0.160.0 / 8.15.12 | 3D graphics                 |
| React Three Drei             | 9.92.7            | Three.js helpers            |
| React Icons                  | 4.12.0            | Icon library                |
| React Intersection Observer  | 10.0.3            | Scroll-based triggers       |

## 📁 Cấu trúc thư mục

```
portfolio/
├── index.html                    # Entry point HTML (SEO optimized)
├── package.json                  # Dependencies & scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind customization
├── postcss.config.js            # PostCSS config
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles & Tailwind imports
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Navigation bar (8 links)
│   │   │   └── Footer.jsx       # Footer with social links & resume
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # Hero section with 3D scene
│   │   │   ├── About.jsx        # About me section
│   │   │   ├── Skills.jsx       # Skills with progress bars ✨ NEW
│   │   │   ├── Services.jsx     # Services offered ✨ NEW
│   │   │   ├── Projects.jsx     # Project showcase
│   │   │   ├── Experience.jsx   # Work experience timeline
│   │   │   ├── Testimonials.jsx # Client testimonials carousel ✨ NEW
│   │   │   ├── Blog.jsx         # Blog articles grid ✨ NEW
│   │   │   └── Contact.jsx      # Contact form
│   │   ├── three/
│   │   │   └── HeroScene.jsx    # Three.js 3D scene
│   │   ├── ui/
│   │   │   ├── CustomCursor.jsx # Custom cursor effect
│   │   │   ├── NoiseOverlay.jsx # Film grain/noise effect
│   │   │   ├── PageLoader.jsx   # Loading animation
│   │   │   ├── ScrollToTop.jsx  # Scroll to top button ✨ NEW
│   │   │   └── ThemeToggle.jsx  # Dark/Light mode toggle ✨ NEW
│   │   └── pages/
│   │       └── NotFound.jsx     # 404 page ✨ NEW
```

## 🎨 Design System

### Colors (Tailwind config)

```javascript
colors: {
  dark: {
    950: '#020617',  // Main background
    900: '#0f172a',  // Cards, sections
    // ... more shades
  },
  accent: {
    primary: '#6366f1',   // Indigo
    secondary: '#8b5cf6', // Purple
    tertiary: '#ec4899',  // Pink
    glow: '#22d3ee',      // Cyan glow
  }
}
```

### CSS Classes thường dùng

- `container-custom` - Container with max-width & padding
- `section-padding` - Section vertical padding
- `glass-card` - Glassmorphism card effect
- `gradient-text` - Gradient text effect
- `btn-primary` / `btn-outline` - Button styles

### Animations

- `gradient` - Background gradient animation
- `float` - Floating animation
- `pulse-glow` - Glowing pulse effect
- `spin-slow` - Slow rotation

## 🔧 Các lệnh thường dùng

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📝 Coding Conventions

### Components

- Sử dụng **functional components** với hooks
- Props destructuring trong parameters
- Export default ở cuối file

### Styling

- Ưu tiên **Tailwind classes** trong JSX
- Custom styles trong `index.css` với `@apply`
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)

### Animations

- **Framer Motion**: Cho UI animations, page transitions
- **GSAP**: Cho scroll-triggered animations, parallax
- **Three.js**: Cho 3D elements

### Naming

- Components: **PascalCase** (e.g., `HeroSection`)
- Files: **PascalCase** cho components, **camelCase** cho utilities
- CSS classes: **kebab-case** hoặc Tailwind utilities

## 🚀 Khi cần thay đổi

### Thêm section mới

1. Tạo file trong `src/components/sections/`
2. Import vào `src/App.jsx`
3. Thêm navigation link trong `Navbar.jsx`

### Thay đổi theme/colors

1. Sửa `tailwind.config.js` - section `colors`
2. Sửa `src/index.css` - CSS variables nếu có

### Thêm animation

1. **Simple UI animation**: Dùng Framer Motion
2. **Scroll animation**: Dùng GSAP với ScrollTrigger
3. **3D effect**: Dùng React Three Fiber/Drei

### Thêm project mới

1. Sửa mảng `projects` trong `Projects.jsx`
2. Thêm image, tags, description

## ⚠️ Lưu ý quan trọng

1. **Three.js performance**: Scene 3D có thể nặng, cần optimize nếu thêm nhiều objects
2. **GSAP cleanup**: Always return `ctx.revert()` trong useEffect cleanup
3. **Framer Motion**: Sử dụng `AnimatePresence` cho exit animations
4. **Responsive**: Test trên mobile, tablet vì nhiều animations có thể khác
5. **Custom cursor**: Disable trên mobile (touch devices)

## 🚨 Icon Import Errors - CẢNH BÁO QUAN TRỌNG

### Icons KHÔNG tồn tại trong react-icons/hi (Heroicons):

- ❌ `HiColorPalette` - Không có!
- ❌ `HiExclamationTriangle` - Không có!

### Thay thế bằng:

- ✅ `HiLightBulb` - Thay cho HiColorPalette
- ✅ `HiExclamation` - Thay cho HiExclamationTriangle

### Icons đã verify tồn tại:

```
HiDesktopComputer, HiDeviceMobile, HiLightBulb, HiCode, HiLightningBolt, HiCog
HiBriefcase, HiAcademicCap, HiCalendar, HiClock, HiArrowRight, HiX
HiMenuAlt3, HiChevronUp, HiChevronDown, HiChevronLeft, HiChevronRight
HiStar, HiExternalLink, HiArrowLeft, HiHome, HiLogout, HiLogin, HiUser
HiLockClosed, HiEye, HiEyeOff, HiPlus, HiPencil, HiTrash, HiSave, HiPhotograph
HiExclamation, HiBookmark, HiShare, HiDownload, HiSun, HiMoon
```

### Cách check icon tồn tại:

```javascript
// Import và test
import { HiColorPalette } from "react-icons/hi";
// Nếu lỗi → icon không tồn tại, tìm icon khác
```

### TIP:

- Luôn check icon có tồn tại trước khi import
- Dùng https://react-icons.github.io/react-icons/search/?q=xxx để tìm icon
- Hoặc search trong node_modules/react-icons/hi/index.js

## 🔗 Assets & Resources

- Images: Sử dụng Unsplash URLs hoặc thêm vào `public/` folder
- Fonts: Inter (sans-serif), có thể thêm Clash Display
- Icons: React Icons library (`Hi` prefix cho Heroicons)

## 💡 Tips khi làm việc với AI

1. **Nói rõ section nào** cần sửa (Hero, About, Projects, etc.)
2. **Nêu rõ loại animation** muốn (fade, slide, 3D, parallax)
3. **Cho biết responsive breakpoints** nếu có yêu cầu đặc biệt
4. **Mô tả visual style** (glassmorphism, gradient, glow, etc.)

---

_Last updated: 2026-03-22_
_Project: Portfolio Website_
