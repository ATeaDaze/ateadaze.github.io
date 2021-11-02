# Available for [Desktop](https://ateadaze.github.io/) and [Mobile](https://ateadaze.github.io/m/)
![rainbow_noise-repo_banner](/images/rainbow_noise-header.png)

## Features
* **Draw abstract shapes:** use your mouse on a desktop or touchpad with mobile devices
  * **Colored lines create positive space** against the black background (negative space)
  * **New shapes and patterns emerge** from randomly overlapping lines
* **Run animations:** automatically run preset animations without any user input
* **12 color palettes:** if you don't like one then you'll probably like another one
* **Keyboard support:** for better control of the canvas (desktop version)

## Color palettes
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

## Keyboard Map
```
[R]un  [P]ause  [C]lear screen   [H]elp  [E]nable/disable draw mode  [Spacebar] Next palette
Fa[d]ed  R[a]inbow [F]ire  [I]ce  RG[B]   C[M]Y  CGA-[8]  CGA-1[6]  Py[x]el Edit  Gamebo[y]  [U]SA  [G]rayscale
Animations:  [T]riangle Web   [L]ine Scatter   [S]tarburst   [*] Random palette
```
* Enable or disable drawing mode with the draw button or press **[E]** (desktop version)

# Desktop Version: [ateadaze.github.io/m](https://ateadaze.github.io/)
![screenshot-faded](https://raw.githubusercontent.com/ATeaDaze/ateadaze.github.io/main/images/rainbow_noise-screenshot-1.png)

# Mobile Version: [ateadaze.github.io/m](https://ateadaze.github.io/m/)
![mobile_screenshot](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/images/rainbow_noise-screenshot-mobile.png)

# Updates / Issues
* [X] Release a mobile version: a *lot* of people primarily use their phones for web browsing
* [X] Expand `mousemove` listener to entire document body: more satisfying and similar to the mobile version
* [X] Add a button to enable or disable draw mode (desktop)
* [X] Separate `updateUI()` function into 2 functions: `updateBanner()` and `updateButtons()`
* [X] Remove style changes from `setBrushColor()` as it was checking and updating the UI on *each* stroke
* [ ] Get `actionListener` working properly with `mousemove` *and* `mousedown` events (drawing similar to mobile)
* [ ] Replace HTML legacy tags with CSS: I haven't written extensively with JS since the mid-2000s (:
* [ ] Test the mobile version more extensively: I've done limited testing with Chrome's device emulation and my S10+

# Technical Information
### **Languages:** **JavaScript** for the main app, **HTML** for page elements, and **CSS** for formatting
## **Source Code**
**Desktop:** [JavaScript](/scripts) ([main.js](/scripts/main.js), [drawCanvas.js](/scripts/drawCanvas.js)), [HTML](index.html), [CSS](/styles/rainbow_noise.css)

**Mobile:** [JavaScript](/m/scripts) ([mobileMain.js](/m/scripts/mobileMain.js), [mobileDrawCanvas.js](/m/scripts/mobileDrawCanvas.js)), [HTML](/m/index.html), [CSS](/styles/rainbow_noise.css)
