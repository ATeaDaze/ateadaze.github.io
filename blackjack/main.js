// TODO: refactor, draw cards as canvas elements, remove used cards from deck pool // Alternate spacers = ▌ ∫ ⌠ ┃
// 52 card deck = 4 suits (Spade, Heart, Club, Diamond) and 13 ranks (2:10, Jack, Queen, King, Ace)
const fullDeck = [
  ['♠','♥','♣','♦'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];

let count = 0;
let card = [];
// Score for each hand
let playerScore = 0;
let dealerScore = 0;
// Total money available
let totalScorePlayer = 25;
let totalScoreDealer = 100;
let bPlayerWon = false;
// Number of cards in-play
let nDealerCards = 0;
let nPlayerCards = 0;
let bGameOver = false;
let cardFaceTxt;
let xGBp = 10, yGBp = 50;

// Generate 52 card deck
generateCardDeck();
// Watch for keyboard input (N, S, H)
getKeyboardInput();

// Deal 2 cards to player on 1st hand
function mainGameLoop() {
  if(nPlayerCards < 3) {
    drawPlayerCard();
    drawPlayerCard();
  }
  // Deal 1 card to dealer at start
  drawDealerCard();
  checkForWins();
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
  statusBarTxt.innerHTML = "Good Luck 🍀 ($5 / hand)";
  btnHit.disabled = false;
  btnHit.style = "background-color: #111111; cursor: pointer";
  btnStand.disabled = false;
  btnStand.style = "background-color: #111111; cursor: pointer";
  mainGameLoop();
}

// Draw 1 card for player
function drawPlayerCard() {
  randCardIndex = Math.floor(Math.random() * 52);
  newCard = card[randCardIndex]
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  playerScore = Number(playerScore);
  newCardTxt = newCard.slice(1);
  // Use card value if it's 2:10
  if( (newCardValue > 1) && (newCardValue < 11) ) {
    playerScore = playerScore + newCardValue;
    // Use 10 if card is Joker, Queen, or King
  } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      playerScore = playerScore + 10;
  } else {
    // Ace: use 11, if that would exceed 21 then use 1
    if((playerScore + 11) > 21) {
      playerScore = playerScore + 1;
    } else {
      playerScore = playerScore + 11;
    }
  }
  nPlayerCardsOld = nPlayerCards;
  nPlayerCards++;
  cardFaceTxt = "∫" + newCard + "\xa0\xa0\xa0";
  updatePlayerCards();
  updateScore();
  checkForWins();
}

// Draw 1 card for dealer (somewhat redundant for player function)
function drawDealerCard() {
  lastCard = newCard;
  randCardIndex = Math.floor(Math.random() * 52);
  newCard = card[randCardIndex]
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  dealerScore = Number(dealerScore);
  newCardTxt = newCard.slice(1);
  if( (newCardValue > 1) && (newCardValue < 11) ) {
    dealerScore = dealerScore + newCardValue;
  } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      dealerScore = dealerScore + 10;
  } else {
    // Face cards
    if((dealerScore + 11) > 21) {
      dealerScore = dealerScore + 1;
    } else {
      dealerScore = dealerScore + 11;
    }
  }
  nDealerCards++;
  cardFaceTxt = "∫" + newCard + "\xa0\xa0\xa0";
  updateDealerCards();
  updateScore();
  checkForWins();
}

// Stop dealing cards to player
function stand() {
  // Dealer draws 1 card if they only have 1 showing
  if(nDealerCards == 1) drawDealerCard();
  // Draw cards until dealer score is lower than player's and less than 17
  while( (dealerScore < 17) && (playerScore > dealerScore)) {
    drawDealerCard();
  }
  updateScore();
  checkForWins();
  checkFinalScore();
}

// Check for win conditions // TODO: hold dealer 2nd card value but hide (for double-blackjacks)
function checkForWins() {
  // Dealer draws 1 card if they only have 1 showing and player hits blackjack
  if((nDealerCards == 1)&&(playerScore == 21)) {
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
      statusBarTxt.innerHTML = "🃏 Blackjack! ($15)";
      statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
      bPlayerWon = true;
      // Double payout for blackjack (2.5x bonus = +$10)
      totalScorePlayer = totalScorePlayer + 10;
      totalScoreDealer = totalScoreDealer - 10;
      disableButtons();
      // Dealer has 21 and only 2 cards
    } else if((dealerScore == 21)&&(nDealerCards == 2)&&(playerScore != 21)) {
      totalScoreDealer = totalScoreDealer + 10;
      totalScorePlayer = totalScorePlayer - 10;
      statusBarTxt.innerHTML = "❌ Dealer Blackjack (-$5)";
      statusBarTxt.style = "color: indianred";
      bPlayerWon = false;
      disableButtons();
    } else if ((playerScore == 21)&&(nPlayerCards > 2)&&(dealerScore != 21)) {
      statusBarTxt.style = "color: chartreuse; animation: 2s anim-flipX ease 1;";
      statusBarTxt.innerHTML = "✔️ Winner ($5)";
      bPlayerWon = true;
      disableButtons();
    } else if ((dealerScore == 21)&&(nDealerCards > 2)) {
      statusBarTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "❌ Dealer Wins (-$5)";
      bPlayerWon = false;
      disableButtons();
      // Player score is over 21
    } else if(playerScore > 21) {
      statusBarTxt.style = "color: indianred";
      playerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "❌ Bust (-$5)";
      bPlayerWon = false;
      disableButtons();
      // Dealer score is over 21
     } else if(dealerScore > 21) {
      statusBarTxt.style = "color: chartreuse; animation: 2s anim-flipX ease 1;";
      dealerScoreTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "✔️ Dealer Bust ($5)";
      bPlayerWon = true;
      disableButtons();
    }
  }
}

// Check for win conditions if game over flag is not set // TODO: combine with previous function
function checkFinalScore() {
  if(!bGameOver) {
    // Dealer draws 1 more card while score < 18 and < player score
    while( (dealerScore < 18) && (playerScore > dealerScore)) {
      drawDealerCard();
    }
    // Check which player is closer to 21
    playerDiff = 21 - playerScore;
    dealerDiff = 21 - dealerScore;  
    // Check for winners
    if((playerDiff < dealerDiff)&&(playerScore < 22)) {
      statusBarTxt.style = "color: chartreuse; animation: 2s anim-flipX ease 1;";
      statusBarTxt.innerHTML = "✔️ Winner ($5)";
      bPlayerWon = true;
      disableButtons();
    } else if((playerDiff > dealerDiff)&&(dealerScore < 22)) {
      statusBarTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "❌ Dealer Wins (-$5)";
      bPlayerWon = false;
      disableButtons();
      // Players are done drawing cards and scores are equal
    } else if(playerScore == dealerScore) {
      // Subtract $5 from dealer (otherwise a draw awards dealer $5 due to boolean winner flag)
      totalScoreDealer = totalScoreDealer - 5;
      totalScorePlayer = totalScorePlayer + 5;
      statusBarTxt.style = "color: #dddddd";
      statusBarTxt.innerHTML = "🔷 Draw ($0)";
      bPlayerWon = false;
      disableButtons();
    } 
  }
}

// Update the scoreboard and dollar amounts
function updateScore() {
  playerScoreTxt.innerHTML = "Player: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
  // Change text color to red if money is negative
  if(totalScorePlayer < 0) {
    playerScoreTotalTxt.style = "color: indianred";
    // Format string with negative symbol leading dollar sign
    playerScoreTotalTxt.innerHTML = "-$" + -1*(totalScorePlayer);
    // Otherwise set the text back to white
  } else {
    playerScoreTotalTxt.style = "color: white";
    playerScoreTotalTxt.innerHTML = "$" + totalScorePlayer;
  }
  if(totalScoreDealer < 0) {
    dealerScoreTotalTxt.style = "color: indianred";
    dealerScoreTotalTxt.innerHTML = "-$" + -1*(totalScoreDealer);
  } else {
    dealerScoreTotalTxt.style = "color: white";
    dealerScoreTotalTxt.innerHTML = "$" + totalScoreDealer;
  }
}

// Update player's cards on screen
function updatePlayerCards() {
  gameBoardPlayer.innerHTML += "<td>" + cardFaceTxt + "</td>";
  if((nPlayerCards > nPlayerCardsOld) && (nPlayerCards > 2)) drawDealerCard();
}

// Update dealer's cards on screen
function updateDealerCards() {
  gameBoardDealer.innerHTML += "<td>" + cardFaceTxt + "</td>";
}

// Clear scores
function clearScoreboard() {
  gameBoardPlayer.innerHTML = "";
  gameBoardDealer.innerHTML = "";
}

// End the round
function disableButtons() {
  // Add and subtract $5 depending on winner
  if(bPlayerWon) {
    totalScorePlayer = totalScorePlayer + 5;
    totalScoreDealer = totalScoreDealer - 5;
  } else {
    totalScoreDealer = totalScoreDealer + 5;
    totalScorePlayer = totalScorePlayer - 5;
  }
  updateScore();
  bGameOver = true;
  bPlayerWon = false;
  // Special message if player breaks the house
  if(totalScoreDealer < 0) {
    statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 3;";
    statusBarTxt.innerHTML = "💵 BROKE THE BANK! 💵";
  }
  // Disable [HIT] and [STAND] buttons
  btnHit.disabled = true;
  btnStand.disabled = true;
  btnHit.style = "background-color: #222222; cursor: not-allowed";
  btnStand.style = "background-color: #222222; cursor: not-allowed";
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
      restartGame();
      break;
    default:
      break;
    }
  })
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
