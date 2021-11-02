# Available for [Desktop](https://ateadaze.github.io/) and [Mobile](https://ateadaze.github.io/m/)
![rainbow_noise-repo_banner](/images/rainbow_noise-header.png)

## Features
* **Draw abstract shapes:** use a mouse or touch screen to draw
  * **New patterns emerge** from randomly overlapping lines
* **Run animations:** automatically run presets (or combine them with drawing)
* **12 color palettes**
* **Keyboard support** (desktop version)

## Color Palettes
* **Faded:** rainbow with desaturated colors (pastel)
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
![screenshot-faded](https://raw.githubusercontent.com/ATeaDaze/ateadaze.github.io/main/images/rainbow_noise-screenshot-1.png)
## Controls
```
Keyboard Map    [R]un  [P]ause  [C]lear screen   [Enter] Toggle draw mode  [Spacebar] Next palette
Color palettes: Fa[d]ed R[a]inbow [F]ire [I]ce RG[B]  C[M]Y CGA-[8] Py[x]el Edit Gamebo[y] [U]SA
Animations:     [T]riangle Web [L]ine Scatter [S]tarburst   CGA-1[6]  [G]rayscale
[?] Help  [O]rigin reset (center)  [*] Random palette
```
Button|Key|&nbsp;
---|---|---|
![Spacebar](/images/palette_button.png)|**`Space`**|Select the next palette
![Random](/images/random_palette_button.png)|**`*`**|Select a random palette
![E](/images/draw_button-color.png)|**`Enter`**|Enable or disable free draw mode
![?](/images/help_button.png)|**`H`**|Print help screen (overwrites canvas with confirmation)
![O](/images/origin_reset_button.png)|**`O`**|Reset origin to center

# Instructions
▶  **Press RUN repeatedly** to increase the animation speed

✔️ Animations generally look smoothest between 1x and 5x speed

✔️ You can draw on the canvas while the animation is running

## Instructions (Desktop)
✏️ Drag on the canvas to draw shapes (free mode draws shapes without clicking)

✔️ **Press spacebar** to select the next color palette

✔️ **Click the canvas** to set a new origin for the starburst animation

# Mobile Version: [ateadaze.github.io/m](https://ateadaze.github.io/m/)
![mobile_screenshot](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/images/rainbow_noise-screenshot-mobile.png)

## Instructions (Mobile)
🖌️ **Drag across the canvas** to paint with shapes

✔️ **Tap and drag canvas** to set new origin for starburst animation (setpoint=touchup)

⚠️ **Mobile version is basic** (works but needs work)

# Changes / Issues / Fixes
* [X] Release a mobile version: touch support
* [ ] Replace all HTML legacy tags with CSS
### Desktop
* [X] Expand `mousemove` listener to entire document body: wilder but more satisfying
* [X] Add a button to toggle drawing mode
* [X] Separate `updateUI()` function into `updateBanner()` and `updateButtons()`
* [X] Remove style changes from `setBrushColor()`
* [X] Get `actionListener` working properly with `mousemove` *and* `mousedown` events (similar to mobile drawing)
* [ ] Optimize resolution for the most common displays
### Mobile
* [ ] Needs more testing: limited testing done with Chrome device emulation and an S10+
* [ ] Optimize resolution and settings for mobile displays

# Technical Information
**Languages:** **JavaScript** for the main app, **HTML** for page elements, and **CSS** for formatting
## **Source Code**
**Desktop:** [JavaScript](/scripts) ([main.js](/scripts/main.js), [drawCanvas.js](/scripts/drawCanvas.js)), [HTML](index.html), [CSS](/styles/rainbow_noise.css)

**Mobile:** [JavaScript](/m/scripts) ([mobileMain.js](/m/scripts/mobileMain.js), [mobileDrawCanvas.js](/m/scripts/mobileDrawCanvas.js)), [HTML](/m/index.html)
