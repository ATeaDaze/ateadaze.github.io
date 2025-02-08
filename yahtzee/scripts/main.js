/* TODO: separate JS into several files, clean up variables, refactor large checks, 
  # GAME FLOW
  [X] [TESTING] Use objects for scores instead of 2 separate variable sets
  [ ] Add new game button and track states
  [ ] Clean up the score selection function (ugly case statement / activeRow and activeSet redundancies)

  # KEYBOARD INPUT
  [ ] Fix getKeyboardInput so it uses existing checks
    - [WIP] Add a  hold/unhold all dice button
    - [WIP] Hotkey added (has bugs)

  # QUALITY OF LIFE
  [ ] Find a more elegant solution for entering scores
    [ ] A confirmation box would suffice
  [ ] Add outline or CSS filter to make valid score rows stand out more */
let currentDice =  [ 5, 5, 5, 5, 5 ];
let selectedDice = [ false, false, false, false, false ];
// Rows used *only* for score calculations (never selectable by user)
const rowListCalculation = [ rowUpperSubtotal, rowUpperBonus, rowUpperTotal, rowYahtzeeBonus,
  rowLowerTotal, rowUpperGrandTotal, rowLowerGrandTotal, rowFinalGrandTotal ];
// List of all score rows (disabled on page load)
const rowListScoreSetAll = [ rowAces, rowTwos, rowThrees, rowFours, rowFives, rowSixes,
  rowThreeOfAKind, rowFourOfAKind, rowFullHouse, rowSmallStraight, rowLargeStraight, rowYahtzee, rowChance ];
// Running list of used rows to disable user selection (empty by default)
let rowListScoreSetDisabled = [];
// Save value of previous score
let lastUserScoreSetName = null;
let lastUserScoreRowID = null;
let lastUserScoreValue = null;
// Upper scores
let aces  = { preview: 0, score: null };
let twos  = { preview: 0, score: null };
let threes = { preview: 0, score: null };
let fours  = { preview: 0, score: null };
let fives  = { preview: 0, score: null };
let sixes  = { preview: 0, score: null };
// Lower scores
let threeOfAKind = { preview: 0, score: null };
let fourOfAKind = { preview: 0, score: null };
let fullHouse = { preview: 0, score: null };
let smallStraight = { preview: 0, score: null };
let largeStraight = { preview: 0, score: null };
let yahtzee = { preview: 0, score: null };
let chance = { preview: 0, score: null };
// Sub and grand totals
let upperSubtotal = 0;
let upperBonus = 0;
let upperTotal = 0;
let yahtzeeBonus = 0;
let lowerTotal = 0;
let grandTotal = 0;
// Track number of yahtzees for bonus multiplier
let nYahtzeeScores = 0;
let nRollsLeft = 3;
let nTurnsTaken = 0;
let bIsKeyboardEnabled = true;
let bNewScoreAdded = false;
let bPlayUpperBonusSound = true;
let bEnableConfirmation = false;
let swapHoldAll = false;
// Status bar text to display instructions depending on game state
let statusBarMessage = "Roll the dice to start playing";
let bonusDifference;
let testScore;
let bLocalStorageOK = true;
let playerName = "Player";
let previewRowTxt;
// Active set info used on row selection: has global scope (need to test this with limited scope)
var activeSetName;
// Audio objects for SFX
const audioHold = new Audio("audio/dice_hold.ogg");
const audioUnhold = new Audio("audio/dice_unhold.ogg");
const audioThrowDice = new Audio("audio/throw_5_dice.ogg");
const audioFillScore = new Audio("audio/fill_score.ogg");
const audioYahtzee = new Audio("audio/yahtzee.ogg");
const audioYahtzeeBonus = new Audio("audio/yahtzee_applause.ogg");
const audioUpperBonus = new Audio("audio/bonus_upper.ogg");
const audioNewHighScore = new Audio("audio/new_highscore.ogg");

// Wait for document to load, update number of turns left, and check for keyboard input
$(document).ready(function() {
  updateTurns();
  updateConfigText();
  getKeyboardInput();

  $("#txtHighScore").click(function() {
    clearHighScore();
  });
  $("#txtPlayerName").click(function() {
    setPlayerName();
  });

  // Disable all rows and roll button
  setRowSelectionState(rowListScoreSetAll, 'none');
  setRowSelectionState(rowListCalculation, 'none');
  disableDiceButtons();
  $("#txtStatusHeader").html(statusBarMessage);

  // Display the all-time high score if it exists in local storage
  try {
    testScore = localStorage.getItem("lsHighScore");
  } catch(e) {
    if(e.name == "NS_ERROR_FILE_CORRUPTED") {
      $("#txtStatusHeader").html("ERROR: browser storage corrupted").css({
        'color' : '#ff5555',
        'animation' : 'flashText 1.5s linear infinite'
      });
      $("#txtHighScoreLead, #txtHighScore, #txtPlayerName").html("---");
      bLocalStorageOK = false;
    }
  }

  if(bLocalStorageOK) {
      if(localStorage.getItem("lsHighScore")) {
        $("#txtHighScore").html(testScore);
        $("#txtPlayerName").html(localStorage.lsPlayerName);
      } else {
        $("#txtHighScore").html("0");
      }
  }

      // Add player name for high scores
//    playerName = localStorage.getItem("lsUserName");
//    $("#txtPlayerName").html(localStorage.lsUserName);

  // START: main gameplay loop triggered by [Roll Dice] button
  $("#btnRoll").click(function() {
    updateGameState();
    if(!bLocalStorageOK) {
      $("#txtStatusHeader").css({
        'color':'dodgerblue'
      });
    }
  });

  $("#txtConfig").click(function() {
    toggleScoreConfirmation();
  });

  // Hold or release dice when clicked and update style
  $("[id^=currentDiceImg-]").click(function() {
    let activeDie = $(this).closest('td').index();
    if(selectedDice[activeDie]) {
      audioHold.play();
      selectedDice[activeDie] = false;
      // Update hold all states
      swapHoldAll = false;
      $(this)
        .removeClass("diceButtonSelected")
        .addClass("diceButton");
    } else {
      audioUnhold.play();
      selectedDice[activeDie] = true;
      swapHoldAll = true;
      $(this)
        .removeClass("diceButton")
        .addClass("diceButtonSelected");
    }
  });

  // Select a score based on the row clicked by the player
  $("[id^=row]").on("click", function() {
    // Enable calculation rows so they can be updated
    setRowSelectionState(rowListCalculation, 'auto');
    // Get IDs of row and cell clicked by player
    let activeRow = $(this).closest('tr');
    let activeCell = $(this).closest('tr').children('td:nth-child(2)');
    let activeRowID = this.id;
    previewRowTxt = $(activeCell).text();
    previewRowTxt = parseInt(previewRowTxt);
    activeSetName = activeRowID.replace("row", "").toLowerCase();
    console.log(`activeRowID=${activeRowID}, previewRowTxt=${previewRowTxt}`);

    // TODO: change this to an element or dialog
    if(bEnableConfirmation) {
      if( confirm(`Enter score for ${previewRowTxt} points?`) ) {
        enterNewScore();
      }
    } else {
      enterNewScore();
    }

    // Update table if a score is submitted
    if(bNewScoreAdded) {
      audioFillScore.play();
      // TODO: add [UNDO] button, only allowed on if there are 3 turns left
      $(activeRow).addClass("usedRow");
      // Add row to running list so it can't be clicked on subsequent turns
      rowListScoreSetDisabled.push(activeRow);
      // Disable calculation and score rows after updating them
      setRowSelectionState(rowListCalculation, 'none');
      setRowSelectionState(rowListScoreSetAll, 'none');
      $("#txtStatusHeader").html("Roll again to start a new turn");
      // Disable roll button and all dice after turn
      bIsKeyboardEnabled = false;
      disableDiceButtons();
      // Unselect all dice
      selectedDice = [false, false, false, false, false];
      $("[id^=currentDiceImg-").removeClass("diceButtonSelected");
    }
    nTurnsTaken++;
    startNewTurn();
  });

});

// There is definitely a more elegant solution to
// Temporary workaround: a stupid confirmation box
function enterNewScore() {
  switch(activeSetName) {
    case "aces":
      aces.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "twos":
      twos.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "threes":
      threes.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "fours":
      fours.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "fives":
      fives.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "sixes":
      sixes.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "threeofakind":
      threeOfAKind.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "fourofakind":
      fourOfAKind.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "fullhouse":
      fullHouse.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "smallstraight":
      smallStraight.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "largestraight":
      largeStraight.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "yahtzee":
      yahtzee.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    case "chance":
      chance.score = previewRowTxt;
      bNewScoreAdded = true;
      break;
    default:
      // How did I end up here?
      console.log(`This should not happen:\nactiveSetName = ${activeSetName}`);
      break;
  }
}

function updateGameState() {
  bIsKeyboardEnabled = true;
  enableDiceButtons();
  // Enable all score rows and disable *only* used rows
  setRowSelectionState(rowListScoreSetAll, 'auto');
  setRowSelectionState(rowListScoreSetDisabled, 'none');
  rollDice();
  // Update instructions for each roll
  if(nRollsLeft == 2) {
    statusBarMessage = "Roll again or select a score";
  }
  if(nRollsLeft < 1) {
    bIsKeyboardEnabled = false;
    disableRollButton();
    disableDiceButtons();
    // Remove selected style on last turn
    $("[id^=currentDiceImg-").removeClass("diceButtonSelected");
    bIsKeyboardEnabled = false;
    statusBarMessage = "Select a score from the table";
  }
  $("#txtStatusHeader").html(statusBarMessage);
}

// TODO: find a better solution for animations without using setTimeout()
// POSSIBLE FIX: remove/add table cells and dice images on each roll
function rollDice() {
  audioThrowDice.play();
  for(let i = 0; i < 5; i++) {
    let j = i + 1;
    if(!(selectedDice[i])) {
      // Add spin animation for 250ms and then remove it
      $("#currentDiceImg-" + j).addClass("diceButtonAnimate");
      setTimeout(() => {
        $("#currentDiceImg-" + j).removeClass("diceButtonAnimate");
      }, 250);
      // Select random die for each slot
      currentDice[i] = Math.floor(Math.random() * 6) + 1;
      $("#currentDiceImg-" + j).attr("src","images/dice-" + currentDice[i] + ".png");
    }
  }
  // Set lower score values to 0 for consistency with upper scores, TODO: find a cleaner way to check these values
  if(threeOfAKind.score == null) $("#txtScoreThreeOfAKind").html(0);
  if(fourOfAKind.score == null) $("#txtScoreFourOfAKind").html(0);
  if(fullHouse.score == null) $("#txtScoreFullHouse").html(0);
  if(smallStraight.score == null) $("#txtScoreSmallStraight").html(0);
  if(largeStraight.score == null) $("#txtScoreLargeStraight").html(0);
  if(yahtzee.score == null) $("#txtScoreYahtzee").html(0);
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
    $("#currentDiceImg-" + i).removeClass("diceButtonSelected");
  }
  enableRollButton();
  updateTotalScores();
  updateTurns();
  // END: show game over screen
  if(nTurnsTaken == 13) {
    if(upperBonus == 35) {
      audioUpperBonus.play();
      highlightText("#txtScoreUpperBonus");
    }

    if(nYahtzeeScores > 1) {
      audioYahtzeeBonus.play();
      highlightText("#txtScoreYahtzeeBonus");
    }    
    disableRollButton();
    $("#txtStatusHeader").html("GAME OVER");
    // Update grand total style to highlight it
    $("#rowFinalGrandTotal").css({
      'color' : 'orchid'
    });
    setScoreRecord();
  }
}

function updateScorePreviews() {
  // Sort dice numerically for simpler comparisons
  let diceSorted = [...currentDice].sort();
  // UPPER SECTION
  findAllUpperScores();
  // LOWER SECTION, TODO: combine findXOfAkind(x) and userScoreX == null
  if(findXOfAKind(3)) {
    if(threeOfAKind.score == null) {
      findSumOfAllDice(threeOfAKind.preview, threeOfAKind.score, txtScoreThreeOfAKind);
    }
  }
  if(findXOfAKind(4)) {
    if(fourOfAKind.score == null) {
      findSumOfAllDice(fourOfAKind.preview, fourOfAKind.score, txtScoreFourOfAKind);
    }
  }
  findSmallStraight(diceSorted, smallStraight.score);
  findLargeStraight(diceSorted, largeStraight.score);
  // Yahtzee: score normally unless a previous one was scored as 0
  const findYahtzee = arr => arr.every( v => v === arr[0] );
  if(findYahtzee(currentDice)) {
    audioYahtzee.play();
    nYahtzeeScores++;
    // First yahtzee is worth 50 points
    if( (nYahtzeeScores < 2) && (yahtzee.score == null) ) {
      $("#txtScoreYahtzee").html(50);
    } else {
      // Joker if more than 1 yahtzee was scored (sum of all dice scored in 1 of 10 rows)
      audioYahtzeeBonus.play();
      findAllUpperScores();
      findSumOfAllDice(threeOfAKind.preview, threeOfAKind.score, txtScoreThreeOfAKind);
      findSumOfAllDice(fourOfAKind.preview, fourOfAKind.score, txtScoreFourOfAKind);
      // Full house, small straight, and large straight are scored with fixed values
      $("#txtScoreFullHouse").html(25);
      $("#txtScoreSmallStraight").html(30);
      $("#txtScoreLargeStraight").html(40);
    }
  } else {
    // Check for a full house if not Yahtzee (mutually exclusive)
    findFullHouse(diceSorted, fullHouse.score);
  }
  findSumOfAllDice(chance.preview, chance.score, txtScoreChance);

}

function findSumOfEqualValueDice(pScore, uScore, bValue, txtLbl) {
  if(uScore == null) {
    txtLbl = txtLbl.id;
    currentDice.forEach((dValue) => {
      if(dValue == bValue) pScore = pScore + bValue;
    });
    $('#' + txtLbl).html(pScore)
    // TODO: highlight valid upper scores
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

// Source: https://ubuntuforums.org/showthread.php?t=1913896
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
  if(nMatches == x) {
    return(true);
  }
}

// There is definitely a better way to check these (tried loops but it counted duplicate matches)
function findFullHouse(dS, uS) {
if(uS == null) {
    if( ((dS[0] == dS[1]) && (dS[2] == dS[3]) && (dS[3] == dS[4])) ||
        ((dS[0] == dS[1]) && (dS[1] == dS[2]) && (dS[3] == dS[4])) ) {        
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

function findAllUpperScores() {
  findSumOfEqualValueDice(aces.preview, aces.score, 1, txtScoreAces);
  findSumOfEqualValueDice(twos.preview, twos.score, 2, txtScoreTwos);
  findSumOfEqualValueDice(threes.preview, threes.score, 3, txtScoreThrees);
  findSumOfEqualValueDice(fours.preview, fours.score, 4, txtScoreFours);
  findSumOfEqualValueDice(fives.preview, fives.score, 5, txtScoreFives);
  findSumOfEqualValueDice(sixes.preview, sixes.score, 6, txtScoreSixes);
}

function updateTotalScores() {
  // UPPER SECTION
  upperSubtotal = aces.score + twos.score + threes.score
                         + fours.score + fives.score + sixes.score;
  $("#txtScoreUpperSubtotal").html(upperSubtotal);
  // Upper Bonus: play bonus SFX one time
  if((upperSubtotal > 62) && (bPlayUpperBonusSound)) {
//    audioUpperBonus.play();
    upperBonus = 35;
    bPlayUpperBonusSound = false;
    //$("#txtHighScore").html("0");
    highlightText("#txtScoreUpperBonus");
  }
  // Upper Total
  upperTotal = upperSubtotal + upperBonus;
  $("#txtScoreUpperTotal").html(upperTotal);
  $("#txtScoreUpperBonus").html(upperBonus);
  // Yahtzee bonus(es)
  if((nYahtzeeScores > 1) && (yahtzee.score > 0)) {
    yahtzeeBonus = (nYahtzeeScores - 1) * 100;
  }
  // LOWER SECTION
  lowerTotal = threeOfAKind.score + fourOfAKind.score + fullHouse.score + smallStraight.score
             + largeStraight.score + yahtzee.score + chance.score + yahtzeeBonus;
  $("#txtScoreLowerTotal").html(lowerTotal);
  $("#txtScoreYahtzeeBonus").html(yahtzeeBonus);
  // GRAND TOTALS
  grandTotal = lowerTotal + upperTotal;
  $("#txtGrandTotalUpper").html(upperTotal);
  $("#txtGrandTotalLower").html(lowerTotal);
  $("#txtGrandTotalFinal").html(grandTotal);
}

function updateTurns() {
  $("#btnRoll").html("ROLL DICE (" + nRollsLeft + " left)");
}

function toggleScoreConfirmation() {
  if(bEnableConfirmation) {
    bEnableConfirmation = false;
  } else {
    bEnableConfirmation = true;
  }
  updateConfigText()
}

function updateConfigText() {
  if(bEnableConfirmation) {
    $("#txtConfig").html("🟩 Enabled");
  } else {
    $("#txtConfig").html("🟥 Disabled");
  }
}

function highlightText(txt) {
  $(txt).css({
    'color' : 'cyan',
    'animation' : 'flashText 1.5s linear infinite'
  });
}

// BUG: dice can be selected before rolling on 1st turn, TODO: combine this with the JQuery selector
function getKeyboardInput() {
  document.addEventListener('keypress', e => {
    // TODO: combine or integrate with onclick function
    // Set key name and index (index is offset by -1 as it's an array)
    if(bIsKeyboardEnabled) {
      let keyName = e.key;
      let keyIndex = e.key - 1;
      let cellID = "#currentDiceImg-" + keyName;
      // Toggle held dice when keys [1] to [5] are pressed
      if(nRollsLeft != 3) {
        if(selectedDice[keyIndex]) {
          selectedDice[keyIndex] = false;
          $(cellID)
            .removeClass("diceButtonSelected")
            .addClass("diceButton");
//          swapHoldAll = false;
        } else {
          selectedDice[keyIndex] = true;
          $(cellID)
            .removeClass("diceButton")
            .addClass("diceButtonSelected");
//          swapHoldAll = true;
        }
        // Hold all if 1+ die selected
        if(selectedDice.includes(true)) swapHoldAll = true;
        // TODO: everything is a mess, clean up and error checking
        if(keyName == "h") {
          if(swapHoldAll) {
            swapHoldAll = false;
            audioHold.play();
            $("[id^=currentDiceImg-]")
              .removeClass("diceButtonSelected")
              .addClass("diceButton");
          } else {
            swapHoldAll = true;
            audioUnhold.play();
            $("[id^=currentDiceImg-]")
              .removeClass("diceButton")
              .addClass("diceButtonSelected");
          }
          selectedDice = [ swapHoldAll, swapHoldAll, swapHoldAll, swapHoldAll, swapHoldAll ]
        }

      }

      // Roll dice when [R] is pressed (needs more testing)
      if(keyName == "r") updateGameState();

      // Disable keybinds if player has rolled 3 times
      if(nRollsLeft < 1) {
        disableRollButton();
        disableDiceButtons();
        bIsKeyboardEnabled = false;
      }
    }
  });
}

function disableRollButton() {
  $("#btnRoll")
    .removeClass("enabledButton")
    .addClass("disabledButton")
    .prop("disabled", true);
}

function enableRollButton() {
  $("#btnRoll")
    .removeClass("disabledButton")
    .addClass("enabledButton")
    .prop("disabled", false);
}
// Enabling and disabling with prop seems to conflict with pointer-events
function disableDiceButtons() {
  $("[id^=currentDiceImg-]")
    .removeClass("diceButton")
    .addClass("diceButtonDisabled")
//    .prop("disabled", true);
}

function enableDiceButtons() {
  $("[id^=currentDiceImg-]")
    .removeClass("diceButtonDisabled")
    .addClass("diceButton")
//    .prop("disabled", false);
}

function setRowSelectionState(rowList, rowState) {
  rowList.forEach((setID) => {
    $(setID).css('pointer-events', rowState);
  });
}

// TODO: fix NS_FILE error, add player name prompt, use a proper CSS-formatted toast message instead of alert
function setScoreRecord() {
  // if(bLocalStorageOK) {
    let currentHighScore = localStorage.getItem("lsHighScore");
  // Set local storage score if it does not exist
    if(!localStorage.lsHighScore) {
      localStorage.setItem("lsHighScore", grandTotal);
      $("#txtHighScore").html(grandTotal);
  //    $("#txtPlayerName").html(userName);
    } else {
      // Update high score and flash cell if new high score is reached
      if(grandTotal > currentHighScore) {
        audioNewHighScore.play();
        localStorage.setItem("lsHighScore", grandTotal);
          $("#txtHighScore").css({
            'color' : 'cyan',
            'animation' : 'flashText 1.5s linear infinite'
          }).html(grandTotal);
        $("#txtStatusHeader").html("NEW HIGH SCORE");
      }
    }
  // }
}

function setPlayerName() {
  playerName = prompt("Enter name:", "Player");
  localStorage.setItem("lsPlayerName", playerName);
  $("#txtPlayerName").html(playerName);
}

// Reset high score with confirmation
function clearHighScore() {
  let r = confirm("Clear high score?");
  if (r) {
    localStorage.removeItem("lsHighScore");
//    localStorage.removeItem("lsUserName");
    $("#txtHighScore").html(0);
//    $("#txtHighScoreLead").html("High Score");
  }
}
