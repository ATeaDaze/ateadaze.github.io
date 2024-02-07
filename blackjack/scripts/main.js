const cardSuitsRanks = [ ['♠','♥','♣','♦'],
                         ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] ];
const defaultGreeting = "BLACKJACK PAYS 3:2 🍀 DEALER STANDS ON 17";
const btnDisableCSS = "background-color: #222222; cursor: not-allowed";
const btnEnableCSS = "background-color: #111111; cursor: pointer";
const statusBarWinCSS = "color: chartreuse; animation: 1.5s anim-flipX ease 1;";
const statusBarLoseCSS = "color: #ff6161";
let deck = [6];
let fullDeck = [];
let decksLeft = 6;
let deckSize = 52 * decksLeft;
let usedCards = [];
let playerScore = 0;
let dealerScore = 0;
let playerMoney = 2000;
let dealerMoney = 10000;
let playerMoneyDisplayTxt;
let dealerMoneyDisplayTxt;
let betAmount = 100;
let betAmountWithOdds = betAmount * 0.5;
let bDoubleDownLastRound = false;
let nDealerCards = 0;
let nPlayerCards = 0;
let nTotalCards = 0;
let nCardsInPlay = 0;
let runningCount = 0;
let trueCount = 0;
let currentPlayer = "Player";
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
let cardFaceSuit;
let cardFaceRank;
const audioCard = new Audio("audio/card_flip.mp3");
const audioShuffle = new Audio("audio/card_shuffle.mp3");
const audioWin = new Audio("audio/casino_chip.mp3");
const audioLose = new Audio("audio/tick.mp3");
const audioDraw = new Audio("audio/draw.mp3");
const audioJackpot = new Audio("audio/jackpot.mp3");

deck[0] = generateBaseDeck();

fullDeck = generateFullDeck(deck);
shuffleDeck(fullDeck);
audioShuffle.play();
getKeyboardInput();

function mainGameLoop() {
  statusBarTxt.innerHTML = defaultGreeting;
  disableBets();
  btnDealNewHand.disabled = true;
  btnDealNewHand.style = btnDisableCSS;
  drawPlayerCard();
  drawPlayerCard();
  drawDealerCard();
  checkForWins();

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

function generateBaseDeck() {
  let cardsGenerated = 0;
  let baseDeck = [];
  for(suit = 0; suit < 4; suit++) {
    for(rank = 0; rank < 13; rank++) {
      baseDeck[cardsGenerated] = cardSuitsRanks[0][suit] + cardSuitsRanks[1][rank];
      cardsGenerated++;
    }
  }
  return(baseDeck);
}

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

function findUniqueCard() {
  bDuplicateFound = true;

  while(bDuplicateFound) {
    randomCardIndex = Math.floor(Math.random() * deckSize);

    if(fullDeck[randomCardIndex] != usedCards[randomCardIndex]) {
      newCard = fullDeck[randomCardIndex];

      usedCards[randomCardIndex] = newCard;
      bDuplicateFound = false;
      nTotalCards++;
    }
  }
}

function getCardValue(score, bAceDrawn) {
  if((newCardValue > 1)&&(newCardValue < 7)) {
    runningCount = runningCount + 1;
  }
  if((isNaN(newCardTxt)) || (newCardValue > 9)) runningCount = runningCount - 1;
  decksLeft = (deckSize - nTotalCards) / 52;

  decksLeft = Math.floor(decksLeft);
  if(decksLeft < 1) decksLeft = 1;
  trueCount = runningCount / decksLeft;

  trueCount = Math.floor(trueCount);
  updateTrueCount();

  if( (newCardValue > 1)&&(newCardValue < 11) ) {
    score = score + newCardValue;

  } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      score = score + 10;

  } else if((newCardTxt == 'A')&&(!bFullAcePlayer)&&(currentPlayer == "Player")) {
    if((score + 11) < 22) {
      score = score + 11;

      bFullAcePlayer = true;
    } else {
      score = score + 1;
    }


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

  if((currentPlayer == "Player")&&(bFullAcePlayer)&&(!bAceSwappedPlayer)&&(score > 21)) {
    score = score - 10;

    bAceSwappedPlayer = true;
  }
  if((currentPlayer == "Dealer")&&(bFullAceDealer)&&(!bAceSwappedDealer)&&(score > 21)) {
    score = score - 10;
    bAceSwappedDealer = true;
  }
  return(score);
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

function cleanCardString() {
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  newCardTxt = newCard.slice(1);
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

function displayPositiveMoney(strCash, intCash, txtCash) {
  strCash = intCash.toLocaleString("en-US");
  txtCash.style = "color: #ffffff";
  txtCash.innerHTML = "$" + strCash;
}

function displayNegativeMoney(strCash, intCash, txtCash) {
  strCash = Number(strCash);
  strCash = intCash * -1;
  strCash = strCash.toLocaleString("en-US");
  txtCash.style = statusBarLoseCSS
  txtCash.innerHTML = "-$" + strCash;
}

function updateCards(gb, nc) {
  nCardsInPlay = nPlayerCards + nDealerCards;
  nCardOffset = (deckSize - nCardsInPlay) - 4;

  cardFaceSuit = nc.slice(0,1);
  cardFaceRank = nc.slice(1,3);

  let newTD = document.createElement('td');
  let cardLineBreak = document.createElement('br');

  newTD.append(cardFaceRank);
  newTD.append(cardLineBreak);
  newTD.append(cardFaceSuit);
  $(newTD).addClass("gbSingleCard");

  if((cardFaceSuit == '♦')||(cardFaceSuit == '♥')) {
    newTD.style = "color: #FF5555";

  } else {
    newTD.style = "color: #444444";
  }

  $(newTD).appendTo(gb).show();
  $(newTD).animate({ transformValue: +360 }, {
    step: function(now, fx) {
      $(this).css('transform','rotatey('+now+'deg)');  
    }, duration: 250
  }, 'linear');
}

function updateTrueCount() {
  cardCounterTxt.innerHTML = trueCount;
  cardCounterTxt.title = "True count: " + runningCount + " / " + decksLeft + " = " + trueCount;
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

function checkForWins() {

  if((nDealerCards == 1)&&(playerScore == 21)&&(dealerScore < 17)) {
    drawDealerCard();
  }

  if(!bGameOver) {

    checkScoreDifference()
    if((playerScore == 21)&&(nPlayerCards == 2)&&(dealerScore != 21)) {
      statusBarTxt.innerHTML = "Blackjack! 🃏 $" + betAmount * 1.5;
      statusBarTxt.style = "color: #CF9FFF; animation: 3s anim-flipX ease 3;";
      bPlayerWon = true;
      if(bEnableSound) audioJackpot.play();

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

        dealerMoney = dealerMoney - betAmount;
        playerMoney = playerMoney + betAmount;
        statusBarTxt.style = "color: #dddddd";
        statusBarTxt.innerHTML = "Push 🔷 $0";
        bPlayerWon = false;
        endCurrentRound();
      }
    }
  }
}

function checkFinalScore() {
  if(!bGameOver) {

    checkScoreDifference()

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

    } else if(playerScore == dealerScore) {

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

  if(bPlayerWon) {
    playerMoney = playerMoney + betAmount;
    dealerMoney = dealerMoney - betAmount;
    if(bEnableSound) audioWin.play();
  } else if(bPushRound) {

    if(bEnableSound) audioDraw.play();
  } else {

    dealerMoney = dealerMoney + betAmount;
    playerMoney = playerMoney - betAmount;
    if(bEnableSound) audioLose.play();
  }

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
  btnBet25.src = "images/25.png";
   btnBet50.src = "images/50.png";
   btnBet100.src = "images/100.png";
  btnBet200.src = "images/200.png";
  switch(betAmount) {
    case 25:
      btnBet25.src = "images/25outline.png";
      playerBetTxt.style = "color: #c0c0c0";
      break;
    case 50:
      btnBet50.src = "images/50outline.png";
      playerBetTxt.style = "color: #f25c5c";
      break;
    case 100:
      btnBet100.src = "images/100outline.png";
      playerBetTxt.style = "color: #7eabcc";
      break;
    case 200:
      btnBet200.src = "images/200outline.png";
      playerBetTxt.style = "color: #86e8a2";
      break;
    default:
      playerBetTxt.style = "color: #9a9a9a";
  }
  updateScore();
}

function disableBets() {
  btnBet25.src = "images/25dark.png";
  btnBet50.src = "images/50dark.png";
  btnBet100.src = "images/100dark.png";
  btnBet200.src = "images/200dark.png";
  $( "#btnBet25" ).prop( "disabled", true );
  $( "#btnBet50" ).prop( "disabled", true );
  $( "#btnBet100" ).prop( "disabled", true );
  $( "#btnBet200" ).prop( "disabled", true );
  btnBet25.style = "cursor:not-allowed";
  btnBet50.style = "cursor:not-allowed";
  btnBet100.style = "cursor:not-allowed";
  btnBet200.style = "cursor:not-allowed";
}

function enableBets() {
  $( "#btnBet25" ).prop( "disabled", false );
  $( "#btnBet50" ).prop( "disabled", false );
  $( "#btnBet100" ).prop( "disabled", false );
  $( "#btnBet200" ).prop( "disabled", false );
  btnBet25.style = "cursor:pointer";
  btnBet50.style = "cursor:pointer";
  btnBet100.style = "cursor:pointer";
  btnBet200.style = "cursor:pointer";
}

function getKeyboardInput() {
  document.addEventListener('keypress', e => {
    if(!bGameOver) {
      switch(e.key) {
        case 'h':
          drawPlayerCard();
          break;
        case 's':
          stand();
          break;
        case 'd':
          if(nPlayerCards < 3) doubleDown();
          break;
      }
    } else {
      switch(e.key) {
      case 'n':
        restartGame();
        break;
      case '1':
        updateBetAmount(25);
        break;
      case '2':
        updateBetAmount(50);
        break;
      case '3':
        updateBetAmount(100);
        break;
      case '4':
        updateBetAmount(200);
        break;
      }
    }
  })
}

function displayIntro() {
  statusBarTxt.innerHTML = "PLACE A BET 🍀 CLICK DEAL NEW HAND";
  updateCards(gameBoardPlayer, "♠2");
  updateCards(gameBoardPlayer, "♥4");
  updateCards(gameBoardPlayer, "♣6");
  updateCards(gameBoardPlayer, "♦8");
  updateCards(gameBoardPlayer, "♠10");
  updateCards(gameBoardPlayer, "♥Q");
  updateCards(gameBoardDealer, "♦3");
  updateCards(gameBoardDealer, "♣5");
  updateCards(gameBoardDealer, "♥7");
  updateCards(gameBoardDealer, "♠9");
  updateCards(gameBoardDealer, "♦J");
  updateCards(gameBoardDealer, "♣K");
  disableGameButtons();
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
let r = confirm("Hide true count? (refresh page to toggle it back on)");
if (r == true) {
    let x = document.getElementById("cardCounterTxt");
    x.className = "hide";
  }
}

function toggleAudio() {
  if(bEnableSound == true) {
    btnAudioStatusValue.style = "color: #f26d6d";
    btnAudioStatusValue.innerHTML = "OFF";
    btnAudioStatusValue.title = "🔊 Enable sound";
    btnAudioStatusLead.title = "🔊 Enable sound";
    bEnableSound = false;
  } else {
    btnAudioStatusValue.style = "color: #afff60";
    btnAudioStatusValue.innerHTML = "ON";
    btnAudioStatusValue.title = "🔈 Disable sound";
    btnAudioStatusLead.title = "🔈 Disable sound";
    bEnableSound = true;
  }
}

function displayShuffleToast() {

  let x = document.getElementById("toastMessage");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}
