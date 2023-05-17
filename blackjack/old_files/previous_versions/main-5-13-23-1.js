// TODO: refactor, add check for dealing to stand if score is 19-20, add bSomebodyWon flag, blackjack only if < 2 cards drawn
// separate functions for dealing to player/house
// BUGS: always draw 2 cards for each person, hide dealer value for 1st card
const fullDeck = [
// ASCII characters
  ['♠','♥','♣','♦'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];

let count = 0;
let card = [];
let playerScore = 0;
let dealerScore = 0;
let nDealerCards = 0;
let nPlayerCards = 0;
let bGameOver = false;
let cardFaceTxt;
//let bPlayerStands = false;

generateCardDeck();
// Keybindings (H = hit, S = stand, N = new game)
// BUG: disable btnHit and btnStand on Game Over
getKeyboardInput();

function mainGameLoop() {
  if(nPlayerCards < 3) {
    dealCardToPlayer();
    dealCardToPlayer();
  }
  dealCardToDealer();
  checkForWins();
}

function restartGame() {
  playerScore = 0;
  dealerScore = 0;
  nDealerCards = 0;
  nPlayerCards = 0;
  bGameOver = false;
//  bPlayerStands = false;
  updateScore();
  clearScoreboard();
  dealerScoreTxt.style = "color:#ffffff";
  playerScoreTxt.style = "color:#ffffff";
  statusBarTxt.style = "color: #ffffff";
  statusBarTxt.innerHTML = "";
  btnHit.disabled = false;
  btnHit.style = "background-color: #000000; cursor: pointer";
  btnStand.disabled = false;
  btnStand.style = "background-color: #000000; cursor: pointer";
  mainGameLoop();
}

// Draw 1 card for player
function dealCardToPlayer() {
  randCardIndex = Math.floor(Math.random() * 52);
  newCard = card[randCardIndex]
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  playerScore = Number(playerScore);
  newCardTxt = newCard.slice(1);
  // Needs check: face cards = 10, aces = 1|11
  if( (newCardValue > 1) && (newCardValue < 11) ) {
    playerScore = playerScore + newCardValue;
  } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      playerScore = playerScore + 10;
  } else {
    // Face cards
    if((playerScore + 11) > 21) {
      playerScore = playerScore + 1;
    } else {
      playerScore = playerScore + 11;
    }
  }
  nPlayerCardsOld = nPlayerCards;
  nPlayerCards++;
//  cardFaceTxt = "<span class='fadeCard'>▌" + newCard + "\xa0\xa0\xa0</span>";
  cardFaceTxt = "▌" + newCard + "\xa0\xa0\xa0";
  updatePlayerCards();
  updateScore();
  checkForWins();
}

// Draw 1 card for dealer
function dealCardToDealer() {
  lastCard = newCard;
  randCardIndex = Math.floor(Math.random() * 52);
  newCard = card[randCardIndex]
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  dealerScore = Number(dealerScore);
  newCardTxt = newCard.slice(1);
  // Needs check: face cards = 10, aces = 1|11
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
//  cardFaceTxt = "<span class='fadeCard'>▌" + newCard + "\xa0\xa0\xa0</span>";
  cardFaceTxt = "▌" + newCard + "\xa0\xa0\xa0";
  // TODO: HIDE NEWEST CARD BUT HOLD ITS VALUES
  updateDealerCards();

  updateScore();
  checkForWins();
}

// Needs better checks
function stand() {
  if(nDealerCards == 1) dealCardToDealer();
//  bPlayerStands = true;
  // Draw cards until dealer score is lower than player's and less than 17
  while( (dealerScore < 18) && (playerScore > dealerScore)) {
    dealCardToDealer();
//    gameBoardDealer.append("▌" + newCard + " ");
  }
  updateScore();
  checkForWins();
  checkFinalScore();
}

// Check for win conditions
function checkForWins() {
  playerDiff = 21 - playerScore;
  dealerDiff = 21 - dealerScore;
  // Check for more win conditions
  if((playerScore == 21)&&(nPlayerCards == 2)) {
    statusBarTxt.innerHTML = "🃏 Blackjack";
    statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 1;";
    disableButtons();
  } else if((dealerScore == 21)&&(nDealerCards == 2)) {
    statusBarTxt.innerHTML = "Dealer Blackjack";
    statusBarTxt.style = "color: indianred";
    disableButtons();
  } else if ((playerScore == 21)&&(nPlayerCards > 2)) {
      statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "<br> You Win";
    disableButtons();
  } else if ((dealerScore == 21)&&(nDealerCards > 2)) {
      statusBarTxt.style = "color: indianred";
    statusBarTxt.innerHTML = "<br> Dealer Wins";
    disableButtons();
  } else if(playerScore > 21) {
    statusBarTxt.style = "color: indianred";
    statusBarTxt.innerHTML = "Bust";
    disableButtons();
   } else if(dealerScore > 21) {
    statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "Win: Dealer Bust";
    disableButtons();
  }
  if((dealerScore > 21)&&(playerScore < 21)) {
    statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "<br> Win: Dealer Bust";
    disableButtons();
  }
  
}

function checkFinalScore() {
  playerDiff = 21 - playerScore;
  dealerDiff = 21 - dealerScore;  
  if((playerDiff < dealerDiff)&&(playerScore < 22)) {
    statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "<br> You Win";
    disableButtons();
//  } else if((playerDiff > dealerDiff)&&(dealerScore < 22)) {
  } else if((playerDiff > dealerDiff)&&(dealerScore < 22)) {
    statusBarTxt.style = "color: indianred";
    statusBarTxt.innerHTML = "<br> Dealer Wins";
    disableButtons();
  } else if(playerScore == dealerScore){
    statusBarTxt.style = "color: #aaaaaa";
    statusBarTxt.innerHTML = "<br>Draw";
    disableButtons();
  }
}

function updateScore() {
  playerScoreTxt.innerHTML = "You: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
}

function updatePlayerCards() {

//  let newSpan = document.createElement('span');
//  document.getElementById('gameBoardPlayer').appendChild(newSpan + cardFaceTxt);

  if(nPlayerCards < 3) {
    gameBoardPlayer.innerHTML += cardFaceTxt;
  } else {
    setTimeout(function() {
      gameBoardPlayer.innerHTML += cardFaceTxt;
    }, 250);
  }
  if((nPlayerCards > nPlayerCardsOld) && (nPlayerCards > 2)) dealCardToDealer();
}

function updateDealerCards() {
//  gameBoardPlayer.style = "animation: fadeIn 5s;-webkit-animation: fadeIn 5s;";

  if(nDealerCards == 1) {
    gameBoardDealer.innerHTML += cardFaceTxt;
  } else {
    setTimeout(function() {
      gameBoardDealer.innerHTML += cardFaceTxt;
    }, 250);

  }

}


function clearScoreboard() {
  gameBoardPlayer.innerHTML = "";
  gameBoardDealer.innerHTML = "";
}

function disableButtons() {
  bGameOver = true;
  btnHit.disabled = true;
  btnStand.disabled = true;
  btnHit.style = "background-color: #222222; cursor: not-allowed";
  btnStand.style = "background-color: #222222; cursor: not-allowed";
}
// Draw random value for dealer's first card (2:11)
//function drawDealerCard() {
//  nDealerCards++;
//  return(Math.floor(Math.random() * 10) + 2);
//}

// Keyboard shortcuts: disable [HIT] and [STAND] if game has ended
function getKeyboardInput() {
  document.addEventListener('keypress', e => {
  switch(e.key) {
    case 'h':
      if(!bGameOver) dealCardToPlayer();
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

function generateCardDeck() {
  // Generate a 52 card deck (spades, hearts, clubs, and diamonds from 2-10,J,Q,K,A)
  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
      count++;
    }
  }
}
