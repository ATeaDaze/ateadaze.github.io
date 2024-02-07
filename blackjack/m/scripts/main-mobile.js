// TODO: clean up winner checks (if-else hell), clean up with jQuery, implement landscape/portrait mode swapping
// 52 card deck = 4 suits (Spade, Heart, Club, Diamond) and 13 ranks (2:10, Jack, Queen, King, Ace)
const cardSuitsRanks = [ ['♠','♥','♣','♦'],
                         ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] ];
const defaultGreeting = "BLACKJACK 3:2 🍀 DEALER S17";
const btnDisableCSS = "background-color: #222222;";
const btnEnableCSS = "background-color: #111111;";
const statusBarWinCSS = "color: chartreuse; animation: 1.5s anim-flipX ease 1;";
const statusBarLoseCSS = "color: #ff6161";
// All 6 decks are written to an array
let deck = [6];
// Decks are combined into 1 array
let fullDeck = [];
let decksLeft = 6;
// 52 cards * 6 decks = 312 total
let deckSize = 312;
// Tracks used cards to prevent duplicates
let usedCards = [];
let playerScore = 0;
let dealerScore = 0;
let playerMoney = 2000;
let dealerMoney = 10000;
let playerMoneyDisplayTxt;
let dealerMoneyDisplayTxt;
let betAmount = 100;
// Add 50% bonus for Blackjack (3:2 odds)
let betAmountWithOdds = betAmount * 0.5;
// Track double bets to reset bet to 100%
let bDoubleDownLastRound = false;
let nDealerCards = 0;
let nPlayerCards = 0;
let nTotalCards = 0;
let nCardsInPlay = 0;
let runningCount = 0;
let trueCount = 0;
let currentPlayer = "Player";
// Track number of aces to modify values
let nAcesPlayer = 0;
let nAcesDealer = 0;
let bFullAcePlayer = false;
let bFullAceDealer = false;
let bAceSwappedPlayer = false;
let bAceSwappedDealer = false;
let bGameOver = true;
let bPlayerWon = false;
let bPushRound = false;
let bEnableSound = true;
let bShowHelp = false;
let bDuplicateFound;
// Display strings for cards
let cardFaceSuit;
let cardFaceRank;
const audioCard = new Audio("../audio/card_flip.mp3");
const audioShuffle = new Audio("../audio/card_shuffle.mp3");
const audioWin = new Audio("../audio/casino_chip.mp3");
const audioLose = new Audio("../audio/tick.mp3");
const audioDraw = new Audio("../audio/draw.mp3");
const audioJackpot = new Audio("../audio/jackpot.mp3");

// Generate a base deck of 52 cards
deck[0] = generateBaseDeck();
// Generate 5 more decks and combine them
fullDeck = generateFullDeck(deck);
shuffleDeck(fullDeck);
audioShuffle.play();

function mainGameLoop() {
  statusBarTxt.innerHTML = defaultGreeting;
  disableBets();
  btnDealNewHand.disabled = true;
  btnDealNewHand.style = btnDisableCSS;
  // Deal 2 cards to player on 1st hand
  drawPlayerCard();
  drawPlayerCard();
  // Deal 1 card to dealer at start
  drawDealerCard();
  checkForWins();
  // If the entire deck has been used then shuffle it
  if(nTotalCards > nCardOffset) {
    nTotalCards = 0;
    decksLeft = 6;
    runningCount = 0;
    trueCount = 0;
    shuffleDeck(fullDeck);
    displayShuffleToast();
  }
}

function restartGame() {
  if(bEnableSound) audioShuffle.play();
  resetGameValues();
  enableBets();
  updateBetButtons();
  enableGameButtons();
  updateScore();
  clearScoreboard();
  mainGameLoop();
}

// Print welcome message and decorative cards
function displayIntro() {
  statusBarTxt.innerHTML = "PLACE A BET 🍀 DEAL NEW HAND";
  updateCards(gameBoardPlayer, "♠10");
  updateCards(gameBoardPlayer, "♥J");
  updateCards(gameBoardPlayer, "♣Q");
  updateCards(gameBoardPlayer, "♦K");
  updateCards(gameBoardPlayer, "♠A");
  updateCards(gameBoardDealer, "♦10");
  updateCards(gameBoardDealer, "♣J");
  updateCards(gameBoardDealer, "♥Q");
  updateCards(gameBoardDealer, "♠K");
  updateCards(gameBoardDealer, "♦A");
  disableGameButtons();
}

function drawPlayerCard() {
  currentPlayer = "Player";
  findUniqueCard();
  cleanCardString();
  playerScore = getCardValue(playerScore);
  nPlayerCards++;
  if((nPlayerCards > 2)&&(bEnableSound)) audioCard.play();
  updateCards(gameBoardPlayer, newCard);
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
  updateCards(gameBoardDealer, newCard);
  updateScore();
  checkForWins();
}

// Generate 52 card deck
function generateBaseDeck() {
  let count = 0;
  let baseDeck = [];
  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
      baseDeck[count] = cardSuitsRanks[0][suit] + cardSuitsRanks[1][rank];
      count++;
    }
  }
  return(baseDeck);
}

// Copy 1st deck into 5 more decks
function generateFullDeck(newDeck) {
  for(let i = 1; i < 6; i++) {
    let j = i - 1;
    newDeck[i] = newDeck[j];
  }
  newFullDeck = [ ...newDeck[0], ...newDeck[1], ...newDeck[2],
                  ...newDeck[3], ...newDeck[4], ...newDeck[5] ];
  return(newFullDeck);
}

function shuffleDeck(newRandDeck) {
  usedCards = [];
  newRandDeck = newRandDeck.sort((a, b) => 0.5 - Math.random());
  return(newRandDeck);
}

// Only draw unused cards
function findUniqueCard() {
  bDuplicateFound = true;
  // Look for a new card and skip duplicates
  while(bDuplicateFound) {
    // Random card index (range = 0:311)
    randCardIndex = Math.floor(Math.random() * deckSize);
    // Select card if it's not in-use
    if(fullDeck[randCardIndex] != usedCards[randCardIndex]) {
      newCard = fullDeck[randCardIndex];
      // Add drawn card to the list of used cards
      usedCards[randCardIndex] = newCard;
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
  // Calculate running and true totals (2:6 = +1, 7:9 = 0, 10:A = -1)
  if((newCardValue > 1)&&(newCardValue < 7)) runningCount = runningCount + 1;
  if((isNaN(newCardTxt)) || (newCardValue > 9)) runningCount = runningCount - 1;
  decksLeft = (deckSize - nTotalCards) / 52;
  decksLeft = Math.floor(decksLeft);
  if(decksLeft < 1) decksLeft = 1;
  trueCount = runningCount / decksLeft;
  // Round true count down to nearest integer
  trueCount = Math.floor(trueCount);
  updateTrueCount();
  // Use base card value if it's 2:10
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

function updateScore() {
  playerScoreTxt.innerHTML = "Player: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
  if(playerMoney > -1) {
    displayPositiveMoney(playerMoneyDisplayTxt, playerMoney, playerScoreTotalTxt);
  } else {
    displayNegativeMoney(playerMoneyDisplayTxt, playerMoney, playerScoreTotalTxt);
  }
  if(dealerMoney > -1) {
    displayPositiveMoney(dealerMoneyDisplayTxt, dealerMoney, dealerScoreTotalTxt);
  } else {
    displayNegativeMoney(dealerMoneyDisplayTxt, dealerMoney, dealerScoreTotalTxt);
  }
  if(nPlayerCards > 2) {
    btnDoubleDown.disabled = true;
    btnDoubleDown.style = btnDisableCSS;
  }
  playerBetTxt.innerHTML = "$" + betAmount;
}

// Format score display string with commas
function displayPositiveMoney(strCash, intCash, txtCash) {
  strCash = intCash.toLocaleString("en-US");
  txtCash.style = "color: #ffffff";
  txtCash.innerHTML = "$" + strCash;
}

// Convert score to number, make it negative, and display string
function displayNegativeMoney(strCash, intCash, txtCash) {
  strCash = Number(strCash);
  strCash = intCash * -1;
  strCash = strCash.toLocaleString("en-US");
  txtCash.style = statusBarLoseCSS
  txtCash.innerHTML = "-$" + strCash;
}

function updateCards(gb, nc) {
  nCardsInPlay = nPlayerCards + nDealerCards;
  // Offset = full deck minus cards on the table (-4 prevents range error)
  nCardOffset = (deckSize - nCardsInPlay) - 4;
  // Separate newCard's suit and rank
  cardFaceSuit = nc.slice(0,1);
  cardFaceRank = nc.slice(1,3);
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
  // Show new element with flip animation
  $(newTD).appendTo(gb).show();
  $(newTD).animate({ transformValue: +360 }, {
    step: function(now, fx) {
      $(this).css('transform','rotatey('+now+'deg)');  
    },
    duration: 250
  }, 'linear');
}

function updateTrueCount() {
  cardCounterTxt.innerHTML = trueCount;
}

function clearScoreboard() {
  dealerScoreTxt.style = "color:#ffffff";
  playerScoreTxt.style = "color:#ffffff";
  statusBarTxt.style = "color: #ffffff";
  statusBarTxt.innerHTML = defaultGreeting;
  gameBoardPlayer.innerHTML = "";
  gameBoardDealer.innerHTML = "";
}

function doubleDown() {
  betAmount = betAmount * 2;
  bDoubleDownLastRound = true;
  drawPlayerCard();
  stand();
}

function stand() {
  // Dealer draws to 17 and stands
  while(dealerScore < 17) {
    drawDealerCard();
  }
  updateScore();
  checkForWins();
  checkFinalScore();
  enableBets();
  updateBetButtons();
  if(bDoubleDownLastRound) {
    betAmount = betAmount / 2;
    bDoubleDownLastRound = false;
  }
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
    if((playerScore == 21)&&(nPlayerCards == 2)&&(dealerScore != 21)) {
      statusBarTxt.innerHTML = "Blackjack! 🃏 $" + betAmount * 1.5;
      statusBarTxt.style = "color: #CF9FFF; animation: 3s anim-flipX ease 3;";
      bPlayerWon = true;
      if(bEnableSound) audioJackpot.play();
      // 150% payout for blackjack (100% base bet + 50% bonus)
      playerMoney = playerMoney + betAmountWithOdds;
      dealerMoney = dealerMoney - betAmountWithOdds;
      endCurrentRound();
    } else if((dealerScore == 21)&&(nDealerCards == 2)&&(playerScore != 21)) {
      playerMoney = playerMoney - betAmountWithOdds;
      dealerMoney = dealerMoney + betAmountWithOdds;
      statusBarTxt.innerHTML = "Dealer Blackjack ❌ -$" + betAmount * 1.5;
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
    } else if(playerScore > 21) {
      statusBarTxt.style = statusBarLoseCSS
      playerScoreTxt.style = statusBarLoseCSS
      statusBarTxt.innerHTML = "Bust ❌ -$" + betAmount;
      bPlayerWon = false;
      endCurrentRound();
     } else if(dealerScore > 21) {
      statusBarTxt.style = statusBarWinCSS
      dealerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "Dealer Bust ✔️ $" + betAmount;
      bPlayerWon = true;
      endCurrentRound();
    } else if((playerScore == 21)&&(dealerScore == 21)) {
      if((nPlayerCards < nDealerCards)&&(nPlayerCards == 2)) {
        statusBarTxt.innerHTML = "Blackjack! 🃏 $" + betAmount * 1.5;
        statusBarTxt.style = "color: #CF9FFF; animation: 3s anim-flipX ease 3;";
        bPlayerWon = true;
        if(bEnableSound) audioJackpot.play();
        playerMoney = playerMoney + betAmountWithOdds;
        dealerMoney = dealerMoney - betAmountWithOdds;
        endCurrentRound();
      } else if((nPlayerCards > nDealerCards)&&(nDealerCards == 2)) {
        playerMoney = playerMoney - betAmountWithOdds;
        dealerMoney = dealerMoney + betAmountWithOdds;
        statusBarTxt.innerHTML = "Dealer Blackjack ❌ -$" + betAmount * 1.5;
        statusBarTxt.style = statusBarLoseCSS
        bPlayerWon = false;
        endCurrentRound();
      } else if(playerScore == dealerScore) {
        // Subtract $50 from dealer (otherwise a draw awards dealer $50 due to boolean winner flag)
        dealerMoney = dealerMoney - betAmount;
        playerMoney = playerMoney + betAmount;
        statusBarTxt.style = "color: #dddddd";
        statusBarTxt.innerHTML = "Push 🔷 $0";
        bPlayerWon = false;
        bPushRound = true;
        endCurrentRound();
      }
    }
  }
}

function checkFinalScore() {
  if(!bGameOver) {
    // Check which player is closer to 21
    checkScoreDifference()
    // Check for flat wins
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
      // Subtract $50 from dealer (otherwise a draw awards dealer $50 due to boolean winner flag)
      dealerMoney = dealerMoney - betAmount;
      playerMoney = playerMoney + betAmount;
      statusBarTxt.style = "color: #dddddd";
      statusBarTxt.innerHTML = "Push 🔷 $0";
      bPlayerWon = false;
      bPushRound = true;
      endCurrentRound();
    } 
  }
}

function endCurrentRound() {
  // If player wins then add money and play SFX
  if(bPlayerWon) {
    playerMoney = playerMoney + betAmount;
    dealerMoney = dealerMoney - betAmount;
    if(bEnableSound) audioWin.play();
  } else if(bPushRound) {
    // Play neutral SFX for push
    if(bEnableSound) audioDraw.play();
  } else {
    // Play "thud" sound and subtract money if player lost
    dealerMoney = dealerMoney + betAmount;
    playerMoney = playerMoney - betAmount;
    if(bEnableSound) audioLose.play();
  }

  // Draw dealer card if only 1 is showing
  if(nDealerCards == 1) {
    drawDealerCard();
    checkFinalScore();
  }
  enableBets();
  updateBetButtons();
  updateScore();
  bGameOver = true;
  bPlayerWon = false;
  bPushRound = false;
  currentPlayerHand = [];

  // Special message if player breaks the house
  if(dealerMoney < 0) {
    statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
    statusBarTxt.innerHTML = "💵 YOU BROKE THE BANK 💵";
  }
  disableGameButtons();
}

function resetGameValues() {
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
}  

function disableGameButtons() {
  btnDoubleDown.disabled = bGameOver;
  btnDoubleDown.style = btnDisableCSS;
  btnHit.disabled = bGameOver;
  btnHit.style = btnDisableCSS;
  btnStand.disabled = bGameOver;
  btnStand.style = btnDisableCSS;
  btnDealNewHand.disabled = false;
  btnDealNewHand.style = btnEnableCSS;
}

function enableGameButtons() {
  btnHit.disabled = bGameOver;
  btnHit.style = btnEnableCSS;
  btnDoubleDown.disabled = bGameOver;
  btnDoubleDown.style = btnEnableCSS;
  btnStand.disabled = bGameOver;
  btnStand.style = btnEnableCSS;
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
    default:
      playerBetTxt.style = "color: #9a9a9a";
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

function hideTrueCount() {
let x = document.getElementById("cardCounterTxt");
  x.className = "hide";
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
