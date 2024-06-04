# S.T.A.L.K.E.R. Shadow of Chernobyl - Remove Intro Videos

## This file removes the intro videos but allows the cutscenes to play

* **Company intro videos are skipped:** THQ, GSC, and ASUS (NVIDIA video is already disabled by default)
* **Intro video plays normally:** the famous intro with the death truck and Savior bringing you to Cordon
* **Remaining cutscenes play:** I did not edit anything below the intro section

# Instructions

## [Download the mod](https://github.com/ATeaDaze/ateadaze.github.io/raw/main/stalker_intro_tweak/stalker_no_intro_movies.zip) (ZIP archive)

## Verify you have mod support enabled (gamedata)

> *You can skip to the [Installation section](#installation) if you're **100% certain** you've already done this*

- Open the root directory of your STALKER installation. Example: `D:\Games\Steam\steamapps\common\STALKER Shadow of Chernobyl`

(**Optional**) make a backup copy of `fsgame.ltx` and the `gamedata` folder so you can easily revert the changes, if needed

1. Open `fsgame.ltx` in a text editor (Notepad or any plaintext editor)
2. Find the `$game_data$` entry (it was line 2 on my computer)
3. If your entry looks like this: `$game_data$      = false| true| $fs_root$|    gamedata\`
4. Then simply replace `false` with `true` and save the file
5. It should look like this after you update it: `$game_data$      = true| true| $fs_root$|    gamedata\`

> **Note:** you don't need to edit anything if it's already set up like I've shown in step 5


## Installation

### 1. Extract the `gamedata` folder from the archive and copy it to your STALKER directory

- It has to be copied with the folder structure from the archive:

`gamedata\config\ui\ui_movies.xml` and `gamedata\textures\intro\blank_screen.dds`

(Copying the `gamedata` folder directly from the ZIP file to your STALKER folder ensures the folder structure is correct)

**Note:** check the names of the files if you get overwrite confirmation requests
- If you get a message asking you to **merge folders** select `[Yes]`
- Use caution if it asks you to overwrite `ui_movies.xml`

If `ui_movies.xml` exists then it's possible you have another mod that edits it. You can overwrite the file but it could break mods that modify cutscenes or videos

- If it *only asks you to merge the folders* but **not** `ui_movies.xml` then you can safely confirm the overwrite (`gamedata`, `config`,  `ui`, `textures`, and `intro`)

### 2. Run the game to verify it's working properly

If it doesn't work then copy the backup files to their original location

-----

### You can [view my fsgame.ltx file](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/fsgame.ltx) as a reference

It may not look identical but the `$game_data$` line should be the same

### If you want to edit the XML file manually then you can [view the raw file here](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/ui_movies.xml)

-----

## Additional Information

**Question:** Can't you just use `-nointro` as a launch parameter?<br>
**Answer:** Yes, but that also disables the intro cutscene. I like the "death truck" video that plays before you meet Sidorovich as it sets the tone for the game

Let me know if you have any issues, questions, or suggestsions

## Alternate version: this one replaces the logos with the "death truck" intro

### [Download ZIP](https://github.com/ATeaDaze/ateadaze.github.io/raw/main/stalker_intro_tweak/stalker_intro_tweak-release.zip): the installation instructions are identical but it only has 1 `gamedata` folder and 1 file

> This mod is a quick and dirty tweak. I simply commented-out all of the introduction videos. Then, I added a new entry to display a blank/black texture for 0 seconds
