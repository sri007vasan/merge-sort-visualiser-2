# Merge Sort Visualizer

A static web app that visualizes the Merge Sort algorithm using a tree‑based representation.  
The app lets you input an array, generate a full merge‑sort tree, and step through the splitting and merging phases with clear explanations.

## Features

- Input array via comma‑separated numbers
- Generate array button
- Full tree rendering with node boxes
- Step controls: Previous / Next / Play / Pause / Reset
- Step counter and explanation panel
- Speed control for automated play
- Legend explaining color states
- Responsive, accessible design

## Run locally

```bash
npx http-server .
```

Open `http://localhost:8080` (or the port shown by http‑server).

## Run tests

```bash
npm install
npx playwright install chromium
npm test
```

The Playwright tests verify:

- Array generation and validation
- Tree rendering and step navigation
- No console errors on load

--- 
Enjoy exploring Merge Sort!
