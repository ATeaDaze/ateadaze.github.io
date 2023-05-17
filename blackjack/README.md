*Key:* [x]=Done, [w]=WIP, [o]=Needs optimization, [t]=Needs more testing [-]=Cancelled

**TODO**
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

[ ] Make mobile version (smaller screen)

**Function Outline**

# Main
mainGameLoop()
  generateCardDeck()
  getKeyboardInput()
  shuffleCardDeck()

# Deal card and find integer value
drawPlayerCard()
drawDealerCard()
  findUniqueCard()
  cleanCardString()
  getCardValue()

# Update scoreboard and game board
updateScore()
updateCards()
  # Check for winners
  checkForWins()
  checkFinalScore()

# Player actions
doubleDown()
stand()
  endCurrentRound()

# Miscellaneous
restartGame()
  clearScoreboard()
reloadPage()


**Color List**
card deck red:    #FF5555
card deck black:  #333333

red:              #ff0000
pale red:         #ff3232

indianred:        #cd5c5c
pale indianred:   #f26d6d

chartreuse:   
pale chartreuse:   #afff60


**GENERAL STRUCTURE**
- Generate 52 card deck
- Deal 2 cards to player
  - Verify card is not in-use

- Deal 1 card to dealer
  - Verify card is not in-use

- Evaluate

- Stand
  - Stop dealing cards to player
  - Dealer draws 2nd card
  - Dealer draw until they hit 17
  - Evaluate

- Hit
  - Deal 1 card to player
  - Evaluate






**TODO LIST (OLD)**
[x] Hide value of 2nd card: not needed as dealer only shows 1 card until player is done

























# Generate 2 hands
  - Dealer
  - Player

# 52 card deck
*Spade* 2 to 10, J, Q, K, A
s2, s3 ... sJ, sQ, sK, sA

*Heart* 2 to 10, J, Q, K, A
h2, h3 ... hJ, hQ, hK, hA

*Club* 2 to 10, J, Q, K, A

*Diamond* 2 to 10, J, Q, K, A

string cardSuit = "JQKA"

function buildDeck() {

for(i = 2; i++; i <= 10)
  Console.log(i);  
  }

}