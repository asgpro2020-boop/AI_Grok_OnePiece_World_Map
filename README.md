# AI_Grok_OnePiece_World_Map

**Interactive 3D One Piece World Atlas** — Google Earth style planetary globe.

Explore the Blue Planet of One Piece in true 3D: rotate, zoom, and fly across the Grand Line, Red Line, Calm Belts and major islands.

## Features

- **True 3D Planet** (Google Earth / satellite style)
- Red Line as massive rugged continental ring
- Grand Line + Calm Belts
- 35+ major locations (East Blue → Paradise → New World)
- Click islands for details
- Search + Spoiler level filter
- Voyage routes (Paradise & New World)
- Atmosphere, clouds, starfield, day/night
- Camera presets (Home, North, East Blue, Grand Line, New World…)
- Clean dark fantasy UI

## How to run

### Option 1 – Open directly
Just open `index.html` in a modern browser (Chrome / Edge / Firefox).

> Note: Because the project uses ES modules + import maps, some browsers prefer serving via a local server.

### Option 2 – Local server (recommended)
```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```
Then open http://localhost:8080

### Option 3 – GitHub Pages
Enable Pages on the `main` branch (root).  
Live URL will be:
`https://asgpro2020-boop.github.io/AI_Grok_OnePiece_World_Map/`

## Project Structure

```
AI_Grok_OnePiece_World_Map/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── core/
│   │   └── globe.js          # Planet, ocean, Red Line, atmosphere…
│   └── data/
│       └── islands.js        # Island database + routes
└── README.md
```

## Tech

- Three.js r160 (CDN)
- OrbitControls + CSS2DRenderer
- Pure vanilla JS (ES modules)
- No build step required

## Canon Note

Island positions that are not precisely defined in the manga/anime are marked as **approximate**.  
Confirmed locations (Reverse Mountain, Mary Geoise, Marineford, etc.) are labelled accordingly.

---

Created with Grok (xAI)
