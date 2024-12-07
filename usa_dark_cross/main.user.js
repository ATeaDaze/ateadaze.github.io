// ==UserScript==
// @name         Dark Mode for USA Today Crossword Puzzle
// @namespace    https://github.com/ATeaDaze/ateadaze.github.io
// @version      2024-12-06
// @description  Load dark mode CSS remotely
// @author       Jeff McMillin
// @match        http*://puzzles.usatoday.com/*
// @icon         https://ateadaze.github.io/images/owl_cave-small.png
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/ATeaDaze/ateadaze.github.io/refs/heads/main/usa_dark_cross/style.css
// @resource     https://ateadaze.github.io/scripts/jquery-3.7.0.min.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    let dark_mode_changes = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(dark_mode_changes);
})();
