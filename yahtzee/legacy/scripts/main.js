// TODO: set user score when section row is clicked, add checks for valid dice combos, add hold/unhold all dice
let currentDice =  [5,     5,     5,     5,     5     ];
let selectedDice = [false, false, false, false, false ];
let diceValue = 0;
let previewScoreAces = 0;
let previewScoreTwos = 0;
let previewScoreThrees = 0;
let previewScoreFours = 0;
let previewScoreFives = 0;
let previewScoreSixes = 0;
let previewScoreUpperTotal = 0;
let previewScoreThreeOfAKind = 0;
let previewScoreFourOfAKind = 0;
let previewScoreFullHouse = 0;
let previewScoreSmallStraight = 0;
let previewScoreLargeStraight = 0;
let previewScoreYahtzee = 0;
let previewScoreChance = 0;
let previewScoreLowerTotal = 0;
let userScoreAces = null;
let userScoreTwos = null;
let userScoreThrees = null;
let userScoreFours = null;
let userScoreFives = null;
let userScoreSixes = null;
let userScoreUpperTotal = null;
let userScoreThreeOfAKind = null;
let userScoreFourOfAKind = null;
let userScoreFullHouse = null;
let userScoreSmallStraight = null;
let userScoreLargeStraight = null;
let userScoreYahtzee = null;
let userScoreChance = null;
let userScoreLowerTotal = null;
let nRollsLeft = 30;

$(document).ready(function() {
  updateTurns();
  $("#btnRoll").click(function() {
    rollDice();
    if(nRollsLeft < 1) {
      disableRollButton();
    }
   });

  $("[id^=currentDiceImg-]").click(function() {
    let activeDie = $(this).closest('td').index();
    if(selectedDice[activeDie]) {
      selectedDice[activeDie] = false;
      $(this).removeClass("diceButtonSelected");
      $(this).addClass("diceButton");
    } else {
      selectedDice[activeDie] = true;
      $(this).removeClass("diceButton");
      $(this).addClass("diceButtonSelected");
    }
  });

  // Select a score based on row clicked
  $("[id^=row]").on("click", function() {
    let activeRow = $(this).closest('tr').children('td:last');
    let activeRowID = this.id;
    let previewRowTxt = $(activeRow).text();
//    console.log(`activeRowID = ${activeRowID}, previewRowTxt = ${previewRowTxt}`);
  });

});

function rollDice() {
  // Reset preview scores
  $("[id^=txtScore]").html(null);
  // Animate dice roll for each slot (plays for 0.25s)
  for(let i = 0; i < 6; i++) {
    if(!selectedDice[i-1]) {
      $("#currentDiceImg-" + i).attr("src", "images/dice-roll-" + i + ".gif");
    }
  }
  setTimeout(() => {
    for(let i = 0; i < 5; i++) {
      let j = i + 1;
      if(!(selectedDice[i])) {
        currentDice[i] = Math.floor(Math.random() * 6) + 1;
        $("#currentDiceImg-" + j).attr("src","images/dice-" + currentDice[i] + ".png");
      }
    }
  updateTurns();
  updateScorePreviews();
  }, 250);
  nRollsLeft--;
}

function startNewTurn() {
  nRollsLeft = 3;
  for(i = 0; i < 5; i++) {
    selectedDice[i] = false;
  }
  enableRollButton();
  updateTurns();
}

function submitNewScore(uScore, pScoreTxt) {
  // uScore = pScoreTxt
  // Update scoreboard
  // Start a new turn
}

function previewUpperScores(pScore, bValue, txtLbl) {
  txtLbl = txtLbl.id;
  currentDice.forEach((dValue) => {
    if(dValue == bValue) {
      pScore = pScore + bValue;
    }
  });
//  console.log(`txtLbl = ${txtLbl}, pScore = ${pScore}, bValue = ${bValue}`);
  $('#' + txtLbl).html(pScore);
//  pScore = 0;
}

function previewLowerScores(pScore, txtLbl) {
  txtLbl = txtLbl.id;
  currentDice.forEach((dValue) => {
      pScore = pScore + dValue;
  });
//  console.log(`txtLbl = ${txtLbl}, pScore = ${pScore}`);
  $('#' + txtLbl).html(pScore);
//  pScore = 0;
}

function updateScorePreviews() {
  // Sort array of dice for simpler checks
  let diceSorted = [...currentDice].sort();
  // UPPER SECTION PREVIEWS (DONE)
  previewUpperScores(previewScoreAces, 1, txtScoreAces);
  previewUpperScores(previewScoreTwos, 2, txtScoreTwos);
  previewUpperScores(previewScoreThrees, 3, txtScoreThrees);
  previewUpperScores(previewScoreFours, 4, txtScoreFours);
  previewUpperScores(previewScoreFives, 5, txtScoreFives);
  previewUpperScores(previewScoreSixes, 6, txtScoreSixes);
  // LOWER SECTION PREVIEWS, TODO: optimize the checks for full house and straights
  // Three of a kind
  if(findXOfAKind(3)) {
    previewLowerScores(previewScoreThreeOfAKind, txtScoreThreeOfAKind);
  }
  // Four of a kind
  if(findXOfAKind(4)) {
    previewLowerScores(previewScoreFourOfAKind, txtScoreFourOfAKind);
  }
  // Full house, small and large straights
  findFullHouse(diceSorted);
  findSmallStraight(diceSorted);
  findLargeStraight(diceSorted);
  // Yahtzee
  const allDiceAreEqual = arr => arr.every( v => v === arr[0] );
//  console.log(`allDiceAreEqual = ${allDiceAreEqual(currentDice)}`);
  if(allDiceAreEqual(currentDice)) $("#txtScoreYahtzee").html(50);
    previewLowerScores(previewScoreChance, txtScoreChance);
  }

function findXOfAKind(x) {
  let nMatches = 1; 
  let diceSorted = [...currentDice].sort(); 
  let last = diceSorted[0]; 

  for(let i = 1; i < 5; i++) {
//    console.log(`i = ${i}`);
    if(nMatches == x) {
      break;
    }
    if(last === diceSorted[i]) {
      nMatches++;
    } else {
      nMatches = 1;
      last = diceSorted[i];
    }
  }
  if(nMatches == x) return(true);
//  console.log(`nMatches = ${nMatches}`);
//  console.log(`diceSorted = ${diceSorted}`);
}

function findFullHouse(dS) {
  if( ((dS[0] == dS[1]) && (dS[2] == dS[3]) && (dS[3] == dS[4])) ||
    (  (dS[0] == dS[1]) && (dS[1] == dS[2]) && (dS[3] == dS[4])) ) {        
  $("#txtScoreFullHouse").html(25);
  }
}

function findSmallStraight(dS) {
  if( ((dS.includes(1)) && (dS.includes(2)) && (dS.includes(3)) && (dS.includes(4))) ||
      ((dS.includes(2)) && (dS.includes(3)) && (dS.includes(4)) && (dS.includes(5))) ||
      ((dS.includes(3)) && (dS.includes(4)) && (dS.includes(5)) && (dS.includes(6))) ) {
    $("#txtScoreSmallStraight").html(30);
  }
}

function findLargeStraight(dS) {
  if( ((dS[0] == 1) && (dS[1] == 2) && (dS[2] == 3) && (dS[3] == 4) && (dS[4] == 5)) ||
      ((dS[0] == 2) && (dS[1] == 3) && (dS[2] == 4) && (dS[3] == 5) && (dS[4] == 6)) ) {
      $("#txtScoreSmallStraight").html(30);
      $("#txtScoreLargeStraight").html(40);
  }
}

function updateTurns() {
  $("#btnRoll").html("ROLL DICE (" + nRollsLeft + " left)");
}

function disableRollButton() {
  $("#btnRoll").removeClass("enabledButton");
  $("#btnRoll").addClass("disabledButton");
  $("#btnRoll").prop("disabled", true);
}

function enableRollButton() {
  $("#btnRoll").removeClass("disabledButton");
  $("#btnRoll").addClass("enabledButton");
  $("#btnRoll").prop("disabled", false);
}

function disableDiceButtons() {
  $("[id^=currentDiceImg-]").removeClass("diceButton");
  $("[id^=currentDiceImg-]").addClass("diceButtonDisabled");
  $("[id^=currentDiceImg-]").prop("disabled", true);
  selectedDice = [true, true, true, true, true ];
}

function enableDiceButtons() {
  $("[id^=currentDiceImg-]").removeClass("diceButtonDisabled");
  $("[id^=currentDiceImg-]").addClass("diceButton");
  $("[id^=currentDiceImg-]").prop("disabled", false);
  selectedDice = [false, false, false, false, false ];
}
