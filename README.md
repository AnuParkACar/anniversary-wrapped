# 💛 Anniversary Wrapped

A Spotify Wrapped-style web experience celebrating your relationship. Mobile-first, QR-accessible, hosted on GitHub Pages.

![Preview](https://via.placeholder.com/600x300/1A1A2E/FFD700?text=Anniversary+Wrapped+Preview)

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for deployment)

### Installation

```bash
# Navigate to the project folder
cd "Anniversary wrapped"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000` 🎉

---

## 📁 Project Structure

```
Anniversary wrapped/
├── index.html              # Entry point
├── package.json            # Dependencies & scripts
├── vite.config.js          # Build configuration
├── public/
│   ├── data/
│   │   └── metrics.json    # ⚡ YOUR DATA GOES HERE
│   ├── photos/             # 📷 YOUR PHOTOS GO HERE
│   │   └── README.md
│   └── music/              # 🎵 YOUR MUSIC GOES HERE
│       └── README.md
└── src/
    ├── main.js             # App logic
    └── styles/
        └── main.css        # Styles & theme
```

---

## ✏️ Customization

### 1. Add Your Photos

Place your photos in `public/photos/`:

| File | Purpose |
|------|---------|
| `moment1.jpg` | Top Moment #1 (expandable) |
| `moment2.jpg` | Top Moment #2 (expandable) |
| `moment3.jpg` | Top Moment #3 (expandable) |
| `photo1.jpg` - `photo9.jpg` | Photo montage grid |

**Tips:** 
- Square or portrait photos work best
- Compress to < 500KB each for fast loading

### 2. Add Your Metrics

Edit `public/data/metrics.json`:

```json
{
  "meta": {
    "partnerName": "Your Partner's Name",
    "years": 3,
    "startDate": "2023-02-14"
  },
  "metrics": [
    {
      "id": "netflix",
      "label": "Netflix Episodes Watched Together",
      "value": "47",
      "unit": "episodes",
      "icon": "📺"
    }
    // Add more metrics...
  ],
  "topMoments": [
    {
      "id": 1,
      "title": "Our Trip to [Place]",
      "description": "That time we...",
      "photo": "photos/moment1.jpg",
      "date": "2025-06-15"
    }
    // Add moments 2 and 3...
  ],
  "outroMessage": "Your heartfelt closing message 💛"
}
```

### 3. Add Background Music

Place an MP3 file in `public/music/background.mp3`

**Free music sources:**
- [Pixabay Music](https://pixabay.com/music/) - No attribution needed
- [Free Music Archive](https://freemusicarchive.org/)

---

## 🎨 Theme Customization

Edit `src/styles/main.css` to change colors:

```css
:root {
  --yellow-bright: #FFD700;  /* Main accent color */
  --bg-dark: #1A1A2E;        /* Background */
  /* ... more variables */
}
```

---

## 📱 Features

- ✅ **Mobile-first** - Designed for phone viewing via QR code
- ✅ **Swipe navigation** - Swipe left/right or tap to advance
- ✅ **Expandable moments** - Tap "Click me" to expand top moments
- ✅ **Background music** - With mute toggle
- ✅ **Smooth animations** - Spotify Wrapped-style transitions
- ✅ **Keyboard support** - Arrow keys and spacebar

---

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Create a GitHub repository** named `anniversary-wrapped`

2. **Update base URL** in `vite.config.js`:
   ```js
   base: '/anniversary-wrapped/',  // Match your repo name
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

5. **Access your site:**
   ```
   https://yourusername.github.io/anniversary-wrapped/
   ```

### Generate QR Code

Use any free QR generator (e.g., [qr-code-generator.com](https://www.qr-code-generator.com/)) to create a QR code pointing to your deployed URL.

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## 💡 Tips

- **Test on mobile** - Use browser DevTools (F12 → device toggle) to preview
- **Keep photos small** - Large images slow down loading
- **Meaningful music** - Choose a song that means something to you both
- **Personal touch** - The more specific your metrics and messages, the better!

---

## ❤️ Made with love

This is your special gift. Make it personal, make it meaningful, and most importantly—have fun creating it!
