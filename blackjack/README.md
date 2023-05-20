## Key
* [WIP] = Work In Progress
* [TESTING] = Added, needs more testing
* ~~Strikethrough~~ = Cancelled

# BUGS

* [ ] Tie at 21 doesn't evaluate until you stand
* [ ] Infrequent freezes when looking for new card
  * [ ] Need to optimize fineUniqueCard()
  * [ ] Clean up the card check
  * [ ] Possibly hitting an out-of-range array value

# TODO

* [ ] [WIP] Bet buttons
* [x] Make bet buttons look like casino chips (CSS circles or images)
* [ ] Generate 2 decks: deck2 = deck1, shuffle(deck2)
* [ ] [TESTING] Track number of aces to subtract 10 if over 21
* [ ] [TESTING] Push when both scores are 21 but not blackjack
* [ ] Add values for card counting
* [x] Add double down button
  * [x] Disable double down with >= 3 cards

* [ ] Add 2 to 5 more decks
* [ ] Get rid of extraneous code
  * [ ] Cleaning card strings/text
  * [ ] Repeated strings/operations
  * [ ] Combine and clean up winner checks
    * [ ] checkForWins();
    * [ ] checkFinalScore();

* [ ] Change dealer strategy: draw to 16, stand on 17
  * [ ] When to hit on 16?
* [x] ~~Add bet amount buttons (+10/-10, +50/-50)~~
* [ ] [WIP] Clean up code with jQuery
* [ ] Add split function

* [ ] [WIP] Evaluate
  * [ ] Check for win conditions
  * [ ] [TESTING] Handle ties better
  * [ ] [TESTING] Test evaluation for double blackjack
  * [ ] [TESTING] Handle Blackjack vs regular 21 (Blackjack wins over 21)

* [ ] [WIP] Make mobile version (smaller screen)

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

# COLOR LIST
```
card deck red:    #FF5555
card deck black:  #333333

red:              #ff0000
pale red:         #ff3232

indianred:        #cd5c5c
pale indianred:   #f26d6d

chartreuse:   
pale chartreuse:   #afff60
```
