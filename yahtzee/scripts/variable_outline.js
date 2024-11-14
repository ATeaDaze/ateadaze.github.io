// Current value for each die
let currentDice =  [ 5, 5, 5, 5, 5 ];
// Is die held or unheld
let selectedDice = [ false, false, false, false, false ];
// Rows used *only* for score calculations (never selectable by user)
const rowListCalculation = [ rowUpperSubtotal, rowUpperBonus, rowUpperTotal, rowYahtzeeBonus,
  rowLowerTotal, rowUpperGrandTotal, rowLowerGrandTotal, rowFinalGrandTotal ];
// List of all score rows (disabled on page load)
const rowListScoreSetAll = [ rowAces, rowTwos, rowThrees, rowFours, rowFives, rowSixes,
  rowThreeOfAKind, rowFourOfAKind, rowFullHouse, rowSmallStraight, rowLargeStraight, rowYhatzee, rowChance ];
// Running list of used rows to disable user selection (empty by default)
let rowListScoreSetDisabled = [];
// Save value of previous score
let lastUserScoreSetName = null;
let lastUserScoreRowID = null;
let lastUserScoreValue = null;
// Display score previews shown after each roll
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
// Final scores entered by player when they select a row
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
let bPlayUpperBonusSound = true;
let swapHoldAll = false;
// Status bar text to display instructions depending on game state
let statusBarMessage = "Roll the dice to start playing";
let bonusDifference;

//let userName = "High Score";

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