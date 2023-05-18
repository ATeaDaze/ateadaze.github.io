// TODO: refactor, spruce it up with jQuery, draw white background on cards
// Add double-down button (simple and addictive)
// 52 card deck = 4 suits (Spade, Heart, Club, Diamond) and 13 ranks (2:10, Jack, Queen, King, Ace)
const fullDeck = [
// ASCII characters (Emojis break score calculation for some reason)
  ['♠','♥','♣','♦'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];
// Commonly used strings
const defaultGreeting = "BLACKJACK PAYS 3:2 🍀 Dealer stands on 17";
const btnDisableCSS = "background-color: #222222; cursor: not-allowed";
const btnEnableCSS = "background-color: #111111; cursor: pointer";
const statusBarWinCSS = "color: chartreuse; animation: 2s anim-flipX ease 1;";
const statusBarLoseCSS = "color: #ff6161";
// Counter for deck generation
let count = 0;
// Clear card deck
let card = [];
// Tracks used cards to prevent duplicates
let usedCard = [];
// Score for each hand
let playerScore = 0;
let dealerScore = 0;
// Total money available
let playerMoney = 500;
let dealerMoney = 2000;
let betAmount = 50;
let betAmountWithOdds = betAmount*0.5;
// Number of cards in-play
let nDealerCards = 0;
let nPlayerCards = 0;
let nTotalCards = 0;
// Track number of aces to modify values
let currentPlayer = "Player";
let nAcesPlayer = 0;
let nAcesDealer = 0;
let bFullAcePlayer = false;
let bFullAceDealer = false;
let bAceSwappedPlayer = false;
let bAceSwappedDealer = false;
// Flags for tracking game
let bGameOver = false;
let bPlayerWon = false;
let bDuplicateFound;
// Display string for cards
let cardFaceSuit;
let cardFaceRank;

// Generate 52 card deck
generateCardDeck();
// Watch for keyboard input (N, S, H)
getKeyboardInput();

function mainGameLoop() {
statusBarTxt.innerHTML = defaultGreeting;
  btnNewGame.disabled = true;
  btnNewGame.style = btnDisableCSS;
  // Deal 2 cards to player on 1st hand
  drawPlayerCard();
  drawPlayerCard();
/*
  drawPlayerCard();
  drawPlayerCard();
  drawPlayerCard();
  drawPlayerCard();
  drawPlayerCard();
*/

  // Deal 1 card to dealer at start
  drawDealerCard();
/*
  drawDealerCard();
  drawDealerCard();
  drawDealerCard();
  drawDealerCard();
  drawDealerCard();
  drawDealerCard();
*/

  checkForWins();
  // If the entire deck has been used then shuffle the deck (52 max but 46 is safer)
  if(nTotalCards > 46) {
    shuffleDeck();
  }
}

// Reset values and start a new hand
function restartGame() {
  betAmount = 50;
  playerScore = 0;
  dealerScore = 0;
  nDealerCards = 0;
  nPlayerCards = 0;
  currentPlayer = "Player";
  nAcesPlayer = 0;
  nAcesDealer = 0;
  nAcesPlayerOld = 0;
  nAcesDealerOld = 0;
  bFullAcePlayer = false;
  bFullAceDealer = false;
  bAceSwappedPlayer = false;
  bAceSwappedDealer = false;
  bGameOver = false;
  updateScore();
  clearScoreboard();
  dealerScoreTxt.style = "color:#ffffff";
  playerScoreTxt.style = "color:#ffffff";
  statusBarTxt.style = "color: #ffffff";
  statusBarTxt.innerHTML = defaultGreeting;
  // Enable player buttons
  btnHit.disabled = bGameOver;
  btnHit.style = btnEnableCSS;
  btnDoubleDown.disabled = bGameOver;
  btnDoubleDown.style = btnEnableCSS;
  btnStand.disabled = bGameOver;
  btnStand.style = btnEnableCSS;
  mainGameLoop();
}

// Draw 1 card for player
function drawPlayerCard() {
  currentPlayer = "Player";
  findUniqueCard();
  cleanCardString();
  playerScore = getCardValue(playerScore);
  nPlayerCards++;
  updateCards(gameBoardPlayer);
  updateScore();
  checkForWins();
}

// Draw 1 card for dealer
function drawDealerCard() {
  currentPlayer = "Dealer";
  findUniqueCard();
  cleanCardString();
  dealerScore = getCardValue(dealerScore);
  nDealerCards++;
  updateCards(gameBoardDealer);
  updateScore();
  checkForWins();
}

// Verify drawn card is not in-use
function findUniqueCard() {
  bDuplicateFound = true;
  // Look for a new card and skip duplicates
  while(bDuplicateFound) {
    randCardIndex = Math.floor(Math.random() * 52);
    // Use current card pick if it's not in-use
    if(card[randCardIndex] != usedCard[randCardIndex]) {
      newCard = card[randCardIndex];
      // Add drawn card to the list of used cards
      usedCard[randCardIndex] = newCard;
      bDuplicateFound = false;
      nTotalCards++;
    }
  }
}

function cleanCardString() {
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  newCardTxt = newCard.slice(1);
}

function getCardValue(score, bAceDrawn) {
  // Use card value if it's 2:10
  if( (newCardValue > 1) && (newCardValue < 11) ) {
    score = score + newCardValue;
    // Use 10 if it's a face card (Joker, Queen, King)
  } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      score = score + 10;
  // Player Ace: use 11, if that would exceed 21 then use 1
  } else if((newCardTxt == 'A')&&(!bFullAcePlayer)&&(currentPlayer == "Player")) {
    if((score + 11) < 22) {
      score = score + 11;
      // Set flag that Ace is in-play as an 11
      bFullAcePlayer = true;
    } else {
      score = score + 1;
    }
  // ACES // TODO: make this a single function
  // Dealer Ace: use 11, if that would exceed 21 then use 1
  } else if ((newCardTxt == 'A')&&(!bFullAceDealer)&&(currentPlayer == "Dealer")) {
    if((score + 11) < 22) {
      score = score + 11;
      bFullAceDealer = true;
    } else {
      score = score + 1;
    }
  } else {
    score = score + 1;
  }
  // If an Ace is on the table and player busts then turn Ace into a 1 (-10)
  if((currentPlayer == "Player")&& (bFullAcePlayer) && (!bAceSwappedPlayer) && (score > 21)) {
    score = score - 10;
    // Set swap flag to prevent further score reduction
    bAceSwappedPlayer = true;
  }
  if((currentPlayer == "Dealer")&& (bFullAceDealer) && (!bAceSwappedDealer) && (score > 21)) {
    score = score - 10;
    bAceSwappedDealer = true;
  }
  return(score);
}

// Update the scoreboard and dollar amounts
function updateScore() {
  playerScoreTxt.innerHTML = "Player: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
  // Change text color to red if money is negative
  if(playerMoney < 0) {
    playerScoreTotalTxt.style = statusBarLoseCSS
    // Format string with negative symbol leading dollar sign
    playerScoreTotalTxt.innerHTML = "-$" + -1*(playerMoney);
    // Otherwise set the text back to white
  } else {
    playerScoreTotalTxt.style = "color: white";
    playerScoreTotalTxt.innerHTML = "$" + playerMoney;
  }
  if(dealerMoney < 0) {
    dealerScoreTotalTxt.style = statusBarLoseCSS
    dealerScoreTotalTxt.innerHTML = "-$" + -1*(dealerMoney);
  } else {
    dealerScoreTotalTxt.style = "color: white";
    dealerScoreTotalTxt.innerHTML = "$" + dealerMoney;
  }
  // Disable [DOUBLE DOWN] button if player has more than 2 cards
  if(nPlayerCards > 2) {
    btnDoubleDown.disabled = true;
    btnDoubleDown.style = btnDisableCSS;
  }
}

// Update player cards on screen
function updateCards(gb) {
  // Separate newCard's suit and rank
  cardFaceSuit = newCard.slice(0,1);
  cardFaceRank = newCard.slice(1,3);
  // Create new table data and line break
  let newTD = document.createElement('td');
  let cardLineBreak = document.createElement('br');
  // Add new card inside table
  newTD.append(cardFaceRank);
  newTD.append(cardLineBreak);
  newTD.append(cardFaceSuit);
  $(newTD).addClass("gbSingleCard");
//  newTD.title = cardFaceSuit + " " + cardFaceRank;
  // Display with red text for diamonds and hearts
  if((cardFaceSuit == '♦')||(cardFaceSuit == '♥')) {
    newTD.style = "color: #FF5555";
  // Use dim black text for spades and clubs
  } else {
    newTD.style = "color: #444444";
  }
  // Show new element for animation
  $(newTD).appendTo(gb).show();
  // Flip cards to add some life to the game
  $(newTD).animate({ transformValue: +360 }, {
    step: function(now,fx) {
      $(this).css('transform','rotatey('+now+'deg)');  
    },
    duration: 250
  }, 'linear');
}

// Clear scores
function clearScoreboard() {
  gameBoardPlayer.innerHTML = "";
  gameBoardDealer.innerHTML = "";
}

// Draw 1 card, multiply bet by 2 and stand
function doubleDown() {
  betAmount = betAmount*2;
  drawPlayerCard();
  stand();
}

// Stop dealing cards to player
function stand() {
  // Dealer draws 1 card if they only have 1 showing
  while(dealerScore < 17) {
    drawDealerCard();
  }
  updateScore();
  checkForWins();
  checkFinalScore();
}

function checkScoreDifference() {
  playerDiff = 21 - playerScore;
  dealerDiff = 21 - dealerScore;
}

// Generate 52 card deck from 2-dimensional array
function generateCardDeck() {
  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
      count++;
    }
  }
}

function shuffleDeck() {
  // Clear the list of used cards (prevents memory leak)
  usedCard = [];
  nTotalCards = 0;
  // Shuffle the deck
  card = card.sort((a, b) => 0.5 - Math.random());
  // Display notification
  let x = document.getElementById("toastMessage");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}

// Check for win conditions // TODO: optimize, combine with checkFinalScore()
function checkForWins() {
  // Dealer draws 1 card if they only have 1 showing and player hits blackjack
  if((nDealerCards == 1)&&(playerScore == 21)&&(dealerScore < 17)) {
    drawDealerCard();
  }
  // Check for win conditions if game over flag is not set
  if(!bGameOver) {
    // Check which player is closer to 21
    checkScoreDifference()
    // Check for more win conditions
    if((playerScore == 21)&&(nPlayerCards == 2)&&(dealerScore != 21)) {
      // Player has 21 and only 2 cards
      statusBarTxt.innerHTML = "🃏 Blackjack! ($" + betAmount*1.5 + ")";
      statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
      bPlayerWon = true;
      // Double payout for blackjack (base payout + 0.5x bonus = 1.5x payout)
      playerMoney = playerMoney + betAmountWithOdds;
      dealerMoney = dealerMoney - betAmountWithOdds;
      endCurrentRound();
      // Dealer has 21 and only 2 cards
    } else if((dealerScore == 21)&&(nDealerCards == 2)&&(playerScore != 21)) {
      dealerMoney = dealerMoney + betAmountWithOdds;
      playerMoney = playerMoney - betAmountWithOdds;
      statusBarTxt.innerHTML = "❌ Dealer Blackjack (-$" + betAmount*1.5 + ")";
      statusBarTxt.style = statusBarLoseCSS
      bPlayerWon = false;
      endCurrentRound();
    } else if ((playerScore == 21)&&(nPlayerCards > 2)&&(dealerScore != 21)) {
        if(dealerScore < 17) {
          drawDealerCard()
        } else {
          statusBarTxt.style = statusBarWinCSS
          statusBarTxt.innerHTML = "✔️ Winner ($"+ betAmount + ")";
          bPlayerWon = true;
          endCurrentRound();
        }
    } else if ((dealerScore == 21)&&(playerScore != 21)&&(nDealerCards > 2)) {
      statusBarTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "❌ Dealer Wins (-$" + betAmount + ")";
      bPlayerWon = false;
      endCurrentRound();
      // Player score is over 21
    } else if(playerScore > 21) {
      statusBarTxt.style = statusBarLoseCSS
      playerScoreTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "❌ Bust (-$" + betAmount + ")";
      bPlayerWon = false;
      endCurrentRound();
      // Dealer score is over 21
     } else if(dealerScore > 21) {
      statusBarTxt.style = statusBarWinCSS
      dealerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "✔️ Dealer Bust ($" + betAmount + ")";
      bPlayerWon = true;
      endCurrentRound();
      // Both players have 21
    } else if((playerScore == 21)&&(dealerScore == 21)) {
      if((nPlayerCards < nDealerCards)&&(nPlayerCards == 2)) {
      // Player Blackjack
        statusBarTxt.innerHTML = "🃏 Blackjack! ($" + betAmount*1.5 + ")";
        statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
        bPlayerWon = true;
        // Double payout for blackjack (1.5x bonus + 1x final payout)
        playerMoney = playerMoney + betAmountWithOdds;
        dealerMoney = dealerMoney - betAmountWithOdds;
        endCurrentRound();
      } else if((nPlayerCards > nDealerCards)&&(nDealerCards == 2)) {
        // Dealer Blackjack (Loss = -50 -25 = -75
        dealerMoney = dealerMoney + betAmountWithOdds;
        playerMoney = playerMoney - betAmountWithOdds;
        statusBarTxt.innerHTML = "❌ Dealer Blackjack (-$" + betAmount*1.5 + ")";
        statusBarTxt.style = statusBarLoseCSS
        bPlayerWon = false;
        endCurrentRound();
      }
    }
  }
}

// Check for win conditions if game over flag is not set
function checkFinalScore() {
  if(!bGameOver) {
    // Check which player is closer to 21
    checkScoreDifference()
    // Check for winners
    if((playerDiff < dealerDiff)&&(playerScore < 22)) {
      statusBarTxt.style = statusBarWinCSS
      statusBarTxt.innerHTML = "✔️ Winner ($" + betAmount + ")";
      bPlayerWon = true;
      endCurrentRound();
    } else if((playerDiff > dealerDiff)&&(dealerScore < 22)) {
      statusBarTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "❌ Dealer Wins (-$" + betAmount + ")";
      bPlayerWon = false;
      endCurrentRound();
      // Players are done drawing cards and scores are equal
    } else if(playerScore == dealerScore) {
      // Subtract $50 from dealer (otherwise a draw awards dealer $5 due to boolean winner flag)
      dealerMoney = dealerMoney - betAmount;
      playerMoney = playerMoney + betAmount;
      statusBarTxt.style = "color: #dddddd";
      statusBarTxt.innerHTML = "🔷 Push ($0)";
      bPlayerWon = false;
      endCurrentRound();
    } 
  }
}

// End the round
function endCurrentRound() {
  // Add and subtract bets from totals
  if(bPlayerWon) {
    playerMoney = playerMoney + betAmount;
    dealerMoney = dealerMoney - betAmount;
  } else {
    dealerMoney = dealerMoney + betAmount;
    playerMoney = playerMoney - betAmount;
  }
  // Draw dealer card if only 1 is showing
  if(nDealerCards == 1) {
    drawDealerCard();
    checkFinalScore();
  }
  updateScore();
  bGameOver = true;
  bPlayerWon = false;
  // Special message if player breaks the house
  if(dealerMoney < 0) {
    statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
    statusBarTxt.innerHTML = "💵 YOU BROKE THE BANK 💵";
  }
  // Disable [HIT] and [STAND] buttons
  btnDoubleDown.disabled = bGameOver;
  btnDoubleDown.style = btnDisableCSS;
  btnHit.disabled = bGameOver;
  btnHit.style = btnDisableCSS;
  btnStand.disabled = bGameOver;
  btnStand.style = btnDisableCSS;
  // Enable [DEAL NEW HAND] button
  btnNewGame.disabled = false;
  btnNewGame.style = btnEnableCSS;
}

// Keyboard shortcuts
function getKeyboardInput() {
  document.addEventListener('keypress', e => {
  // Disable [H]it and [S]tand buttons if game is over
  switch(e.key) {
    case 'h':
      if(!bGameOver) drawPlayerCard();
      break;
    case 's':
      if(!bGameOver) stand();
      break;
    case 'd':
      if((!bGameOver)&&(nPlayerCards < 3)) doubleDown();
      break;
    case 'n':
      if(bGameOver) restartGame();
      break;
    default:
      break;
    }
  })
}

function reloadPage() {
  if(confirm("Reload page?") == true) {
    location.reload();
  }
}