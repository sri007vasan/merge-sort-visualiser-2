# Merge Sort Visualizer

A lightweight, static web app that visualizes the Merge Sort algorithm step by step.  
The app lets you input an array, generate it, and walk through the split and merge phases with clear explanations.

## Features

- Input array via comma‑separated numbers
- Generate array button
- Step controls: Previous / Next
- Step counter and explanation panel
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
- Step navigation updates the UI
- No console errors on load

--- 
Enjoy exploring Merge Sort!
