// TODO: add new game button and track states, save high score in local storage (ask for name 1st time)
let currentDice =  [5,     5,     5,     5,     5     ];
let selectedDice = [false, false, false, false, false ];
// Rows used only to calculate scores
const rowListCalculation = [  rowUpperSubtotal, rowUpperBonus, rowUpperTotal, rowYahtzeeBonus,
  rowLowerTotal, rowUpperGrandTotal, rowLowerGrandTotal, rowFinalGrandTotal ];
// List of all rows to disable on start
const rowListScoreSetAll = [ rowAces, rowTwos, rowThrees, rowFours, rowFives, rowSixes,
  rowThreeOfAKind, rowFourOfAKind, rowFullHouse, rowSmallStraight, rowLargeStraight, rowYhatzee, rowChance ];
// Running list of used rows to disable selection
let rowListScoreSetDisabled = [];
// Temporary scores to display
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
let previewScoreYahtzeeBonus = 0;
let previewScoreLowerTotal = 0;
// Scores entered by player
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
// Track number of yahtzees for bonus multiplier
let nYahtzeeScores = 0;
let nRollsLeft = 3;
let nTurnsTaken = 0;
let bIsKeyboardEnabled = true;
let bNewScoreAdded = false;
let defaultStatusMsg = "Roll the Dice to Start Playing";
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
  // Disable all score and calculation rows
  setRowSelectionState(rowListScoreSetAll, 'none');
  setRowSelectionState(rowListCalculation, 'none');
  $("#txtStatusHeader").html(defaultStatusMsg);

  // START: roll dice and update status message
  $("#btnRoll").click(function() {
    // Enable all score rows
    setRowSelectionState(rowListScoreSetAll, 'auto');
    // Disable any used score rows
    setRowSelectionState(rowListScoreSetDisabled, 'none');
    // Enable all score rows on 1st turn
    if(nTurnsTaken == 0) {
      $("#txtStatusHeader").html(defaultStatusMsg);
    }
    rollDice();


    updateBonusGoalValue();

    // Update instructions for each roll
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
    // Enable calculation rows
    setRowSelectionState(rowListCalculation, 'auto');
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
      case "userScoreYhatzee":
        userScoreYahtzee = previewRowTxt;
        bNewScoreAdded = true;
        break;
      case "userScoreChance":
        userScoreChance = previewRowTxt;
        bNewScoreAdded = true;
        break;
      default:
        // How did you end up here?
        break;
    }
    // Update table if a score is submitted
    if(bNewScoreAdded) {
      audioFillScore.play();
      $(activeRow).addClass("usedRow");
      rowListScoreSetDisabled.push(activeRow);
      // Disable calculation rows
      setRowSelectionState(rowListCalculation, 'none');
      // Disable score rows
      setRowSelectionState(rowListScoreSetAll, 'none');
      defaultStatusMsg = "Roll the Dice to Start New Turn";
      $("#txtStatusHeader").html(defaultStatusMsg);
    }
    nTurnsTaken++;
    startNewTurn();
  });
// Disable calculation rows
//setRowSelectionState(rowListCalculation, 'none');
});

function rollDice() {
  audioThrowDice.play();
  for(let i = 0; i < 5; i++) {
    let j = i + 1;
    if(!(selectedDice[i])) {
      currentDice[i] = Math.floor(Math.random() * 6) + 1;
      $("#currentDiceImg-" + j).attr("src","images/dice-" + currentDice[i] + ".png");
    }
  }
  // Set lower score values to 0 for consistency with upper scores
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
}

function startNewTurn() {
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
  // END: show game over screen // TODO: add new game function and state
  if(nTurnsTaken == 13) {
    if(userScoreUpperBonus == 35) audioBonus.play();
    alert(`Game Over!\n\nScore: ${userScoreGrandTotal}\n\nRefresh the page to start a new game`);
  }
}
// TODO: check when I'm not sleep-deprived (muiltplying lower scores by 3?)
function updateScorePreviews() {
  let diceSorted = [...currentDice].sort();
  // UPPER SECTION
  findAllUpperScores();
  // LOWER SECTION
  if(findXOfAKind(3)) {
    if(userScoreThreeOfAKind == null) {
      findSumOfAllDice(previewScoreThreeOfAKind, userScoreThreeOfAKind, txtScoreThreeOfAKind);
    }
  }
  if(findXOfAKind(4)) {
    if(userScoreFourOfAKind == null) {
      findSumOfAllDice(previewScoreFourOfAKind, userScoreFourOfAKind, txtScoreFourOfAKind);
    }
  }
  findSmallStraight(diceSorted, userScoreSmallStraight);
  findLargeStraight(diceSorted, userScoreLargeStraight);
  // Yahtzee: score normally unless a previous one was scored as 0
  const findYahtzee = arr => arr.every( v => v === arr[0] );
  if(findYahtzee(currentDice)) {
    audioYahtzee.play();
    nYahtzeeScores++;
    // First yahtzee is worth 50 points
    if( (nYahtzeeScores < 2) && (userScoreYahtzee == null) ) {
      $("#txtScoreYahtzee").html(50);
    } else {
      // Joker if more than 1 yahtzee was scored (sum of all dice scored in 1 of 10 rows)
      findAllUpperScores();
      findSumOfAllDice(previewScoreThreeOfAKind, userScoreThreeOfAKind, txtScoreThreeOfAKind);
      findSumOfAllDice(previewScoreFourOfAKind, userScoreFourOfAKind, txtScoreFourOfAKind);
      // Full house, small straight, and large straight scored with set values
      $("#txtScoreFullHouse").html(25);
      $("#txtScoreSmallStraight").html(30);
      $("#txtScoreLargeStraight").html(40);
    }
  } else {
      // Check for a full house if not Yahtzee (mutually exclusive)
      findFullHouse(diceSorted, userScoreFullHouse);
    }
    findSumOfAllDice(previewScoreChance, userScoreChance, txtScoreChance);
  }

function findAllUpperScores() {
  findSumOfEqualValueDice(previewScoreAces, userScoreAces, 1, txtScoreAces);
  findSumOfEqualValueDice(previewScoreTwos, userScoreTwos, 2, txtScoreTwos);
  findSumOfEqualValueDice(previewScoreThrees, userScoreThrees, 3, txtScoreThrees);
  findSumOfEqualValueDice(previewScoreFours, userScoreFours, 4, txtScoreFours);
  findSumOfEqualValueDice(previewScoreFives, userScoreFives, 5, txtScoreFives);
  findSumOfEqualValueDice(previewScoreSixes, userScoreSixes, 6, txtScoreSixes);
}

function findSumOfEqualValueDice(pScore, uScore, bValue, txtLbl) {
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

function findSumOfAllDice(pScore, uScore, txtLbl) {
  if(uScore == null) {
    txtLbl = txtLbl.id;
    currentDice.forEach((dValue) => {
        pScore = pScore + dValue;
    });
    $('#' + txtLbl).html(pScore);
  }
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
  // UPPER SECTION
  userScoreUpperSubtotal = userScoreAces + userScoreTwos + userScoreThrees
                         + userScoreFours + userScoreFives + userScoreSixes;
  $("#txtScoreUpperSubtotal").html(userScoreUpperSubtotal);
  // Upper Bonus
  if(userScoreUpperSubtotal > 62) {
    userScoreUpperBonus = 35;
  }
  // Upper Total
  userScoreUpperTotal = userScoreUpperSubtotal + userScoreUpperBonus;
  $("#txtScoreUpperTotal").html(userScoreUpperTotal);
  $("#txtScoreUpperBonus").html(userScoreUpperBonus);
  // LOWER SECTION
  userScoreLowerTotal = userScoreThreeOfAKind + userScoreFourOfAKind + userScoreFullHouse
                      + userScoreSmallStraight + userScoreLargeStraight + userScoreYahtzee + userScoreChance;
  $("#txtScoreLowerTotal").html(userScoreLowerTotal);
  // Lower Bonus
  if((nYahtzeeScores > 1) && (userScoreYahtzee > 0)) userScoreYahtzeeBonus = (nYahtzeeScores - 1) * 100;
  $("#txtScoreYahtzeeBonus").html(userScoreYahtzeeBonus);
  // GRAND TOTALS
  userScoreGrandTotal = userScoreLowerTotal + userScoreUpperTotal;
  $("#txtGrandTotalUpper").html(userScoreUpperTotal);
  $("#txtGrandTotalLower").html(userScoreLowerTotal);
  $("#txtGrandTotalFinal").html(userScoreGrandTotal);
}

function updateBonusGoalValue() {
    // Update points needed for upper bonus
  if(userScoreUpperSubtotal < 63) {
    bonusDifference = (userScoreUpperSubtotal - 63) * -1 ;
    $("#txtBonusGoal").html(bonusDifference);
  } else {
    bonusDifference = 0;
    $("#txtBonusGoal").css({
      'color' : '#7fff00',
      'animation' : 'flashText 1.5s linear 3'
    }).html(bonusDifference);
  } 
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

function setRowSelectionState(rowList, rowState) {
  rowList.forEach((setID) => {
    $(setID).css('pointer-events', rowState);
  });
}

/*

Local storage uses key-value pairs
Delete key: localStorage.removeItem(key);
Clear all keys: localStorage.clear();
if(key): check if storage key exists

*/

// If the new score is higher than the stored record or it does not exist then set
function setScoreRecord() {
  if((userScoreGrandTotal > currentHighScore)||(!currentHighScore)) {
    localStorage.setItem("lsHighScore", userScoreGrandTotal);
  }  
}

// If a high score exists then get it and assign to a local variable
function getScoreRecords() {

  if(localStorage.lsHighScore) {
    let currentHighScore = localStorage.getItem("lsHighScore");
  }

}
