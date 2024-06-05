# S.T.A.L.K.E.R. Shadow of Chernobyl - Remove Intro Videos

## This file removes the intro videos but keeps the opening cutscene (even on new saves)

* **Company intro videos are skipped:** THQ, GSC, ASUS, and NVIDIA videos
* **Intro video plays normally:** the famous intro with the death truck and Savior bringing you to Cordon
* **Works on subsequent new saves:** it always annoyed me was how the intro only plays on your first new save
* **Remaining cutscenes play:** I did not edit anything below the intro section

# Instructions

## [Download the mod](https://github.com/ATeaDaze/ateadaze.github.io/raw/main/stalker_intro_tweak/stalker_no_intro_movies.zip) (ZIP archive)

## Verify you have mod support enabled (gamedata)

> *You can skip to the [Installation section](#installation) if you're **100% certain** you've already done this*

- Open the root directory of your STALKER installation. Example: `D:\Games\Steam\steamapps\common\STALKER Shadow of Chernobyl`

(**Optional**) make a backup copy of `fsgame.ltx` and the `gamedata` folder so you can easily revert the changes, if needed

1. Open `fsgame.ltx` in a text editor
2. Find the `$game_data$` entry (it was line 2 on my computer)
3. If your entry looks like this: `$game_data$      = false| true| $fs_root$|    gamedata\`
4. Replace `false` with `true` and save the file
5. It should look like this after you update it: `$game_data$      = true| true| $fs_root$|    gamedata\`

> **Note:** you don't need to edit anything if it's already set up like I've shown in step 5

## Installation

### 1. Open the `stalker_no_intro_movies.zip` archive

The archive contains 2 main folders (install only one of them)

* **Vanilla** for users without a modified `config\ui\ui_movies.xml` file
* **ZRP-107** for Zone Reclamation Project users (v1.07 R5 RC)

### 2. Open the "Vanilla" or "ZRP-107" folder

### 3. Copy the `gamedata` folder *directly* to your STALKER install folder

* Select `[Yes]` if it asks you to merge folders
* If it asks if you want to overwrite `ui_movies.xml` then use discretion (see below)

### An existing `ui_movies.xml` means another mod already uses that file

* The Zone Relclamation Project comes with an edited version so you will definitely see that with ZRP installed
* If you're confident that you haven't installed any other mods that edit `ui_movies.xml` then you can safely overwrite it

If you're unsure then you can check your installed mod archives to see which one modifies the movie data. You can also manually edit the XML file to remove the entries and add a blank video (see below for the raw XML files)

-----

### You can view my [fsgame.ltx](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/fsgame.ltx) file as a reference

It may not look identical but the `$game_data$` line should be the same

### Here are the XML files if you want to edit them manually: [Vanilla](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/Vanilla/ui_movies.xml), [ZRP](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/ZRP-107/ui_movies.xml)

-----

## Additional Information

**Question:** Can't you just use `-nointro` as a launch parameter?<br>
**Answer:** Yes, but that also disables the intro cutscene. I like the "death truck" video that plays before you meet Sidorovich as it sets the tone for the game

Let me know if you have any issues, questions, or suggestsions

> This mod is a quick and dirty tweak. I simply commented-out all of the introduction videos. Then, I added a new entry to display a blank/black texture for 0 seconds
