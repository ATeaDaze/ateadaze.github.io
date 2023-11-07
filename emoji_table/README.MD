# 🔳 Emoji Table

### [WIP] Prints emojis in a table with 10 columns. Clicking an emoji copies it to the clipboard

## 💻 [Desktop](https://ateadaze.github.io/emoji_table/)

![emoji_table-repo_banner](/images/emoji_table-header.png)

* **[Source Code](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/emoji_table/scripts/main.js)**

# Features
* [x] **1,123 emojis in-range (WIP):** need to optimize the ranges and add some missing emojis
* [x] **257 country flags:** includes every flag (as of Emoji v3.0)
* [x] **1-click copy-to-clipboard:** click any emoji to copy it to the clipboard
* [x] **Themes:** basic light and dark modes
  * [x] Auto-detect (if user preference is set per OS/browser)

# Changes / Issues / Fixes
* [ ] Move array data to separate files
* [ ] Optimize ranges: definitely missing some Emojis
* [ ] Modify toast timeout to fix overlapping and cut-off messages
* [ ] Unable to render rainbow flag with code
* [ ] Add keyword pairs for filter/search
 * [ ] Create sub-sections with titles
* [x] Refactor and reduce repetition with table functions

# Structure
* [x] Generate list of emojis
* [x] Create a table
  * [x] Create a new row after the 10th column
  * [x] Draw each emoji in its own table cell
  * [x] Draw each flag in its own cell
  * [x] Draw a dark mode button if it's the 1st cell

# [**fullEmojiList[]**](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/emoji_table/fullEmojiList.md): full list of emojis printed

# [**flagCodeList[]**](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/emoji_table/flagCodeList.md): full list of flags
