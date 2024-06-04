# S.T.A.L.K.E.R. Shadow of Chernobyl Intro Tweak

## This file replaces the company logo intro movies with the opening cutscene

The rest of the game's cutscenes will play normally as I did not edit anything below the intro

# Instructions

## Download: [stalker_intro_tweak-release.zip](https://github.com/ATeaDaze/ateadaze.github.io/raw/main/stalker_intro_tweak/stalker_intro_tweak-release.zip)

## Verify you have mod support enabled (gamedata)

> *You can skip to the [Installation section](#installation) if you're **100% certain** you've already done this*

- Open the root directory of your STALKER installation. Example: `D:\Games\Steam\steamapps\common\STALKER Shadow of Chernobyl`

**Optional:** make a backup copy of `fsgame.ltx` and the `gamedata` folder so you can easily revert the changes, if needed

1. Open `fsgame.ltx` in a text editor (Notepad or any plaintext editor)
2. Find the `$game_data$` entry (it was line 2 on my computer)
3. If your entry looks like this: `$game_data$      = false| true| $fs_root$|    gamedata\`
4. Then simply replace `false` with `true` and save the file
5. It should look like this after you update it: `$game_data$      = true| true| $fs_root$|    gamedata\`

> **Note:** you don't need to edit anything if it's already set up like step 5


## Installation

### 1. Extract the `gamedata` folder from the archive and copy it to your STALKER directory

- It has to be copied with the folder structure from the archive: `gamedata\config\ui\ui_movies.xml`

**Warning:** If you see a confirmation message like "Are you sure you want to overwrite ui_movies.xml?" then another mod has already edited your movie configuration

- I do NOT recommend overwriting the file as the existing mod edits are almost certainly more important than this minor tweak
- However, if it *only asks you to overwrite the folders* (`gamedata`, `config`, and `ui`) but **not** `ui_movies.xml` then you can safely confirm the overwrite

### 2. Run the game to verify it's working properly

If it doesn't work then copy the backup files to their original location. Feel free to report any issues or ask questions

-----

### You can [view my fsgame.ltx file](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/fsgame.ltx) as a reference

It may not look identical but the `$game_data$` line should be the same

### If you want to edit ui_movies.xml manually then you can [view the raw file here](https://github.com/ATeaDaze/ateadaze.github.io/blob/main/stalker_intro_tweak/raw_files/ui_movies.xml)

-----

## Additional Information

**Question:** Can't you just use `-nointro` as a launch parameter?

**Answer:** Yes, but that also disables the intro cutscene. I like the "death truck" video that plays before you meet Sidorovich as it sets the tone for the game

**Closing Thoughts:**
- This is a quick and dirty edit I made out of frustration
- There were no solutions available online (surprisingly)
- I am looking into replacing the intro movie with a blank (or very short) video file
- I tried to simply remove all the intro video references but it crashes without *at least 1* valid entry
- This is *slightly* redundant as the cutscene will play one more time on a new save file (it's not elegant but it works)

> Generally, it's much easier to skip intro movies in games by replacing files or editing an INI file

> STALKER seems to handle intro movies differently than a lot of games I've modified

> For example, you can simply replace the videos with empty files of the same name in Grand Theft Auto 3D-era games and most Bethesda games

