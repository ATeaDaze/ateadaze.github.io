# [Basic Blackjack](https://github.com/ATeaDaze/ateadaze.github.io/tree/main/blackjack)

### A simple blackjack app written in (mostly) native JavaScript. Uses some jQuery for cleaner syntax. No additional libraries or anything fancy

## [Desktop](https://ateadaze.github.io/blackjack) || [Mobile](https://ateadaze.github.io/blackjack/m)
![blackjack_banner](/blackjack/images/blackjack_banner.png)

## Features
* **Play Blackjack** against a computer-controlled dealer
  * **Dealer stands on all 17's**
  * **Blackjack pays 3:2** odds (150%)
* **Place bets:** $25, $50, $100, $200
* **Double Down** if you're feeling lucky
* **Uses six 52-card decks:** no duplicate cards drawn

# 💻 [Desktop](https://ateadaze.github.io/blackjack)
![blackjack_screenshot.png](/blackjack/images/blackjack_screenshot.png)

## Keyboard Map

Key|Description
---|:--
|**` S `** Stand| Stop dealing cards to the player and let the dealer play their hand
|**` H `** Hit| Deal 1 card to the player
|**` D `** Double Down| Double your bet, deal 1 more card, and stand
|**` N `** New Hand| Deal a new hand

# 📱 [Mobile](https://ateadaze.github.io/blackjack/m/)
![mobile_screenshot](/blackjack/images/blackjack-mobile_screenshot.png)

### Key:
* [TEST] = Added, needs more testing
* [WIP] = Work in progress
* ~~Strikethrough~~ = Cancelled

# BUGS

* [ ] Tie at 21 doesn't evaluate until you stand
* [ ] Mobile rendering is inconsistent (but playable)
* [x] ~~Some sounds are muted in specific browsers~~
  
Each browser handles JavaScript sound differently. Some are stricter than others or only play sounds tied to user input
* Firefox on Windows plays all SFX (with audio site permission)
* Chromium-based browsers play all SFX except "card_shuffle.mp3" on page load
* Firefox on Android plays all SFX except "card_flip.mp3" on `hit()`

# FIXES

* [x] Occasionally froze when looking for a new card
  * **Cause:** crashed on `shuffleDeck()` if `nTotalCards > 51`
  * **Fix:** created offset to limit range of the check

```javascript
// nTotalCards (number of cards used)
// nCardsInPlay (number of cards on the table)
nCardOffset = (52 - ncardsInPlay) - 4

if(nTotalCards > nCardOffset) {
  swapDecks(currentDeck);
  shuffleDeck(currentDeck);
}
```

# TODO

## General
* [ ] [WIP] Get rid of extraneous code and optimize
  * [ ] Player strings and text: `number()`, `toLocale()`, `slice()`
  * [ ] Repeated strings/operations
  * [ ] Hideous if/else blocks
* [ ] [WIP] Clean up code with jQuery
* [x] [TEST] Make mobile version
* [ ] Add a split feature
    * [ ] This will require a 2nd game board for each player
      * Make the cards smaller, change scaling, or re-orient the game board

## Card Deck Generation
* [x] Generate 2 to 6 decks
 * [x] Combine decks into a single pool of 312
* [x] Track number of aces to subtract 10 if over 21

## Winner Checks
* [ ] Combine and clean up checks
    * `checkForWins()`
    * `checkFinalScore()`
  * [ ] Use priority order to optimize checks

## Score Calculation
* [ ] [WIP] Optimize `getCardValue`
* [ ] Calcuate ace values with a single function
* [ ] [TEST] Check win condition for rare double bust
* [x] [TEST] Properly handle rare double blackjack
* [ ] [WIP] Handle ties better
* [ ] [WIP] Push when both scores are 21 but not blackjack (currently evaluates on `stand()`)
* [x] Handle Blackjack vs regular 21 (Blackjack wins over 21)

## Dealer
* [ ] Change dealer strategy
  * [ ] Draw to 16
  * [ ] Stand on 17
   * Basic strategy: when does a dealer hit on 16?

This doesn't seem significantly different than simply drawing to 17

## User Interface
* [ ] Update UI to properly render on a wider variety of devices
  * Refresh my knowledge of CSS: viewport, vh, absolute/relative, etc. 
  * This could make the mobile port redundant if done properly 
* [x] [TEST] Display true count (card counting)
  * `True count = (running count / decks remaining)` 
* [ ] [WIP] Use images for all buttons
* [x] Add sound effects
  * [x] Add button to disable sound effects
* [x] Add help menu with instructions and rules
* [x] Make bet buttons look like casino chips
 * [ ] Lower image sizes to improve loading time
* [x] Add bet amount buttons
  * [ ] Add buttons to increase/decrease bet by X dollars
* [x] Add double down button
  * [x] Disable button with > 2 cards (standard casino rule)
* [x] Add a help menu (simple popup with hide/close buttons)

# POSSIBLE BUG

**NOTE:** Blackjack typically used 2 to 5 decks shuffled together. This may not be a bug so increasing the pool to draw from all 104 cards may be a more accurate solution

* [ ] Rarely draws duplicate cards when deck changes or is shuffled (duplicates don't carry over)
  * [ ] Possible fix: force a shuffle or deck swap on new hands if < X cards remain
