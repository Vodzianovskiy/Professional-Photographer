# Professional Photographer — Responsive Portfolio + Admin CMS 🎨✨

Modern photography portfolio site with a built-in, browser-based CMS. The admin panel controls all live content, social links, and contact settings, syncing instantly to the main website via localStorage—**no backend required!** 🚀

---

## 🌐 Live Demo

- **Main site:** `index.html` (open locally or host statically)
- **Admin panel:** `admin.html`

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+ modules)
- **Styling/Layout:** CSS Grid, Flexbox, custom CSS components, keyframe/transition animations, mobile-first media queries 📱
- **Data & Sync:** localStorage for persistence; real-time sync via `storage` events and custom events 🔄
- **Utilities/Tools:** Vanilla JS modules; works in any modern browser (no build step required) ⚡

---

## ✨ Key Features

### 🎛️ Admin Panel

- ✅ Full CMS for **hero, about, gallery, pricing, and settings**
- 🔗 Social media management with **per-platform visibility toggles** (show/hide any social icon)
- 📞 Contact editor: **WhatsApp, Telegram, Email** with proper protocols (`mailto:`, `wa.me`, `t.me`), plus response time and auto-reply
- 👀 **Preview mode** to review changes before publishing
- ⚡ **Real-time synchronization** to main site without page refresh
- 💾 Save and reset-to-default actions
- 🗄️ Data persistence via localStorage

### 🌟 Main Website

- 📱 **Responsive design** (mobile, tablet, desktop)
- 🔄 **Dynamic content** pulled from admin-managed storage
- 🔗 Social and contact links with **correct protocols** (`mailto:`, `https://wa.me/`, `https://t.me/`)
- 🎬 Smooth animations and clean, modern UI
- ⚡ Optimized, **fast-loading** static assets

---

## 🔄 How It Works (Data Flow)

1. 📝 Admin edits content and social/contact settings, then saves.
2. 💾 Data is stored in **localStorage** under a unified schema.
3. 🔄 The main site listens for storage updates (and custom events) to apply changes **live—no reload needed!**
4. 👁️ Social visibility toggles hide/show icons dynamically; hidden items **do not consume layout space.**
5. 👀 Preview mode lets admins review before publishing.

---

## 🎛️ Admin Panel Capabilities

- ✏️ Edit all site sections from a **centralized dashboard**
- 🔘 Toggle visibility for **each social platform** (Instagram, Facebook, Twitter, Pinterest, LinkedIn, GitHub, YouTube, TikTok)
- 📞 Edit **WhatsApp, Telegram, Email**, response time, auto-reply
- 👀 **Preview before publish**; reset to defaults
- ⚡ **Instant sync** to the main site across tabs/windows

---

## 📱 Responsive Design

- 📱 **Mobile-first approach** with breakpoints for:
  - Mobile (320px+) 📱
  - Tablet (768px+) 📲
  - Desktop (1024px+) 💻
- ✋ **Touch-friendly controls** (≥44px tap targets)
- 📐 Fluid grids and wrapped social icons
- 🚫 **No horizontal scrolling**; text remains readable without zooming

---

## 📥 Installation

1. 📂 Clone or download the repository.
2. 🌐 Open `index.html` in a modern browser for the main site.
3. 🎛️ Open `admin.html` in a modern browser for the admin panel.
4. ✅ Ensure localStorage is enabled (required for data persistence).

---

## 🚀 Usage

- **🔓 Access admin:** open `admin.html`.
- **✏️ Edit content:** use the forms for hero, about, gallery, pricing, and contact settings.
- **👁️ Social visibility:** toggle "Show on main site" per platform; hidden icons disappear on the main site.
- **💾 Save & preview:** click Save to persist; use preview mode to review; use Reset to restore defaults.

---

## 📁 Project Structure

├── index.html — 🌐 Main site
├── admin.html — 🎛️ Admin CMS
├── css/ — 🎨 Core styles, components, sections, responsive rules
├── js/ — ⚙️ Modules for data, loaders, admin features, gallery, animations
└── assets/ — 🖼️ Fonts, icons, images

---

## 🔮 Future Improvements

- 🔐 Optional backend/API for multi-user roles and cloud persistence
- 📸 Image upload pipeline with optimization
- 🌓 Dark/light theme toggles
- 📊 Additional analytics in the admin dashboard

---

## 👨‍💻 Credits

**Author:** Ivan Vodzianovskiy 🚀  
**Year:** 2026  
**Portfolio:** Modern CMS solution without backend complexity! ✨

---

## 💡 Why This Project Stands Out

✅ **No backend required** — saves hosting costs and complexity  
✅ **Real-time sync** — changes appear instantly across tabs (0ms delay!)  
✅ **11 social platforms** with dynamic visibility toggles  
✅ **Mobile-first responsive** — works perfectly on all devices  
✅ **ES6+ modern JavaScript** — clean, modular code architecture  
✅ **100% static** — host anywhere for free!

Perfect for photographers, freelancers, and anyone who wants a professional portfolio with easy content management! 🎯✨
