// TODO: refactor, draw cards as canvas elements, remove used cards from deck pool // Alternate spacers = ▌ ∫ ⌠ ┃
// 52 card deck = 4 suits (Spade, Heart, Club, Diamond) and 13 ranks (2:10, Jack, Queen, King, Ace)
const fullDeck = [
// Emoji
//  ['♠️','♥️','♣️','♦️'],
// ASCII
  ['♠','♥','♣','♦'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];
// Symbol to separate cards
const cardSeparator = "<font color='#777777'>∫</font>";
let count = 0;
let card = [];
// Tracks used cards to prevent duplicates
let usedCard = [];
let bDuplicateFound;
// Score for each hand
let playerScore = 0;
let dealerScore = 0;
// Total money available
let playerMoney = 250;
let dealerMoney = 1000;
let betAmount = 50;
// Number of cards in-play
let nDealerCards = 0;
let nPlayerCards = 0;
let nTotalCards = 0;
let bGameOver = false;
let bPlayerWon = false;
// Display string for cards
let cardFaceTxt;
let cardFaceSuit;
let cardFaceRank;

// Generate 52 card deck
generateCardDeck();
// Watch for keyboard input (N, S, H)
getKeyboardInput();

function mainGameLoop() {
/*  txtBetValue.value = betAmount;
  txtBetValue.disabled = true; */
  btnNewGame.disabled = true;
  btnNewGame.style = "background-color: #222222; cursor: not-allowed";
  // Deal 2 cards to player on 1st hand
  drawPlayerCard();
  drawPlayerCard();
  // Deal 1 card to dealer at start
  drawDealerCard();
  checkForWins();
  // If the entire deck has been used (52 max / less than 50 gives headroom)
  if(nTotalCards > 46) {
    // Clear the list of used cards (prevents memory leak)
    usedCard = [];
    nTotalCards = 0;
    // Shuffle the deck
    card = card.sort((a, b) => 0.5 - Math.random());
    displayShuffleToast();
  }
}

// Reset values and start a new hand
function restartGame() {
  playerScore = 0;
  dealerScore = 0;
  nDealerCards = 0;
  nPlayerCards = 0;
  bGameOver = false;
  updateScore();
  clearScoreboard();
  dealerScoreTxt.style = "color:#ffffff";
  playerScoreTxt.style = "color:#ffffff";
  statusBarTxt.style = "color: #ffffff";
  statusBarTxt.innerHTML = "Good Luck 🍀 ($50 / hand)";
  btnHit.disabled = false;
  btnHit.style = "background-color: #111111; cursor: pointer";
  btnStand.disabled = false;
  btnStand.style = "background-color: #111111; cursor: pointer";
  mainGameLoop();
}

// Draw 1 card for player
function drawPlayerCard() {
/*  btnBetUp.disabled = true;
  btnBetDown.disabled = true;
  btnBetUp.style = "background-color: #222222; cursor: not-allowed";
  btnBetDown.style = "background-color: #222222; cursor: not-allowed"; */
  findUniqueCard();
  cleanCardString();
  playerScore = getCardValue(playerScore);
  nPlayerCards++;
  cardFaceTxt = cardSeparator + newCard + "\xa0\xa0\xa0";
  updateCards(gameBoardPlayer);
  // Show dealer's new card (unless it's the 1st turn and dealer score is > 17)
  //if((nPlayerCards-nDealerCards == 2)&&(dealerScore < 17)&&(nPlayerCards > 2)) drawDealerCard();
  updateScore();
  checkForWins();
}

// Draw 1 card for dealer
function drawDealerCard() {
  findUniqueCard();
  cleanCardString();
  dealerScore = getCardValue(dealerScore);
  nDealerCards++;
  cardFaceTxt = cardSeparator + newCard + "\xa0\xa0\xa0";
  updateCards(gameBoardDealer);
  updateScore();
  checkForWins();
}

// Stop dealing cards to player
function stand() {
  // Dealer draws 1 card if they only have 1 showing
  //if(nDealerCards == 1) drawDealerCard();
  // Draw cards until dealer score is lower than player's and less than 17
//  while( (dealerScore < 17) && (playerScore > dealerScore)) {
  while(dealerScore < 17) {
    drawDealerCard();
  }
  updateScore();
  checkForWins();
  checkFinalScore();
}

// Check for win conditions // TODO: properly handle double-blackjacks, optimize
function checkForWins() {
  // Dealer draws 1 card if they only have 1 showing and player hits blackjack
  if((nDealerCards == 1)&&(playerScore == 21)&&(dealerScore < 17)) {
    drawDealerCard();
  }
  // Check for win conditions if game over flag is not set
  if(!bGameOver) {
    // Check which player is closer to 21
    playerDiff = 21 - playerScore;
    dealerDiff = 21 - dealerScore;
    // Check for more win conditions
    if((playerScore == 21)&&(nPlayerCards == 2)&&(dealerScore != 21)) {
      // Player has 21 and only 2 cards
      statusBarTxt.innerHTML = "🃏 Blackjack! ($150)";
      statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
      bPlayerWon = true;
      // Double payout for blackjack (1.5x bonus + 1x final payout)
      playerMoney = playerMoney + (betAmount*1.5);
      dealerMoney = dealerMoney - (betAmount*1.5);
      endCurrentRound();
      // Dealer has 21 and only 2 cards
    } else if((dealerScore == 21)&&(nDealerCards == 2)&&(playerScore != 21)) {
      dealerMoney = dealerMoney + 100;
      playerMoney = playerMoney - 100;
      statusBarTxt.innerHTML = "❌ Dealer Blackjack (-$50)";
      statusBarTxt.style = "color: indianred";
      bPlayerWon = false;
      endCurrentRound();
    } else if ((playerScore == 21)&&(nPlayerCards > 2)&&(dealerScore != 21)) {
      statusBarTxt.style = "color: chartreuse; animation: 2s anim-flipX ease 1;";
      statusBarTxt.innerHTML = "✔️ Winner ($50)";
      bPlayerWon = true;
      endCurrentRound();
    } else if ((dealerScore == 21)&&(nDealerCards > 2)) {
      statusBarTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "❌ Dealer Wins (-$50)";
      bPlayerWon = false;
      endCurrentRound();
      // Player score is over 21
    } else if(playerScore > 21) {
      statusBarTxt.style = "color: indianred";
      playerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "❌ Bust (-$50)";
      bPlayerWon = false;
      endCurrentRound();
      // Dealer score is over 21
     } else if(dealerScore > 21) {
      statusBarTxt.style = "color: chartreuse; animation: 2s anim-flipX ease 1;";
      dealerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "✔️ Dealer Bust ($50)";
      bPlayerWon = true;
      endCurrentRound();
    }
  }
}

// Check for win conditions if game over flag is not set // TODO: combine with previous function
function checkFinalScore() {
  if(!bGameOver) {
    // Dealer draws 1 more card while score < 17 and < player score
    //while(((dealerScore < 17)&&(dealerScore < playerScore))||(dealerScore < 17)) {
    //  drawDealerCard();
    //}
    // Check which player is closer to 21
    playerDiff = 21 - playerScore;
    dealerDiff = 21 - dealerScore;  
    // Check for winners
    if((playerDiff < dealerDiff)&&(playerScore < 22)) {
      statusBarTxt.style = "color: chartreuse; animation: 2s anim-flipX ease 1;";
      statusBarTxt.innerHTML = "✔️ Winner ($50)";
      bPlayerWon = true;
      endCurrentRound();
    } else if((playerDiff > dealerDiff)&&(dealerScore < 22)) {
      statusBarTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "❌ Dealer Wins (-$50)";
      bPlayerWon = false;
      endCurrentRound();
      // Players are done drawing cards and scores are equal
    } else if(playerScore == dealerScore) {
      // Subtract $50 from dealer (otherwise a draw awards dealer $5 due to boolean winner flag)
      dealerMoney = dealerMoney - betAmount;
      playerMoney = playerMoney + betAmount;
      statusBarTxt.style = "color: #dddddd";
      statusBarTxt.innerHTML = "🔷 Draw ($0)";
      bPlayerWon = false;
      endCurrentRound();
    } 
  }
}

// Update the scoreboard and dollar amounts
function updateScore() {
  playerScoreTxt.innerHTML = "Player: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
  // Change text color to red if money is negative
  if(playerMoney < 0) {
    playerScoreTotalTxt.style = "color: indianred";
    // Format string with negative symbol leading dollar sign
    playerScoreTotalTxt.innerHTML = "-$" + -1*(playerMoney);
    // Otherwise set the text back to white
  } else {
    playerScoreTotalTxt.style = "color: white";
    playerScoreTotalTxt.innerHTML = "$" + playerMoney;
  }
  if(dealerMoney < 0) {
    dealerScoreTotalTxt.style = "color: indianred";
    dealerScoreTotalTxt.innerHTML = "-$" + -1*(dealerMoney);
  } else {
    dealerScoreTotalTxt.style = "color: white";
    dealerScoreTotalTxt.innerHTML = "$" + dealerMoney;
  }
//    console.log("nTotalCards = " + nTotalCards);
}

// Update player cards on screen
function updateCards(gb) {
  cardFaceSuit = newCard.slice(0,1);
  cardFaceRank = newCard.slice(1,3);

  gb.innerHTML += "<td>" + cardSeparator;
  if((cardFaceSuit == '♦')||(cardFaceSuit == '♥')) {
    gb.innerHTML += "<font color='red'>" + cardFaceSuit + "</font>";
    gb.innerHTML += cardFaceRank + " ";
    } else {
    gb.innerHTML += "<font color='#222222'>" + cardFaceSuit + "</font>";
    gb.innerHTML += cardFaceRank + " ";
  }
  gb.innerHTML += "&nbsp;</td>";

//  gb.innerHTML += "<td>" + cardFaceTxt + "</td>";
}

// Clear scores
function clearScoreboard() {
  gameBoardPlayer.innerHTML = "";
  gameBoardDealer.innerHTML = "";
}

// End the round
function endCurrentRound() {
  // Add and subtract $5 depending on winner
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
    statusBarTxt.innerHTML = "💵 YOU BROKE THE BANK! 💵";
  }
  // Disable [HIT] and [STAND] buttons
  btnHit.disabled = true;
  btnStand.disabled = true;
  btnHit.style = "background-color: #222222; cursor: not-allowed";
  btnStand.style = "background-color: #222222; cursor: not-allowed";
  // Enable [DEAL NEW HAND] button
  btnNewGame.disabled = false;
  btnNewGame.style = "background-color: #111111; cursor: pointer";
/*  btnBetUp.disabled = false;
  btnBetUp.style = "background-color: #111111; cursor: pointer";
  btnBetDown.disabled = false;
  btnBetDown.style = "background-color: #111111; cursor: pointer"; */
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
    case 'n':
      if(bGameOver) restartGame();
      break;
    default:
      break;
    }
  })
}

function cleanCardString() {
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  newCardTxt = newCard.slice(1);
}

function getCardValue(score) {
  // Use card value if it's 2:10
  if( (newCardValue > 1) && (newCardValue < 11) ) {
    score = score + newCardValue;
    // Use 10 if it's a face card (Joker, Queen, King)
  } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      score = score + 10;
  } else {
    // Ace: use 11, if that would exceed 21 then use 1 (simple compromise)
    if((score + 11) < 22) {
      score = score + 11;
    } else {
      score = score + 1;
    }
  }
  return(score);
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

// Generate 52 card deck from 2-dimensional array
function generateCardDeck() {
  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
      count++;
    }
  }
}

function displayShuffleToast() {
  let x = document.getElementById("toastMessage");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}

/*function increaseBet() {
  betAmount = betAmount + 50;
  if(betAmount > playerMoney) {
    betAmount = betAmount - 50;
  }
  txtBetValue.value = betAmount;
}

function decreaseBet() {
  betAmount = betAmount - 50;
  if(betAmount < 50) {
    betAmount = betAmount + 50;
  }
  txtBetValue.value = betAmount;
}*/