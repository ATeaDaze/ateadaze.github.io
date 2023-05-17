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
//let nDealerCards = 0;
let nPlayerCards = 0;

// Generate a 52 card deck (spades, hearts, clubs, and diamonds from 2-10,J,Q,K,A)
  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
      count++;
    }
  }
// Keybindings (H = hit, S = stand, N = new game)
getKeyboardInput();

function restartGame() {
  playerScore = 0;
  dealerScore = 0;
  nDealerCards = 0;
  nPlayerCards = 0;
  gameBoard.innerHTML = "<br>";
  gameBoardDealer.innerHTML = "<br>";
  playerScoreTxt.innerHTML = "You: " + playerScore;
  dealerScoreTxt.innerHTML = "Dealer: " + dealerScore;
  dealerScoreTxt.style = "color:#ffffff";
  playerScoreTxt.style = "color:#ffffff";
  statusBarTxt.style = "color: #ffffff";
  statusBarTxt.innerHTML = "";
  btnHit.disabled = false;
  btnHit.style = "background-color: #000000; cursor: pointer";
  btnStand.disabled = false;
  btnStand.style = "background-color: #000000; cursor: pointer";
  dealCard();
}

// Draw 1 card for player
function dealCard() {
  // Draw 1 card for dealer
  if(dealerScore < 18) {
    dealerScore = dealerScore + drawDealerCard();
  }

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
  nPlayerCards++;
  gameBoard.append("▌" + newCard + "\xa0\xa0\xa0");
  playerScoreTxt.innerHTML = "You: " + Number(playerScore);
  dealerScoreTxt.innerHTML = "Dealer: " + Number(dealerScore);
  checkWinner();

}


// These checks are not working
function stand() {
  // Check which player is closer to 21
  playerDiff = 21 - playerScore;
  dealerDiff = 21 - dealerScore;
  // Draw cards until dealer score is lower than player's and less than 17
  while( (dealerScore < 18) && (playerScore > dealerScore)) {
//    nDealerCards++;
    randCardIndex = Math.floor(Math.random() * 52);
    newCard = card[randCardIndex]
    newCardValue = newCard.slice(1);
    newCardValue.trim();
    newCardValue = Number(newCardValue);
    dealerScore = Number(dealerScore);
    newCardTxt = newCard.slice(1);
    // Use integer if value is 1:10
    if( (newCardValue > 1) && (newCardValue < 11) ) {
      dealerScore = dealerScore + newCardValue;
      // Use value of 10 for face cards
    } else if((newCardTxt == 'J')||(newCardTxt == 'Q')||(newCardTxt == 'K')) {
      dealerScore = dealerScore + 10;
    } else {
      // Ace: use 11 unless it would be over 21
      if((dealerScore + 11) > 21) {
        dealerScore = dealerScore + 1;
      } else {
        dealerScore = dealerScore + 11;
      }
    }
//    gameBoardDealer.append("▌" + newCard + " ");
    playerScoreTxt.innerHTML = "You: " + Number(playerScore);
    dealerScoreTxt.innerHTML = "Dealer: " + dealerScore;
    checkWinner();
  }
  // Check for win conditions
  if((dealerScore > 21)&&(playerScore < 21)) {
    statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "<br> Win: Dealer Bust";
    disableButtons();
  } else if(playerDiff < dealerDiff) {
    statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "<br> You Win";
    disableButtons();
   } else if(playerDiff > dealerDiff) {
    statusBarTxt.style = "color: indianred";
    statusBarTxt.innerHTML = "<br> Dealer Wins";
    disableButtons();
  } else {
    statusBarTxt.style = "color: #aaaaaa";
    statusBarTxt.innerHTML = "<br>Draw";
    disableButtons();
   }

}

function checkWinner() {
  playerDiff = 21 - playerScore;
  dealerDiff = 21 - dealerScore;
  // Check for more win conditions
  if(playerScore == 21) {
    statusBarTxt.innerHTML = "<br>🃏 Blackjack";
    statusBarTxt.style = "color: #CF9FFF; animation: 5s anim-flipX ease 1;";
    disableButtons();
  } else if(dealerScore == 21) {
    statusBarTxt.innerHTML = "<br>Dealer Blackjack";
    statusBarTxt.style = "color: indianred";
    disableButtons();
  } else if(playerScore > 21) {
    statusBarTxt.style = "color: indianred";
    statusBarTxt.innerHTML = "<br>Bust";
    disableButtons();
   } else if(dealerScore > 21) {
        statusBarTxt.style = "color: chartreuse";
    statusBarTxt.innerHTML = "<br>Win: Dealer Bust";
    disableButtons();
  }
}

function disableButtons() {
    btnHit.disabled = true;
    btnStand.disabled = true;
    btnHit.style = "background-color: #222222; cursor: not-allowed";
    btnStand.style = "background-color: #222222; cursor: not-allowed";
}
// Draw random value for dealer's first card (2:11)
function drawDealerCard() {
//  nDealerCards++;
  return(Math.floor(Math.random() * 10) + 2);
}

// Keyboard shortcuts
function getKeyboardInput() {
  document.addEventListener('keypress', e => {
  switch(e.key) {
    case 'h':
      dealCard();
      break;
    case 's':
      stand();
      break;
    case 'n':
      restartGame();
      break;
    default:
      break;
    }
  })
}
