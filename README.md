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

## 🏗️ Architecture

The application is built with **Vanilla JavaScript** (no heavy frameworks) to ensure maximum performance and creativity.

- **`index.html`**: The single-page entry point.
- **`src/main.js`**:
  - **Slide Generaton**: Functions like `createMetricSlide`, `createTopMomentsSlide`, etc., generate HTML strings based on data.
  - **Navigation**: Handles swipe (touch), keyboard, and click navigation.
  - **Animations**: Uses `IntersectionObserver` or simple timeouts to add `.animated` classes to elements when they enter the viewport.
  - **Interactive State**: Manages state for the Quiz, Restaurant Ranking, Wordle, and Scratch Cards.
- **`src/styles/main.css`**:
  - **Snap Scrolling**: Uses CSS Scroll Snap for the main slide container.
  - **Responsiveness**: Media queries ensure layouts adapt to mobile screens.
  - **Animations**: CSS transitions and keyframes for all visual effects.
- **`public/data/metrics.json`**: The single source of truth for all content.

### Data Customization (`metrics.json`)

To personalize this app, you mainly need to edit `public/data/metrics.json`. Here is the template structure:

```json
{
  "meta": {
    "partnerName": "Name",
    "years": 3,
    "startDate": "YYYY-MM-DD",
    "dataRange": {
      "netflix": "Month YYYY - Month YYYY",
      "banking": "Month YYYY - Month YYYY"
    }
  },
  "metrics": [
    {
      "id": "unique_id",
      "label": "Title of the stat",
      "value": "Number/Value",
      "unit": "Description string",
      "icon": "Emoji or Icon"
    }
  ],
  "topMoments": [
    {
      "id": 1,
      "title": "Moment Title",
      "description": "Longer text description.",
      "photo": "photos/filename.jpg",
      "date": "YYYY-MM-DD"
    }
  ],
  "photos": [
    {
      "id": 1,
      "photo": "photos/filename.jpg",
      "caption": "Short caption"
    }
    // Add up to 12 photos for the montage
  ],
  "funFacts": [
    "String 1",
    "String 2"
  ],
  "quizShows": ["Option 1", "Option 2", "Option 3", "Option 4 (Correct)"],
  "top_5_restaurants": ["#1 Place", "#2 Place", "#3 Place", "#4 Place", "#5 Place"],
  "outroMessage": "Your final message here."
}
```

### Adding Photos
1. Drop your images into `public/photos/`.
2. Reference them in `metrics.json` using the path `photos/your-image.jpg`.
3. **Note:** Vertical/Portrait images work best for the polaroid style!

### 3. Configure Wordle

The Wordle game is embedded via an iframe pointing to a custom instance of [Vue Wordle](https://github.com/yyx990803/vue-wordle).

**To change the target word:**
1.  Open `src/main.js` and find the `createWordleSlide` function.
2.  Locate the iframe `src` URL: `https://vue-wordle.netlify.app/?c3VzaGk=`
3.  The parameter after `?` is the **Base64 encoded** target word.
    -   **Requirement**: The word must be exactly **5 letters** long.
    -   **Encoding**: use `btoa('yourword')` in the console or an online Base64 encoder.
    -   *Example*: `btoa('sushi')` -> `c3VzaGk=`
4.  **Fallback**: If no word is provided or the length is incorrect, it defaults to the "Word of the Day".


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
