// ==UserScript==
// @name         Dark Mode for USA Today Crossword Puzzle
// @namespace    https://puzzles.usatoday.com/*
// @version      2024-12-06
// @description  Load dark mode CSS remotely
// @author       Jeff McMillin
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @resource   IMPORTED_CSS https://raw.githubusercontent.com/ATeaDaze/ateadaze.github.io/refs/heads/main/usa_dark_cross/style.css
// @grant      GM_getResourceText
// @grant      GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const dark_mode_changes = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(dark_mode_changes);
})();
