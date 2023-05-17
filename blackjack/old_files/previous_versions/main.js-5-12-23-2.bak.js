const fullDeck = [
  ['♠️','♥️','♣️','♦️'],
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
];

let count = 0;
let card = [];

  for(suit = 0; suit<4; suit++) {
    for(rank = 0; rank<13; rank++) {
//      document.write("[0, " + suit + "], " + "[1, " + rank + "] <br>");
      card[count] = fullDeck[0][suit] + fullDeck[1][rank]
      count++;
    }
//    document.write("<br><br>");
  }

//alert("Count = " + count);

count = count - 52; // verify 52 generated
document.write("<table cellpadding='10'><tr>");
while(count < 52) {
  if((count) % 13 == 0) document.write("<td>");
  document.write(card[count] + "<br>");
  if((count+1) % 13 == 0) document.write("</td>");
  count++;
}

document.write("</tr></table>");

//document.write("Total = " + totalCards);

