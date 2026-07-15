# TOONHUB — 3D Character Figurine Carousel

An interactive, full-viewport collectible-figurine carousel built with **React, TypeScript, Vite, Tailwind CSS**, and `lucide-react`.

**Live demo:** https://raviware.github.io/toonhub-carousel/

## Features

- Four original 3D figurines with transparent backgrounds for seamless layering
- Automatic three-second rotation, paused during hover or keyboard interaction
- Depth-based center, side, and background positions with fluid transitions
- Responsive editorial layout, oversized display type, grain, and dynamic color themes
- Keyboard-friendly previous/next navigation controls
- Atlas character favicon and GitHub Pages deployment workflow

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react icons
- Google Fonts: Anton + Inter

## Run locally

```bash
npm install
npm run dev
```

Vite prints the development address after the server starts.

## File Structure

```
src/
  components/
    ToonHubCarousel.tsx   # Main carousel component
  App.tsx
  main.tsx
  index.css
index.html
vite.config.ts
tailwind.config.js
postcss.config.js
```

## Built by RaviWare / FoundersPrime
