# Basic Blackjack
A Blackjack app written in JavaScript

## [Desktop](https://ateadaze.github.io/blackjack) || [Mobile](https://ateadaze.github.io/blackjack/m)
![blackjack_banner](/blackjack/images/blackjack_banner.png)

## Features
* **Play Blackjack** against an "AI" dealer
  * **Dealer stands on all 17's**
  * **Blackjack pays 3:2**
* **Place bets:** $25, $50, $100, $200
* **Double Down** if you're feeling lucky
* **52-card deck:** no duplicate cards (needs optimization)

# 💻 Desktop: [ateadaze.github.io/blackjack](https://ateadaze.github.io/blackjack)
![blackjack_screenshot.png](/blackjack/images/blackjack_screenshot.png)

### Keyboard Map
```
[H]it [S]tand [D]ouble Down
Deal a [N]ew Hand
```

# 📱 Mobile: [ateadaze.github.io/blackjack/m](https://ateadaze.github.io/blackjack/m/)
![mobile_screenshot](/blackjack/images/blackjack-mobile_screenshot.png)

# TODO

```
Key: [x]=Done, [t]=Added, needs more testing, [w]=WIP, [o]=Needs optimization, [-]=Cancelled

[w] Bet buttons
[x] Make bet buttons look like casino chips (CSS circles or images)
[ ] Generate 2 decks: deck2 = deck1, shuffle(deck2)
[t] Track number of aces to subtract 10 if over 21
[t] Push when both scores are 21 but not blackjack
[ ] Add values for card counting
[x] Add double down button
  [x] Disable double down with >= 3 cards

[ ] Add 2 to 5 more decks
[ ] Get rid of extraneous code
  [ ] Cleaning card strings/text
  [ ] Repeated strings/operations
  [ ] Combine and clean up winner checks
    [ ] checkForWins()
    [ ] checkFinalScore()

[ ] Change dealer strategy: draw to 16, stand on 17
  [ ] When to hit on 16?
[-] Add bet amount buttons (+10/-10, +50/-50)
[w] Clean up code with jQuery
[ ] Add split function

[w] Evaluate
  [o] Check for win conditions
  [t] Handle ties better
  [t] Test evaluation for double blackjack
  [t] Handle Blackjack vs regular 21 (Blackjack wins over 21)

[w] Make mobile version (smaller screen)

```

# BUGS

```
[ ] Tie at 21 doesn't evaluate until you stand
[ ] Infrequent freezes when looking for new card
  [ ] Need to optimize fineUniqueCard()
  [ ] Clean up the card check
  [ ] Possibly hitting an out-of-range array value
```


# Function Outline

## Main
```
mainGameLoop()
  generateCardDeck()
  getKeyboardInput()
  shuffleCardDeck()
```
## Deal Card and Find Value
```
drawPlayerCard()
drawDealerCard()
  findUniqueCard()
  cleanCardString()
  getCardValue()
```
### Update Score and Game Board
```
updateScore()
updateCards()
```
#### Check for Winners
```
  checkForWins()
  checkFinalScore()
```
## Player Actions
```
doubleDown()
stand()
  endCurrentRound()
```
## Miscellaneous
```
restartGame()
  clearScoreboard()
reloadPage()
```
