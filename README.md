# Available for [Desktop](https://ateadaze.github.io/) and [Mobile](https://ateadaze.github.io/m/)
![rainbow_noise-repo_banner](/images/rainbow_noise-header.png)

## Features
* **Draw abstract shapes:** use your mouse or touchpad to draw on the canvas (desktop or mobile)
  * **Colored lines create positive space** on the black canvas
    * **New shapes and patterns emerge** from randomly overlapping lines
* **Run animations:** automatically run preset animations without user input
* **12 color palettes available:** if you don't like one then you'll probably like another one
* **Keyboard support:** allows better control of the canvas (desktop)

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

# Desktop Version: [ateadaze.github.io/m](https://ateadaze.github.io/)
![screenshot-faded](https://raw.githubusercontent.com/ATeaDaze/ateadaze.github.io/main/images/rainbow_noise-screenshot-1.png)
## Keyboard Map
```
Keyboard Map:   [R]un  [P]ause  [C]lear screen   [H]elp  [E]nable/disable draw mode  [Spacebar] Next palette
Color palettes: Fa[d]ed  R[a]inbow [F]ire  [I]ce  RG[B]   C[M]Y  CGA-[8]  Py[x]el Edit  Gamebo[y] [U]SA
Animations:     [T]riangle Web [L]ine Scatter [S]tarburst   CGA-1[6]  [G]rayscale  [*] Random palette
```
* Enable or disable drawing mode with the draw button or press `[E]` (desktop version)

# Mobile Version: [ateadaze.github.io/m](https://ateadaze.github.io/m/)
![mobile_screenshot](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/images/rainbow_noise-screenshot-mobile.png)

# Changes / Issues / Fixes
* [X] Release a mobile version: a *lot* of people primarily use their phones for web browsing
* [X] Expand `mousemove` listener to entire document body: wilder but more satisfying
* [X] Add a button to enable or disable draw mode (desktop)
* [X] Separate `updateUI()` function into 2 functions: `updateBanner()` and `updateButtons()`
* [X] Remove style changes from `setBrushColor()` as it was checking and updating the UI on *each* stroke
* [ ] Get `actionListener` working properly with `mousemove` *and* `mousedown` events (similar to mobile drawing)
* [ ] Replace HTML legacy tags with CSS: I haven't written extensively with HTML/CSS since ~2005
* [ ] Test the mobile version more extensively: I've done limited testing with Chrome's device emulation and my S10+

# Technical Information
### **Languages:** **JavaScript** for the main app, **HTML** for page elements, and **CSS** for formatting
## **Source Code**
**Desktop:** [JavaScript](/scripts) ([main.js](/scripts/main.js), [drawCanvas.js](/scripts/drawCanvas.js)), [HTML](index.html), [CSS](/styles/rainbow_noise.css)

**Mobile:** [JavaScript](/m/scripts) ([mobileMain.js](/m/scripts/mobileMain.js), [mobileDrawCanvas.js](/m/scripts/mobileDrawCanvas.js)), [HTML](/m/index.html), [CSS](/styles/rainbow_noise.css)
