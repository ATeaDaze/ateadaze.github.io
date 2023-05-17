const fullDeck = [
  ['♠️','♥️','♣️','♦️'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];

let count = 0;
let card = [];

  for(suit = 0; suit<4; suit++) {
//    document.write("suit = " + suit + "<hr>");
    for(rank = 0; rank<13; rank++) {
//      document.write("[0, " + suit + "], " + "[1, " + rank + "] <br>");
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
      count++;
    }
//    document.write("<br><br>");
  }

totalCards = 0;
while(totalCards < 52) {
  document.write("card[" + totalCards + "] = " + card[totalCards] + "<br>");
  if((totalCards+1) % 13 == 0) document.write("<br>");
  totalCards++;
}

/*
document.write(fullDeck[0][0] + fullDeck[1][0]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][1]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][2]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][3]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][4]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][5]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][6]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][7]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][8]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][9]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][10]+ ", ");
document.write(fullDeck[0][0] + fullDeck[1][11]+ ", ");

document.write(fullDeck[0][0] + fullDeck[1][12] + "<br><br>");

document.write(fullDeck[0][1] + fullDeck[1][0]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][1]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][2]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][3]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][4]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][5]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][6]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][7]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][8]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][9]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][10]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][11]+ ", ");
document.write(fullDeck[0][1] + fullDeck[1][12]+ ", ");

document.write(fullDeck[0][0] + fullDeck[1][12] + "<br><br>");

document.write(fullDeck[0][2] + fullDeck[1][0]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][1]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][2]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][3]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][4]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][5]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][6]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][7]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][8]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][9]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][10]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][11]+ ", ");
document.write(fullDeck[0][2] + fullDeck[1][12]+ ", ");

document.write(fullDeck[0][0] + fullDeck[1][12] + "<br><br>");

document.write(fullDeck[0][3] + fullDeck[1][0]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][1]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][2]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][3]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][4]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][5]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][6]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][7]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][8]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][9]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][10]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][11]+ ", ");
document.write(fullDeck[0][3] + fullDeck[1][12]+ ", ");

//document.write(card[0] + "<br>");
//document.write(card[1] + "<br>");
//document.write(card[2] + "<br>");
//document.write(card[3] + "<br>");

//function buildDeck() {
/*
for(let i = 0; i <numSuits; i++) {

  let faceIndex = 0;
  for(let j = 2; j<=14; j++) {

    if((j > 10)&&(j < 15)) {
      document.write(faceCards[faceIndex]);
      faceIndex++;
    } else {
      document.write(j);
    }

    document.write(" of " + cardSuit[i] + ", ");
  }
  document.write("<br><br><br>");

}
*/
//}