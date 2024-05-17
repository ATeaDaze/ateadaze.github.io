/* TODO: go through and improve the naming scheme of repeated variables
  - Implement a newGame() function which resets the entire game state
  - Implement row interaction with 1 function: setRowInteraction(rowList[], 'none|auto');
  - Make disabledScoreRow[] a dynamic list
    - List contains every row on page load for no interaction
    - Start new game, clear list, and add new rows to array during gameplay
    NOTE: row interaction is often required at the same times
  - Add hold/unhold all dice button or keybind
  - Optimize checks for full house and straights
  BUGS: button roll keybind conflicts with event handler for row selection ("click keydown"),
  using the keybind for rollButton() skips a call to re-enable score table rows, 
  x-of-a kind preview sometimes off (?) */
let currentDice =  [5,     5,     5,     5,     5     ];
let selectedDice = [false, false, false, false, false ];

let disabledScoreRows = [ rowAces, rowTwos, rowThrees, rowFours, rowFives, rowSixes,
                          rowThreeOfAKind, rowFourOfAKind, rowFullHouse, rowSmallStraight,
                          rowLargeStraight, rowYhatzee, rowChance ];
// Static list of non-selectable rows (they are only used for calculations)
const disabledCalcRows = [ rowUpperSubtotal, rowUpperBonus, rowUpperTotal, rowYahtzeeBonus,
                           rowLowerTotal, rowUpperGrandTotal, rowLowerGrandTotal, rowFinalGrandTotal ];
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
let defaultStatusMsg = "Roll the Dice to Start Playing";
let bonusHint;
let bonusDifference;
var activeSetName;
var activeSetValue;
const audioHold = new Audio("audio/dice_hold.ogg");
const audioUnhold = new Audio("audio/dice_unhold.ogg");
const audioThrowDice = new Audio("audio/throw_5_dice.ogg");
const audioFillScore = new Audio("audio/fill_score.ogg");
const audioYahtzee = new Audio("audio/yahtzee.ogg");
const audioBonus = new Audio("audio/bonus_upper.ogg");

$(document).ready(function() {
  updateTurns();
  getKeyboardInput();
  // Disable all scoring rows until game starts
  disableScoreSetRows();
  $("#txtStatusHeader").html(defaultStatusMsg);

  $("#btnRoll").click(function() {
    enableScoreSetRows();
    // Clear list of disabled score rows (will need to modify order and list)
//    disabledScoreRows = [];
    rollDice();
    bonusDifference = 63 - userScoreUpperSubtotal;
    if(bonusDifference > 0) {
      bonusHint = bonusDifference;
      $("#txtBonusGoal").html(bonusHint); 
    }
    if(nRollsLeft == 2) {
      defaultStatusMsg = "Roll Again or Select a Score";
    }
    if(nRollsLeft < 1) {
      disableRollButton();
      disableDiceButtons();
      bIsKeyboardEnabled = false;
      defaultStatusMsg = "Select a Score from the Table";
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
  $("[id^=row]").on("click", function() {
    // Enable total rows to allow calculations
    enableCalculationRows();
    // TODO: there is definitely a better to do this
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
      audioFillScore.play();
      $(activeRow).addClass("usedRow");
//      $(activeRow).css('pointer-events', 'none');
      //$("#btnRoll").trigger("focus");
      // Disable row selection after adding new score
      disableCalculationRows();
      disableScoreSetRows();
      defaultStatusMsg = "Roll the Dice to Start New Turn";
      $("#txtStatusHeader").html(defaultStatusMsg);
    }
    nTurnsTaken++;
    startNewTurn();
  });
// Disable row selection after calculation
disableCalculationRows();
});

function rollDice() {
  audioThrowDice.play();
/* Animate dice roll for each slot (plays for 0.25s)
   BUG: timeout prevents selecting dice on 3rd roll */
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
  defaultStatusMsg = "Game Over";
  // END: show game over screen, TODO: set up new game conditions
  if(nTurnsTaken == 13) {
    if(userScoreUpperBonus == 35) audioBonus.play();
    alert(`Game Over!\n\nScore: ${userScoreGrandTotal}\n\nRefresh the page to start a new game`);
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
  // BUG: getting yahtzee on the 1st turn does not seem to allow score submission (weird)
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
      // BUG: skips a call to change row selection state
//      if(keyName == "r") rollDice();
      if(nRollsLeft < 1) {
        disableRollButton();
        disableDiceButtons();
        bIsKeyboardEnabled = false;
      }
    }
  });
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

/* TODO: combine these into a single function
toggleRowSelectState(arrayName, 'none'|'auto"); */
function disableCalculationRows() {
  disabledCalcRows.forEach((setID) => {
    $(setID).css('pointer-events', 'none');
  });
}

function enableCalculationRows() {
  disabledCalcRows.forEach((setID) => {
    $(setID).css('pointer-events', 'auto');
  });
}

function disableScoreSetRows() {
  disabledScoreRows.forEach((setID) => {
    $(setID).css('pointer-events', 'none');
  });
}

function enableScoreSetRows() {
  disabledScoreRows.forEach((setID) => {
    $(setID).css('pointer-events', 'auto');
  });
}
