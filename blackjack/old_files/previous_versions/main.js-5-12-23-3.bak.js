const fullDeck = [
// Emojis break arithmetic
//  ['♠️','♥️','♣️','♦️'],
// Text for testing
//  ['S','H','C','D'],
  ['♠','♥','♣','♦'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];

let count = 0;
let card = [];
let playerScore = 0;
let dealerScore = 0;

  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
//      document.write("[0, " + suit + "], " + "[1, " + rank + "] <br>");
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
//      document.write(card[count] + " ");
      count++;
    }
//    document.write("<br><br>");
  }

function restartGame() {
  playerScore = 0;
  gameBoard.innerHTML = "<br>";
  playerScoreTxt.innerHTML = "Score: " + playerScore
  statusBarTxt.style = "color: #000000";
  statusBarTxt.innerHTML = "";
  btnHit.disabled = false;
  btnHit.style = "background-color: #000000; cursor: pointer";
  dealCard();
}

function dealCard() {
  randCardIndex = Math.floor(Math.random() * 52);

  newCard = card[randCardIndex]
  newCardValue = newCard.slice(1);
  newCardValue.trim();
  newCardValue = Number(newCardValue);
  playerScore = Number(playerScore);

  if( (newCardValue > 1) && (newCardValue < 11) ) {
    playerScore = playerScore + newCardValue;
  } else {
    // Face cards
    if((playerScore + 10) > 21) {
      playerScore = playerScore + 1;
    } else {
      playerScore = playerScore + 10;
    }
  }

  gameBoard.append("[" + newCard + "] ");
  playerScoreTxt.innerHTML = "Player: " + Number(playerScore) + "<br> Dealer: " + dealerScore;

  if(playerScore == 21) {
    statusBarTxt.innerHTML = "<br>Blackjack!";
    statusBarTxt.style = "color: chartreuse";
  }
  else if(playerScore > 21) {
    statusBarTxt.style = "color: indianred";
    statusBarTxt.innerHTML = "<br>Game Over";
    btnHit.disabled = true;
    btnHit.style = "background-color: #222222; cursor: not-allowed";
  }

}

function stand() {
  while(dealerScore < 22) {
    randCardIndex = Math.floor(Math.random() * 52);

    newCard = card[randCardIndex]
    newCardValue = newCard.slice(1);
    newCardValue.trim();
    newCardValue = Number(newCardValue);
    dealerScore = Number(dealerScore);


    if( (newCardValue > 1) && (newCardValue < 11) ) {
      dealerScore = dealerScore + newCardValue;
    } else {
      // Face cards
      if((dealerScore + 10) > 21) {
        dealerScore = dealerScore + 1;
      } else {
        dealerScore = dealerScore + 10;
      }
    }

    gameBoard.append("[" + newCard + "] ");
    playerScoreTxt.innerHTML = "Player: " + Number(playerScore) + "<br> Dealer: " + dealerScore;

    if(playerScore == 21) {
      statusBarTxt.innerHTML = "<br>Blackjack!";
      statusBarTxt.style = "color: chartreuse";
    }
    else if(playerScore > 21) {
      statusBarTxt.style = "color: indianred";
      statusBarTxt.innerHTML = "<br>Game Over";
      btnHit.disabled = true;
      btnHit.style = "background-color: #222222; cursor: not-allowed";
    }
  }
}