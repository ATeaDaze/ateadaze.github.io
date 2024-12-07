# Dark Mode for USA Today Crossword Puzzle

* Adds a basic dark mode theme to USA Today's Crossword Puzzle, Quick Cross, and Puzzle Archives
* The theme is set by external CSS loaded with a local userscript

> [!IMPORTANT]
> **[Requirements](#requirements)**
> * Greasemonkey or Tampermonkey browser extension
> * JavaScript enabled in browser

<picture>
<img src="images/usa_today_crossword-dark_mode-1.png">
</picture>

## Installation

1. [Download](https://github.com/ATeaDaze/ateadaze.github.io/raw/refs/heads/main/usa_dark_cross/main.user.js) the userscript from the direct link
2. Click `[Install]` to confirm installation of `main.user.js` in Tampermonkey or Greasemonkey [^1]

> [!TIP]
> 3. (Optional) Test and verify its working: https://puzzles.usatoday.com/

<picture>
<img src="images/usa_dark_cross-install-1.png">
</picture><br><br>

> [!NOTE]
> Enable the "Dark Mode for USA Today Crossword Puzzle" userscript in the [dashboard](#how-to-open-the-dashboard) if it's disabled by default

## Requirements

||<picture><img src="https://addons.mozilla.org/user-media/addon_icons/683/683490-64.png?modified=1625638973" width="50px"></picture><br>Tampermonkey|<picture><img src="https://addons.mozilla.org/user-media/addon_icons/0/748-64.png?modified=1531822767" width="50px"></picture><br>Greasemonkey|
|---|---|---|
|<picture><img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" width="50px"></picture>|[Dowload for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)|[Dowload for Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)|
|<picture><img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" width="50px"></picture>|[Dowload for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?pli=1)|Not Available|

## Additional Information

I made this because USA Today doesn't have native dark mode for their crossword puzzles. I tried setting up a static theme with [Dark Reader](https://darkreader.org/) but I had to manually disable and enable the extension to get my sheet to load. It's a great extension but static CSS did not work for me

## Source Code

* **JavaScript:** [main.user.js](main.user.js)
* **CSS:** [style.css](style.css)

## How to Open the Dashboard

<picture>
<img src="images/usa_dark_cross-install-2.png">
</picture><br><br>

[^1]: You can click the direct download link and click `[Install]` to confirm it *or* copy-and-paste the contents of `main.user.js` into a new userscript manually


