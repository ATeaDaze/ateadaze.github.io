# Basic Blackjack
A Blackjack app written in (mostly) native JavaScript. Uses some jQuery for cleaner syntax. No additional libraries or anything fancy

## [Desktop](https://ateadaze.github.io/blackjack) || [Mobile](https://ateadaze.github.io/blackjack/m)
![blackjack_banner](/blackjack/images/blackjack_banner.png)

## Features
* **Play Blackjack** against a computer-controlled dealer
  * **Dealer stands on all 17's**
  * **Blackjack pays 3:2** odds (150%)
* **Place bets:** $25, $50, $100, $200
* **Double Down** if you're feeling lucky
* **Single 52-card deck:** no duplicate cards drawn

# Desktop 💻 [ateadaze.github.io/blackjack](https://ateadaze.github.io/blackjack)
![blackjack_screenshot.png](/blackjack/images/blackjack_screenshot.png)

## Keyboard Map

Key|&nbsp;|Description
---|:--|:--
|**` S `**|Stand| Stop dealing cards to the player and let the dealer play their hand
|**` H `**|Hit| Deal 1 card to the player
|**` D `**|Double down| Double your bet, deal 1 more card, and stand
|**` N `**|Deal| Start a new hand (disabled if hand is already active)

# Mobile 📱 [ateadaze.github.io/blackjack/m](https://ateadaze.github.io/blackjack/m/)
![mobile_screenshot](/blackjack/images/blackjack-mobile_screenshot.png)

### Key:
* [TEST] = Added, needs more testing
* [WIP] = Work in progress
* ~~Strikethrough~~ = Cancelled

# BUGS

* [ ] Tie at 21 doesn't evaluate until you stand
* [x] [TEST] Occasionally froze when looking for a new card
  * Cause: crashed on `shuffleDeck()` if `nTotalCards` was > 51
  * Fix: set card offset to limit range of check `(52-cardsInPlay-4)`
* [ ] [WIP] Optimize `findUniqueCard()`

# TODO

## General
* [ ] Get rid of extraneous code and optimize
  * [ ] Player strings and text: `number()`, `toLocale()`
  * [ ] Repeated strings/operations
* [ ] [WIP] Make mobile version
* [ ] Add split feature
    * [ ] Requires a 2nd game board for each player (screen space)

## Card Deck Generation
* [ ] Generate 2 to  5 decks
`currentDeck = deck1;`
- Start a new game
- Use all cards in `deck1`
```
deck2 = deck1;
shuffle(deck2);
currentDeck = deck2...
```
* [x] Track number of aces to subtract 10 if over 21
* [x] [TEST] Push when both scores are 21 but not blackjack (currently evaluates on `stand()`)

## Score Evaluation
* [ ] [WIP] Improve score evaluation
  * [ ] Combine and clean up winner checks
    * [ ] Use priority order to optimize and fix rare bugs (e.g. 21/21 tie)
    * [ ] `checkForWins()`
    * [ ] `checkFinalScore()`
  * [x] [TEST] Handle ties better
  * [x] [TEST] Set check for rare double blackjack
  * [x] Handle Blackjack vs regular 21 (Blackjack wins over 21)

## Dealer
* [ ] Change dealer strategy: draw to 16 / stand on 17's
 * [ ] `drawDealerCard()` to 16 (when to hit on 16?)
* [ ] `stand()` on 17

## User Interface
* [x] Add sound effects
  * [x] Add button to disable sound effects
* [x] Add help menu with instructions and rules
* [ ] [WIP] Use images for buttons
* [x] Make bet buttons look like casino chips
* [x] Add bet amount buttons
  * [ ] Add buttons to increase/decrease bet by X
* [ ] [WIP] Spruce and clean up code with jQuery
* [x] Add double down button
  * [x] Disable button with > 2 cards
* [ ] Add -1/0/+1 values to practice card counting
* [x] Add a help menu (simple popup with hide/close buttons)
