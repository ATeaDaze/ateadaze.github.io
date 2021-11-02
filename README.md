# Available for [Desktop](https://ateadaze.github.io/) and [Mobile](https://ateadaze.github.io/m/)
![rainbow_noise-repo_banner](/images/rainbow_noise-header.png)

## Features
* **Draw abstract shapes:** use a mouse or touchpad to draw on the canvas
  * **Colored lines create positive space**
    * **New shapes and patterns emerge** from overlapping lines
* **Run animations:** automatically run preset animations
* **12 color palettes available:** if you don't like one then you'll probably like another one
* **Keyboard support** for better control (desktop version)

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
Keyboard Map    [R]un  [P]ause  [C]lear screen   [?] Help  [Enter] Toggle draw mode  [Spacebar] Next palette
Color palettes: Fa[d]ed  R[a]inbow [F]ire  [I]ce  RG[B]   C[M]Y  CGA-[8]  Py[x]el Edit  Gamebo[y] [U]SA
Animations:     [T]riangle Web [L]ine Scatter [S]tarburst   CGA-1[6]  [G]rayscale  [*] Random palette
```
Button|Key|&nbsp;|Button|Key|&nbsp;
---|---|---|---|---|---|
![Spacebar](/images/palette_button.png)|**`Space`**|Select the next palette|![Random](/images/random_palette_button.png)|**`*`**|Select a random palette
![E](/images/draw_button.png)|**`Enter`**|Enable or disable drawing mode|![H](/images/help_button.png)|**`H`**|Print help screen (overwrites canvas with confirmation)
![O](/images/origin_reset_button.png)|&nbsp;|Reset origin to center (mobile)

# Instructions (both versions)
✏️ **Enable drawing mode** and **move your mouse** to paint shapes

▶  **Press RUN repeatedly** to increase the animation speed

✔️ **Press spacebar** to select the next color palette

✔️ **Click the canvas** to set a new origin for the starburst animation

✔️ Animations generally look smoother between 1x and 5x speed

✔️ You can draw on the canvas while the animation is running

# Mobile Version: [ateadaze.github.io/m](https://ateadaze.github.io/m/)
![mobile_screenshot](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/images/rainbow_noise-screenshot-mobile.png)

# Instructions (mobile)
🖌️ **Drag across the canvas** to paint with shapes

✔️ **Tap and drag canvas** to set new origin for starburst animation (setpoint=touchup)

⚠️ **Mobile support is basic** and needs more testing (works but needs work)

# Changes / Issues / Fixes
* [X] Release a mobile version
* [ ] Replace HTML legacy tags with CSS
### Desktop
* [X] Expand `mousemove` listener to entire document body: wilder but more satisfying
* [X] Add a button to toggle drawing mode
* [X] Separate `updateUI()` function into `updateBanner()` and `updateButtons()`
* [X] Remove style changes from `setBrushColor()`
* [ ] Get `actionListener` working properly with `mousemove` *and* `mousedown` events (similar to mobile drawing)
* [ ] Optimize resolution for the most common displays
### Mobile
* [ ] Test mobile version more extensively: limited testing done with Chrome device emulation and an S10+
* [ ] Optimize resolution and settings for mobile displays (disable pinch zoom? not sold on that one)

# Technical Information
### **Languages:** **JavaScript** for main app, **HTML** for page elements, and **CSS** for formatting
## **Source Code**
**Desktop:** [JavaScript](/scripts) ([main.js](/scripts/main.js), [drawCanvas.js](/scripts/drawCanvas.js)), [HTML](index.html), [CSS](/styles/rainbow_noise.css)

**Mobile:** [JavaScript](/m/scripts) ([mobileMain.js](/m/scripts/mobileMain.js), [mobileDrawCanvas.js](/m/scripts/mobileDrawCanvas.js)), [HTML](/m/index.html), [CSS](/styles/rainbow_noise.css)
