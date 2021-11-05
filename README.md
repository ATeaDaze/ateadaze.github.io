# Available for 💻[Desktop](https://ateadaze.github.io/) and 📱[Mobile](https://ateadaze.github.io/m/)
![rainbow_noise-repo_banner](/images/rainbow_noise-header.png)

## Features
* **Draw abstract shapes** with your mouse or touch screen
  * **New patterns emerge** from random lines overlapping
* **Run animations automatically** (or combine them with drawing)
* **12 color palettes**
* **Keyboard support** (desktop version)

## Screenshots
#### 🖌️ = Drawn by hand, 🎲 = Randomly generated

### Triangle Web 🖌️ Faded
![triangle_web](/images/screenshots/rn_screen-faded-drawn-1.png)

### Line Scatter 🖌️ Ice
![line_scatter](/images/screenshots/rn_screen-line_scatter-ice.png)

### Starburst 🎲 Fire
![starburst](/images/screenshots/rn_screen-starburst-fire.png)

### Triangle Web 🎲 CGA-8
![triangle_web-cga8](/images/screenshots/rn_screen-cga8-generated-1.png)

## Color Palettes
* **Faded:** rainbow with desaturated colors
* **Rainbow:** classic primary colors
* **Fire:** warm (but not necessarily inviting)
* **Ice:** cool and refreshing
* **RGB:** red, green, blue
* **CMY:** cyan, magenta, yellow
* **CGA-8:** an old PC/DOS video mode (8-color)
* **CGA-16:** full 16-color CGA palette (minus pure black)
* **Pyxel:** default color palette for [Pyxel Edit](pyxeledit.com)
* **Gameboy:** as green as it was in the 90s
* **Patriot:** red, white, and blue
* **Grayscale:** everything from dim gray to off-white

# Desktop Version: [ateadaze.github.io](https://ateadaze.github.io/)
![screenshot-faded](/images/screenshots/rn_screen-desktop.png)
## Controls
```
Keyboard Map    [R]un  [P]ause  [C]lear screen   [Enter] Toggle draw mode  [Spacebar] Next palette
Color palettes: Fa[d]ed R[a]inbow [F]ire [I]ce RG[B]  C[M]Y CGA-[8] Py[x]el Edit Gamebo[y] [U]SA
Animations:     [T]riangle Web [L]ine Scatter [S]tarburst   CGA-1[6]  [G]rayscale
[?] Help  [O]rigin reset (center)  [*] Random palette
```
Button|Key|&nbsp;
---|---|---|
![Spacebar](/images/buttons/palette_button.png)|**`Space`**|Select the next palette
![Random](/images/buttons/random_palette_button.png)|**`*`**|Select a random palette
![E](/images/buttons/draw_button-color.png)|**`Enter`**|Enable or disable free draw mode
![?](/images/buttons/help_button.png)|**`?`**|Print help screen (overwrites canvas with confirmation)
![O](/images/buttons/origin_reset_button.png)|**`o`**|Reset origin to center

# Instructions
▶  **Press RUN repeatedly** to increase the animation speed

✔️ Animations generally look smoothest between 1x and 5x speed

✔️ You can draw on the canvas while the animation is running

## Instructions (Desktop)
✏️ **Click and drag on the canvas** to draw shapes

✔️ Free drawing mode paints shapes with mouse movement (no clicking)

✔️ **Press spacebar** to select the next color palette

✔️ **Click the canvas** to set a new origin for the starburst animation (setpoint=canvas.mouseup)

# Mobile Version: [ateadaze.github.io/m](https://ateadaze.github.io/m/)
![mobile_screenshot](/images/screenshots/rn_screen-mobile.jpg)
## Instructions (Mobile)
🖌️ **Tap and drag across the canvas** to paint with shapes

✔️ **Tap and drag canvas** to set new origin for starburst animation (setpoint=canvas.touchup)

ℹ️&nbsp;&nbsp;**Mobile version is basic** (works but needs work)

# Changes / Issues / Fixes
* [X] Release a mobile version with touch support
* [X] Separate `updateUI()` function into `updateBanner()` and `updateButtons()`
* [X] Remove style changes from `setBrushColor()`
* [ ] Add more variety: shapes, colors, brush width, etc. (experiment)
* [ ] Replace all HTML legacy tags with CSS
### Desktop
* [X] Expand `mousemove` listener to entire document body: wilder but more satisfying
* [X] Add a button to toggle drawing mode
* [X] Get `actionListener` working properly with `mousemove` *and* `mousedown` events (similar to mobile drawing)
* [ ] Optimize resolution for the most common displays
### Mobile
* [X] Fix button colors not updating
* [ ] Needs more testing: limited testing done with Chrome device emulation and an S10+
* [ ] Optimize resolution and settings for mobile displays

# Technical Information
**Languages:** **JavaScript** for the main app, **HTML** for page elements, and **CSS** for formatting
## **Source Code**
**Desktop:** [JavaScript](/scripts) ([main.js](/scripts/main.js), [drawCanvas.js](/scripts/drawCanvas.js)), [HTML](index.html), [CSS](/styles/rainbow_noise.css)

**Mobile:** [mobileMain.js](/m/scripts/mobileMain.js), [mobileDrawCanvas.js](/m/scripts/mobileDrawCanvas.js), [HTML](/m/index.html), CSS (same as desktop)
