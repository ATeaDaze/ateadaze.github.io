// TODO: set user score when section row is clicked, add checks for valid dice combos, add hold/unhold all dice
// optimize the checks for full house and straights, x-of-a kind preview sometimes off, disable row selection when
// it's not needed to avoid mis-clicks/taps
let currentDice =  [5,     5,     5,     5,     5     ];
let selectedDice = [false, false, false, false, false ];
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
let userScoreThreeOfAKind = null;
let userScoreFourOfAKind = null;
let userScoreFullHouse = null;
let userScoreSmallStraight = null;
let userScoreLargeStraight = null;
let userScoreYahtzee = null;
let userScoreChance = null;
let userScoreUpperSubtotal = 0;
let userScoreUpperTotal = 0;
let userScoreUpperBonus = 0;
let userScoreLowerTotal = 0;
let userScoreYahtzeeBonus = 0;
let userScoreGrandTotal = 0;
let nYahtzeeBonuses = 0;
let nRollsLeft = 3;
let nTurnsTaken = 0;
let bIsKeyboardEnabled = true;
let bNewScoreAdded = false;
let defaultStatusMsg = "Roll the dice to begin";
let bonusHint;
let bonusDifference;
var activeSetName;
var activeSetValue;
const audioHold = new Audio("audio/dice_hold.ogg");
const audioUnhold = new Audio("audio/dice_unhold.ogg");
const audioThrow5Dice = new Audio("audio/throw_5_dice.ogg");
const audioFillScore = new Audio("audio/fill_score.ogg");
const audioYahtzee = new Audio("audio/yahtzee.ogg");
const audioBonus = new Audio("audio/bonus_upper.ogg");

$(document).ready(function() {

  updateTurns();
  getKeyboardInput();
  disableScoreSetRows();

  $("#txtStatusHeader").html(defaultStatusMsg);

  $("#btnRoll").click(function() {
    enableScoreSetRows();
    rollDice();
    bonusDifference = 63 - userScoreUpperSubtotal;
    if(bonusDifference > 0) {
      bonusHint = "63-" + userScoreUpperSubtotal + " = " + (bonusDifference);
      $("#txtBonusGoal").html(bonusHint); 
    }
    if(nRollsLeft == 2) {
      defaultStatusMsg = "Roll again or select a score";
    }
    if(nRollsLeft < 1) {
      disableRollButton();
      disableDiceButtons();
      bIsKeyboardEnabled = false;
      defaultStatusMsg = "Select a score from the table";
    }
    $("#txtStatusHeader").html(defaultStatusMsg);
  });

  // Hold or release dice when clicked
  $("[id^=currentDiceImg-]").click(function() {
    let activeDie = $(this).closest('td').index();
    if(selectedDice[activeDie]) {
      audioHold.play();
      selectedDice[activeDie] = false;
      $(this).removeClass("diceButtonSelected");
      $(this).addClass("diceButton");
    } else {
      audioUnhold.play();
      selectedDice[activeDie] = true;
      $(this).removeClass("diceButton");
      $(this).addClass("diceButtonSelected");
    }
  });

  // Select a score based on the row clicked
  $("[id^=row]").on("click keypress", function() {
    enableCalculationRows();
    let activeRow = $(this).closest('tr');
    let activeCell = $(this).closest('tr').children('td:last');
    let activeRowID = this.id;
    let previewRowTxt = $(activeCell).text();
    previewRowTxt = parseInt(previewRowTxt);
    activeSetName = activeRowID.replace("row", "userScore");
    switch(activeSetName) {
      case "userScoreAces":
        userScoreAces = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreTwos":
        userScoreTwos = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreThrees":
        userScoreThrees = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreFours":
        userScoreFours = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreFives":
        userScoreFives = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreSixes":
        userScoreSixes = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreThreeOfAKind":
        userScoreThreeOfAKind = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreFourOfAKind":
        userScoreFourOfAKind = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreFullHouse":
        userScoreFullHouse = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreSmallStraight":
        userScoreSmallStraight = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreLargeStraight":
        userScoreLargeStraight = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreYahtzee":
        userScoreYahtzee = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreChance":
        userScoreChance = previewRowTxt;
        bNewScoreAdded = true;
        break;
      default:
        // how did I end up here?
        break;
    }
    if(bNewScoreAdded) {
      //console.log(`activeCell = ${activeCell}, activeRowID = ${activeRowID}`);
      audioFillScore.play();
      $(activeRow).addClass("usedRow");
      $(activeRow).css('pointer-events', 'none');
      //$("#btnRoll").trigger("focus");
      disableCalculationRows();
    }
    nTurnsTaken++;
    startNewTurn();
  });
disableCalculationRows();
});

function rollDice() {
  audioThrow5Dice.play();
// Animate dice roll for each slot (plays for 0.25s), BUG: timeout prevents selecting dice on 3rd roll
/*  for(let i = 0; i < 6; i++) {
    if(!selectedDice[i-1]) {
      $("#currentDiceImg-" + i).attr("src", "images/dice-roll-" + i + ".gif");
    }
  } */
// CSS transition does NOT work on the 1st cell (for some god-forsaken reason)
//  $("[id^=currentDiceImg-]").hide();
//  $("[id^=currentDiceImg-]").addClass("diceRotation");

  for(let i = 0; i < 5; i++) {
    let j = i + 1;
    if(!(selectedDice[i])) {
      currentDice[i] = Math.floor(Math.random() * 6) + 1;
      $("#currentDiceImg-" + j).attr("src","images/dice-" + currentDice[i] + ".png");
    }
  }

  if(userScoreThreeOfAKind == null) $("#txtScoreThreeOfAKind").html(0);
  if(userScoreFourOfAKind == null) $("#txtScoreFourOfAKind").html(0);
  if(userScoreFullHouse == null) $("#txtScoreFullHouse").html(0);
  if(userScoreSmallStraight == null) $("#txtScoreSmallStraight").html(0);
  if(userScoreLargeStraight == null) $("#txtScoreLargeStraight").html(0);
  if(userScoreYahtzee == null) $("#txtScoreYahtzee").html(0);
  updateScorePreviews();
  updateTotalScores();
  nRollsLeft--;
  updateTurns();
//  $("[id^=currentDiceImg-]").show();
}

function startNewTurn() {
//  $("[id^=currentDiceImg-]").removeClass("diceRotation");
  nRollsLeft = 3;
  bIsKeyboardEnabled = true;
  for(i = 0; i < 5; i++) {
    selectedDice[i] = false;
  }
  enableDiceButtons();
  enableRollButton();
  updateTotalScores();
  updateTurns();
  // Show game over screen, TODO: set up new game conditions (classes and formatting
  if(nTurnsTaken == 13) {
    if(userScoreUpperBonus == 35) audioBonus.play();
    alert(`Game Over!\n\nScore: ${userScoreGrandTotal}\n\nRefresh the page to start a new game`);
//    enableScoreSetRows();
  }
}

function previewUpperScores(pScore, uScore, bValue, txtLbl) {
  if(uScore == null) {
    txtLbl = txtLbl.id;
    currentDice.forEach((dValue) => {
      if(dValue == bValue) {
        pScore = pScore + bValue;
      }
    });
    $('#' + txtLbl).html(pScore);
  }
}

function previewLowerScores(pScore, uScore, txtLbl) {
  if(uScore == null) {
    txtLbl = txtLbl.id;
    currentDice.forEach((dValue) => {
        pScore = pScore + dValue;
    });
    $('#' + txtLbl).html(pScore);
  }
}

function updateScorePreviews() {
  let diceSorted = [...currentDice].sort();
  // UPPER SECTION PREVIEWS
  previewUpperScores(previewScoreAces, userScoreAces, 1, txtScoreAces);
  previewUpperScores(previewScoreTwos, userScoreTwos, 2, txtScoreTwos);
  previewUpperScores(previewScoreThrees, userScoreThrees, 3, txtScoreThrees);
  previewUpperScores(previewScoreFours, userScoreFours, 4, txtScoreFours);
  previewUpperScores(previewScoreFives, userScoreFives, 5, txtScoreFives);
  previewUpperScores(previewScoreSixes, userScoreSixes, 6, txtScoreSixes);
  // LOWER SECTION PREVIEWS
  // Three of a kind
  if(findXOfAKind(3)) {
    if(userScoreThreeOfAKind == null) {
      previewLowerScores(previewScoreThreeOfAKind, userScoreThreeOfAKind, txtScoreThreeOfAKind);
    }
  }
  // Four of a kind
  if(findXOfAKind(4)) {
    if(userScoreFourOfAKind == null) {
      previewLowerScores(previewScoreFourOfAKind, userScoreFourOfAKind, txtScoreFourOfAKind);
    }
  }
  // Full house, small straight, and large straight
  findFullHouse(diceSorted, userScoreFullHouse);
  findSmallStraight(diceSorted, userScoreSmallStraight);
  findLargeStraight(diceSorted, userScoreLargeStraight);
  // Yahtzee
  const allDiceAreEqual = arr => arr.every( v => v === arr[0] );
  if( (allDiceAreEqual(currentDice)) && (userScoreYahtzee == null)) {
    audioYahtzee.play();
    $("#txtScoreYahtzee").html(50);
    nYahtzeeBonuses++;
  }
    previewLowerScores(previewScoreChance, userScoreChance, txtScoreChance);
  }

function findXOfAKind(x) {
  let nMatches = 1; 
  let diceSorted = [...currentDice].sort(); 
  let last = diceSorted[0]; 
  for(let i = 1; i < 5; i++) {
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
}

function findFullHouse(dS, uS) {
if(uS == null) {
    if( ((dS[0] == dS[1]) && (dS[2] == dS[3]) && (dS[3] == dS[4])) ||
      (  (dS[0] == dS[1]) && (dS[1] == dS[2]) && (dS[3] == dS[4])) ) {        
    $("#txtScoreFullHouse").html(25);
    }
  }
}

function findSmallStraight(dS, uS) {
  if(uS == null) {
    if( ((dS.includes(1)) && (dS.includes(2)) && (dS.includes(3)) && (dS.includes(4))) ||
        ((dS.includes(2)) && (dS.includes(3)) && (dS.includes(4)) && (dS.includes(5))) ||
        ((dS.includes(3)) && (dS.includes(4)) && (dS.includes(5)) && (dS.includes(6))) ) {
      $("#txtScoreSmallStraight").html(30);
    }
  }
}

function findLargeStraight(dS, uS) {
  if(uS == null) {
    if( ((dS[0] == 1) && (dS[1] == 2) && (dS[2] == 3) && (dS[3] == 4) && (dS[4] == 5)) ||
        ((dS[0] == 2) && (dS[1] == 3) && (dS[2] == 4) && (dS[3] == 5) && (dS[4] == 6)) ) {
        $("#txtScoreSmallStraight").html(30);
        $("#txtScoreLargeStraight").html(40);
    }
  }
}

function updateTotalScores() {
  // Upper section
  userScoreUpperSubtotal = userScoreAces + userScoreTwos + userScoreThrees
                         + userScoreFours + userScoreFives + userScoreSixes;
  $("#txtScoreUpperSubtotal").html(userScoreUpperSubtotal);
  // Upper bonus
  if(userScoreUpperSubtotal > 62) {
    userScoreUpperBonus = 35;
  }
  userScoreUpperTotal = userScoreUpperSubtotal + userScoreUpperBonus;
  $("#txtScoreUpperTotal").html(userScoreUpperTotal);
  $("#txtScoreUpperBonus").html(userScoreUpperBonus);
  // Lower section
  userScoreLowerTotal = userScoreThreeOfAKind + userScoreFourOfAKind + userScoreFullHouse
                      + userScoreSmallStraight + userScoreLargeStraight + userScoreYahtzee + userScoreChance;
  $("#txtScoreLowerTotal").html(userScoreLowerTotal);
  // Lower bonus
  userScoreYahtzeeBonus = nYahtzeeBonuses * 100;
  $("#txtScoreYahtzeeBonus").html(userScoreYahtzeeBonus);
  // Grand totals
  userScoreGrandTotal = userScoreLowerTotal + userScoreUpperTotal;
  $("#txtGrandTotalUpper").html(userScoreUpperTotal);
  $("#txtGrandTotalLower").html(userScoreLowerTotal);
  $("#txtGrandTotalFinal").html(userScoreGrandTotal);
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
  selectedDice = [true, true, true, true, true ];
  $("[id^=currentDiceImg-]").removeClass("diceButton diceButtonSelected");
  $("[id^=currentDiceImg-]").addClass("diceButtonDisabled");
  $("[id^=currentDiceImg-]").prop("disabled", true);
}

function enableDiceButtons() {
  selectedDice = [false, false, false, false, false ];
  $("[id^=currentDiceImg-]").removeClass("diceButtonDisabled diceButtonSelected");
  $("[id^=currentDiceImg-]").addClass("diceButton");
  $("[id^=currentDiceImg-]").prop("disabled", false);
}
// TODO: disable rows when selection is not needed
/*function disableRowSelection() {
  $("[id^=row]").prop("disabled", true);
}
// Re-enable when needed
function enableRowSelection() {
  $("[id^=row]").prop("disabled", false);
}*/

function getKeyboardInput() {
  document.addEventListener('keypress', e => {
    if((bIsKeyboardEnabled) && (nRollsLeft > 0)) {
      let keyName = e.key;
      let keyIndex = e.key - 1;
      if(selectedDice[keyIndex]) {
        selectedDice[keyIndex] = false;
        $("#currentDiceImg-" + keyName).removeClass("diceButtonSelected");
        $("#currentDiceImg-" + keyName).addClass("diceButton");
      } else {
        selectedDice[keyIndex] = true;
        $("#currentDiceImg-" + keyName).removeClass("diceButton");
        $("#currentDiceImg-" + keyName).addClass("diceButtonSelected");
      }
        // Submits a score (for some reason)
//      if(keyName == "r") rollDice();
      if(nRollsLeft < 1) {
        disableRollButton();
        disableDiceButtons();
        bIsKeyboardEnabled = false;
      }
    }
  });
}

// Enable only when scoring
function disableCalculationRows() {
  $(rowUpperSubtotal).css('pointer-events', 'none');
  $(rowUpperBonus).css('pointer-events', 'none');
  $(rowUpperTotal).css('pointer-events', 'none');
  $(rowYahtzeeBonus).css('pointer-events', 'none');
  $(rowLowerTotal).css('pointer-events', 'none');
  $(rowUpperGrandTotal).css('pointer-events', 'none');
  $(rowLowerGrandTotal).css('pointer-events', 'none');
  $(rowFinalGrandTotal).css('pointer-events', 'none');
}

function enableCalculationRows() {
  $(rowUpperSubtotal).css('pointer-events', 'auto');
  $(rowUpperBonus).css('pointer-events', 'auto');
  $(rowUpperTotal).css('pointer-events', 'auto');
  $(rowYahtzeeBonus).css('pointer-events', 'auto');
  $(rowLowerTotal).css('pointer-events', 'auto');
  $(rowUpperGrandTotal).css('pointer-events', 'auto');
  $(rowLowerGrandTotal).css('pointer-events', 'auto');
  $(rowFinalGrandTotal).css('pointer-events', 'auto');
}


// Disable on start
function disableScoreSetRows() {
  $(rowAces).css('pointer-events', 'none');
  $(rowTwos).css('pointer-events', 'none');
  $(rowThrees).css('pointer-events', 'none');
  $(rowFours).css('pointer-events', 'none');
  $(rowFives).css('pointer-events', 'none');
  $(rowSixes).css('pointer-events', 'none');
  $(rowThreeOfAKind).css('pointer-events', 'none');
  $(rowFourOfAKind).css('pointer-events', 'none');
  $(rowFullHouse).css('pointer-events', 'none');
  $(rowSmallStraight).css('pointer-events', 'none');
  $(rowLargeStraight).css('pointer-events', 'none');
  $(rowYhatzee).css('pointer-events', 'none');
  $(rowChance).css('pointer-events', 'none');
}

// Enable after 1st roll
function enableScoreSetRows() {
  $(rowAces).css('pointer-events', 'auto');
  $(rowTwos).css('pointer-events', 'auto');
  $(rowThrees).css('pointer-events', 'auto');
  $(rowFours).css('pointer-events', 'auto');
  $(rowFives).css('pointer-events', 'auto');
  $(rowSixes).css('pointer-events', 'auto');
  $(rowThreeOfAKind).css('pointer-events', 'auto');
  $(rowFourOfAKind).css('pointer-events', 'auto');
  $(rowFullHouse).css('pointer-events', 'auto');
  $(rowSmallStraight).css('pointer-events', 'auto');
  $(rowLargeStraight).css('pointer-events', 'auto');
  $(rowYhatzee).css('pointer-events', 'auto');
  $(rowChance).css('pointer-events', 'auto');
}
