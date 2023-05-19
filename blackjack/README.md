# TODO / BUGS
```
Key: [x]=Done, [w]=WIP, [o]=Needs optimization, [t]=Needs more testing [-]=Cancelled

[t] Bet buttons
[ ] Make bet buttons look like casino chips (CSS circles or images)
[ ] Generate 2 decks: deck2 = deck1, shuffle(deck2)
[t] Track number of aces to subtract 10 if over 21
[t] Push when both scores are 21 but not blackjack
[ ] Add values for card counting

[ ] Get rid of extraneous code
  [ ] Cleaning card strings/text
[ ] Set dealer to draw to 16 but stand on 17 (maybe)
[x] Add double down button
  [x] Disable double down with >= 3 cards
[ ] Add bet amount buttons (+10/-10, +50/-50)
[ ] Add split function
[w] Clean up code with jQuery

[w] Evaluate
  [o] Check for win conditions
  [t] Handle ties better
  [t] Test evaluation for double blackjack
  [t] Handle Blackjack vs regular 21 (Blackjack wins over 21)

[w] Make mobile version (smaller screen)

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
