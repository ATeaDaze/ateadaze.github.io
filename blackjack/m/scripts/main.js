// TODO: refactor, spruce it up with jQuery, draw white background on cards
// Add double-down button (simple and addictive)
// 52 card deck = 4 suits (Spade, Heart, Club, Diamond) and 13 ranks (2:10, Jack, Queen, King, Ace)
const fullDeck = [
// ASCII characters (Emojis break score calculation for some reason)
  ['♠','♥','♣','♦'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];
const defaultGreeting = "BLACKJACK 3:2 🍀 DEALER S17";
const btnDisableCSS = "background-color: #222222;";
const btnEnableCSS = "background-color: #111111;";
const statusBarWinCSS = "color: chartreuse; animation: 1.5s anim-flipX ease 1;";
const statusBarLoseCSS = "color: #ff6161";
// Clear both card decks
let deck1 = [];
let deck2 = [];
let currentDeck;
let nDeck = 1;
// Tracks used cards to prevent duplicates
let usedCard = [];
let playerScore = 0;
let dealerScore = 0;
let playerMoney = 2000;
let dealerMoney = 10000;
let playerMoneyDisplayTxt;
let dealerMoneyDisplayTxt;
let betAmount = 100;
let betAmountWithOdds = betAmount * 0.5;
// Track double bets to reset bet to 1x
let bDoubleDownLastRound = false;
let nDealerCards = 0;
let nPlayerCards = 0;
let nTotalCards = 0;
let nCardsInPlay = 0;
// Track number of aces to modify values
let currentPlayer = "Player";
let nAcesPlayer = 0;
let nAcesDealer = 0;
let bFullAcePlayer = false;
let bFullAceDealer = false;
let bAceSwappedPlayer = false;
let bAceSwappedDealer = false;
let bGameOver = false;
let bPlayerWon = false;
let bEnableSound = true;
let bDuplicateFound;
// Display string for cards
let cardFaceSuit;
let cardFaceRank;
let bShowHelp = false;
const audioCard = new Audio("../audio/card_flip.mp3");
const audioShuffle = new Audio("../audio/card_shuffle.mp3");
const audioWin = new Audio("../audio/casino_chip.mp3");
const audioLose = new Audio("../audio/tick.mp3");
const audioJackpot = new Audio("../audio/jackpot.mp3");

// Generate 2 52-card decks (104)
deck1 = generateCardDeck();
deck2 = deck1;
currentDeck = deck1;
shuffleDeck(currentDeck);
audioShuffle.play();

function mainGameLoop() {
  statusBarTxt.innerHTML = defaultGreeting;
  if(nPlayerCards < 3) updateBetButtons();
  btnNewGame.disabled = true;
  btnNewGame.style = btnDisableCSS;
  // Deal 2 cards to player on 1st hand
  drawPlayerCard();
  drawPlayerCard();
  // Deal 1 card to dealer at start
  drawDealerCard();
  checkForWins();
  // If the entire deck has been used then swap them
  if(nTotalCards > nCardOffset) {
    swapDecks(currentDeck);
    shuffleDeck(currentDeck);
  }

}

function restartGame() {
  if(bDoubleDownLastRound) {
    betAmount = betAmount / 2;
    bDoubleDownLastRound = false;
  }
  if(bEnableSound) audioShuffle.play();
  playerScore = 0;
  dealerScore = 0;
  nDealerCards = 0;
  nPlayerCards = 0;
  nCardsInPlay = 0;
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
  enableBets();
  updateBetButtons();
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

function drawPlayerCard() {
  currentPlayer = "Player";
  findUniqueCard();
  cleanCardString();
  playerScore = getCardValue(playerScore);
  nPlayerCards++;
  if((nPlayerCards > 2)&&(bEnableSound)) audioCard.play();
  updateCards(gameBoardPlayer);
  updateScore();
  checkForWins();
}

function drawDealerCard() {
  currentPlayer = "Dealer";
  findUniqueCard();
  cleanCardString();
  dealerScore = getCardValue(dealerScore);
  nDealerCards++;
  if((nDealerCards > 1)&&(bEnableSound)) audioCard.play();
  updateCards(gameBoardDealer);
  updateScore();
  checkForWins();
}

// Generate 52 card deck
function generateCardDeck() {
let count = 0;
let baseDeck = [];
  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
      baseDeck[count] = fullDeck[0][suit] + fullDeck[1][rank];
      count++;
    }
  }
  return(baseDeck);
}

// Swap decks when 52 card are used
function swapDecks() {
  nTotalCards = 0;
  usedCard = [];
  if(currentDeck == deck1) {
    currentDeck = deck2;
  } else {
    currentDeck = deck1;
  }
  nDeck++;
  if(nDeck > 2) {
    nDeck = 1;
    displayShuffleToast();
  }
  return(currentDeck);
}  

// Randomize card deck array
function shuffleDeck(newDeck) {
  newDeck = newDeck.sort((a, b) => 0.5 - Math.random());
  return(newDeck);
}

// Verify drawn card is not in-use
function findUniqueCard() {
  bDuplicateFound = true;
  // Look for a new card and skip duplicates
  while(bDuplicateFound) {
    // Random card index (range = 0:51)
    randCardIndex = Math.floor(Math.random() * 52);
    // Select card if it's not in-use
    if(currentDeck[randCardIndex] != usedCard[randCardIndex]) {
      newCard = currentDeck[randCardIndex];
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
  // Disable bets once a card is drawn
  if(nPlayerCards > 2) {
    disableBets();
  }
  // Update scores as integers
  playerScoreTxt.innerHTML = "Player: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
  // Change text color to red if money is negative
  if(playerMoney < 0) {
    // Convert and format display text if it's negative
    playerMoneyDisplayTxt = displayNegativeMoney(playerMoneyDisplayTxt, playerMoney);
    playerScoreTotalTxt.style = statusBarLoseCSS
    // Format string with negative symbol leading dollar sign
    playerScoreTotalTxt.innerHTML = "-$" + playerMoneyDisplayTxt;
    // Otherwise set the text back to white
  } else {
    // Simply format display text as a string with commas
    playerMoneyDisplayTxt = playerMoney.toLocaleString("en-US");
    playerScoreTotalTxt.style = "color: #ffffff";
    playerScoreTotalTxt.innerHTML = "$" + playerMoneyDisplayTxt;
  }
  if(dealerMoney < 0) {
    dealerMoneyDisplayTxt = displayNegativeMoney(dealerMoneyDisplayTxt, dealerMoney);
    dealerScoreTotalTxt.style = statusBarLoseCSS
    dealerScoreTotalTxt.innerHTML = "-$" + dealerMoneyDisplayTxt;
  } else {
    dealerMoneyDisplayTxt = dealerMoney.toLocaleString("en-US");
    dealerScoreTotalTxt.style = "color: #ffffff";
    dealerScoreTotalTxt.innerHTML = "$" + dealerMoneyDisplayTxt;
  }
  // Disable [DOUBLE DOWN] button if player has more than 2 cards
  if(nPlayerCards > 2) {
    btnDoubleDown.disabled = true;
    btnDoubleDown.style = btnDisableCSS;
  }
  // Update bet amount
  playerBetTxt.innerHTML = "$" + betAmount;
}

// Convert display text to a number and make it negative
function displayNegativeMoney(strCash, intCash) {
  strCash = Number(strCash);
  strCash = intCash * -1;
  // Format with commas and return as a string
  strCash = strCash.toLocaleString("en-US");
  return(strCash);
}

function updateCards(gb) {
  nCardsInPlay = nPlayerCards + nDealerCards;
  // Offset number of cards minus 4 to prevent crashes on shuffle (out of range index)
  nCardOffset = (52 - nCardsInPlay) - 4;
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
    step: function(now, fx) {
      $(this).css('transform','rotatey('+now+'deg)');  
    },
    duration: 250
  }, 'linear');
}

function clearScoreboard() {
  gameBoardPlayer.innerHTML = "";
  gameBoardDealer.innerHTML = "";
}

// Draw 1 card, multiply bet by 2, and stand
function doubleDown() {
  betAmount = betAmount*2;
  bDoubleDownLastRound = true;
  drawPlayerCard();
  stand();
}

// Stop dealing cards to player
function stand() {
  // Dealer draws to 17 and stands
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
      statusBarTxt.innerHTML = "Blackjack! 🃏 $" + betAmount*1.5;
      statusBarTxt.style = "color: #CF9FFF; animation: 3s anim-flipX ease 3;";
      bPlayerWon = true;
      if(bEnableSound) audioJackpot.play();
      // Double payout for blackjack (base payout + 0.5x bonus = 1.5x payout)
      playerMoney = playerMoney + betAmountWithOdds;
      dealerMoney = dealerMoney - betAmountWithOdds;
      endCurrentRound();
      // Dealer has 21 and only 2 cards
    } else if((dealerScore == 21)&&(nDealerCards == 2)&&(playerScore != 21)) {
      dealerMoney = dealerMoney + betAmountWithOdds;
      playerMoney = playerMoney - betAmountWithOdds;
      statusBarTxt.innerHTML = "Dealer Blackjack ❌ -$" + betAmount*1.5;
      statusBarTxt.style = statusBarLoseCSS
      bPlayerWon = false;
      endCurrentRound();
    } else if ((playerScore == 21)&&(nPlayerCards > 2)&&(dealerScore != 21)) {
        if(dealerScore < 17) {
          drawDealerCard()
        } else {
          statusBarTxt.style = statusBarWinCSS
          statusBarTxt.innerHTML = "Winner ✔️ $"+ betAmount;
          bPlayerWon = true;
          endCurrentRound();
        }
    } else if ((dealerScore == 21)&&(playerScore != 21)&&(nDealerCards > 2)) {
      statusBarTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "Dealer Wins ❌ -$" + betAmount;
      bPlayerWon = false;
      endCurrentRound();
      // Player score is over 21
    } else if(playerScore > 21) {
      statusBarTxt.style = statusBarLoseCSS
      playerScoreTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "Bust ❌ -$" + betAmount;
      bPlayerWon = false;
      endCurrentRound();
      // Dealer score is over 21
     } else if(dealerScore > 21) {
      statusBarTxt.style = statusBarWinCSS
      dealerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "Dealer Bust ✔️ $" + betAmount;
      bPlayerWon = true;
      endCurrentRound();
      // Both players have 21
    } else if((playerScore == 21)&&(dealerScore == 21)) {
      if((nPlayerCards < nDealerCards)&&(nPlayerCards == 2)) {
      // Player Blackjack
        statusBarTxt.innerHTML = "Blackjack! 🃏 $" + betAmount*1.5;
        statusBarTxt.style = "color: #CF9FFF; animation: 3s anim-flipX ease 3;";
        bPlayerWon = true;
        if(bEnableSound) audioJackpot.play();
        // Double payout for blackjack (1.5x bonus + 1x final payout)
        playerMoney = playerMoney + betAmountWithOdds;
        dealerMoney = dealerMoney - betAmountWithOdds;
        endCurrentRound();
      } else if((nPlayerCards > nDealerCards)&&(nDealerCards == 2)) {
        // Dealer Blackjack (Loss = -50 -25 = -75
        dealerMoney = dealerMoney + betAmountWithOdds;
        playerMoney = playerMoney - betAmountWithOdds;
        statusBarTxt.innerHTML = "Dealer Blackjack ❌ -$" + betAmount*1.5;
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
      statusBarTxt.innerHTML = "Winner ✔️ $" + betAmount;
      bPlayerWon = true;
      endCurrentRound();
    } else if((playerDiff > dealerDiff)&&(dealerScore < 22)) {
      statusBarTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "Dealer Wins ❌ -$" + betAmount;
      bPlayerWon = false;
      endCurrentRound();
      // Players are done drawing cards and scores are equal
    } else if(playerScore == dealerScore) {
      // Subtract $50 from dealer (otherwise a draw awards dealer $5 due to boolean winner flag)
      dealerMoney = dealerMoney - betAmount;
      playerMoney = playerMoney + betAmount;
      statusBarTxt.style = "color: #dddddd";
      statusBarTxt.innerHTML = "Push 🔷 $0";
      bPlayerWon = false;
      endCurrentRound();
    } 
  }
}

function endCurrentRound() {
  // Add and subtract bets from totals
  if(bPlayerWon) {
    playerMoney = playerMoney + betAmount;
    dealerMoney = dealerMoney - betAmount;
    if(bEnableSound) audioWin.play();
  } else {
    dealerMoney = dealerMoney + betAmount;
    playerMoney = playerMoney - betAmount;
    if(bEnableSound) audioLose.play();
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

function updateBetAmount(newBet) {
  betAmount = newBet;
  updateBetButtons();
}

function updateBetButtons() {
  btnBet25.src = "../images/25.png";
   btnBet50.src = "../images/50.png";
   btnBet100.src = "../images/100.png";
  btnBet200.src = "../images/200.png";
  switch(betAmount) {
    case 25:
      btnBet25.src = "../images/25outline.png";
      playerBetTxt.style = "color: #c0c0c0";
      break;
    case 50:
      btnBet50.src = "../images/50outline.png";
      playerBetTxt.style = "color: #f25c5c";
      break;
    case 100:
      btnBet100.src = "../images/100outline.png";
      playerBetTxt.style = "color: #7eabcc";
      break;
    case 200:
      btnBet200.src = "../images/200outline.png";
      playerBetTxt.style = "color: #86e8a2";
      break;
  }
  updateScore();
}

function disableBets() {
  btnBet25.src = "../images/25dark.png";
  btnBet50.src = "../images/50dark.png";
  btnBet100.src = "../images/100dark.png";
  btnBet200.src = "../images/200dark.png";
  $( "#btnBet25" ).prop( "disabled", true );
  $( "#btnBet50" ).prop( "disabled", true );
  $( "#btnBet100" ).prop( "disabled", true );
  $( "#btnBet200" ).prop( "disabled", true );
}

function enableBets() {
  $( "#btnBet25" ).prop( "disabled", false );
  $( "#btnBet50" ).prop( "disabled", false );
  $( "#btnBet100" ).prop( "disabled", false );
  $( "#btnBet200" ).prop( "disabled", false );
}

// Toggle help window
function showHelpMenu() {
let x = document.getElementById("helpMenuTxt");
  if(!bShowHelp) {
    x.className = "show";
    bShowHelp = true;
  } else {
    x.className = "hide";
    bShowHelp = false;
  }
}

function toggleAudio() {
  if(bEnableSound == true) {
    btnAudioStatusValue.style = "color: #f26d6d";
    btnAudioStatusValue.innerHTML = "OFF";
    bEnableSound = false;
  } else {
    btnAudioStatusValue.style = "color: #afff60";
    btnAudioStatusValue.innerHTML = "ON";
    bEnableSound = true;
  }
}

function displayShuffleToast() {
  // Display notification
  let x = document.getElementById("toastMessage");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}
