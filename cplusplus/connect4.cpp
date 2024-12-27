// Connect Four (CLI) | jeffm24@comcast.net
// Tested with: Linux (GCC), Microsoft Visual Studio (Windows 10)
#include <iostream>
#include <cstring>

// print title screen with alternating player symbols
void PrintTitle(char, char);
// draw current game board
void PrintGameBoard(char[6][7], char, char, int, int);
// draw brackets around the last slot used
void PrintColumnBracket(int);
// approximates the Windows system("pause") command
void PauseScreen();
// check gameBoard for 4-in-a-row matches: 1 horizontal, 1 vertical, and 2 diagonal checks
bool CheckForWinners(char[6][7], char);

// print game board and prompt currentPlayer for a valid slot number
int main()
{
  char gameBoard[6][7]; // the game board is a two-dimensional array of characters (6x7)
  int  currentRow[7] = { 5, 5, 5, 5, 5, 5, 5 }, // current row index for the 7 slots // start 1st chip on the 6th row (bottom)
       currentSlot = -1, // user-defined slot number (0 to 6)
       previousSlot = -1, // last slot picked by a player
       nChipsUsed = 0, // running total of chips used by both players
       x, // array index for chip stacking
       i, j; // loops
  char player1 = 'X', // set the default symbol for player 1
       player2 = 'O', // and player 2
       currentPlayer = player1; // player 1 gets the first turn
  bool bSomebodyWon = false; // a new game has no winner by default

   // clear game board: replace each cell in the 6x7 character array with whitespace
  for (i = 0; i <= 5; i++) {
    for (j = 0; j <= 6; j++) {
      gameBoard[i][j] = ' ';
    }
  }
  // draw title screen with alternating player chips
  PrintTitle(player1, player2);
  // draw game board with current chips
  PrintGameBoard(gameBoard, player1, player2, previousSlot, currentSlot);
  // take turns until somebody won
  while (!bSomebodyWon) {
    // prompt current player for a slot
    StartTurn:
    std::cout << "It's your turn, " << currentPlayer;
    std::cout << "\n\nChoose a slot (1 to 7): ";
    // throw out an error if user input is invalid or out of range
    while ( (!(std::cin >> currentSlot)) || ( currentSlot < 1 ) || ( currentSlot > 7 ) || (currentRow[currentSlot - 1] < 1) ) {
      std::cout << "\a\n<ERROR> INVALID INPUT: " << currentSlot << "\n";
      std::cout << "Enter an available slot (1 to 7)\n";
      PauseScreen();
      std::cout << "\n\n";
      PrintTitle(player1, player2);
      PrintGameBoard(gameBoard, player1, player2, previousSlot, currentSlot);
      goto StartTurn;
    }
    // subtract 1 from the chosen row for proper array references
    currentSlot--;
    // take a trip down the slot
    for (x = 0; x < 6; x++) {
      // if this cell has a chip
      if (gameBoard[x][currentSlot] != ' ') {
        // decrease currentRow index by 1 (to insert a chip above it)
        currentRow[currentSlot] = currentRow[currentSlot] - 1;
        break;
      }
    }
    // insert the chip
    gameBoard[ currentRow[currentSlot] ][ currentSlot ] = currentPlayer;
    // increment chips in-use by 1 (turn counter)
    nChipsUsed++;
    PrintTitle(player1, player2);
    PrintGameBoard(gameBoard, player1, player2, previousSlot, currentSlot);
    // check the game board for 4-in-a-row wins (4 checks)
    bSomebodyWon = CheckForWinners(gameBoard, currentPlayer);
    if (bSomebodyWon) {
      // display the winner with leading 4 leading chips
      std::cout << "\n" << currentPlayer << currentPlayer << currentPlayer << currentPlayer;
      std::cout << " WINNER (" << nChipsUsed << " turns) ";
      std::cout << currentPlayer << currentPlayer << currentPlayer << currentPlayer << "\n";
      PauseScreen();
    }
    // exit game if there are no more open slots (nRows x nSlots = 6 x 7 = 42)
    if (nChipsUsed >= 42) {
      std::cout << "~~~~ The game has ended in a draw!\n";
      PauseScreen();
      break;
    }
    // take turns (simple switch)
    if (currentPlayer == player1) currentPlayer = player2;
    else currentPlayer = player1;
    previousSlot = currentSlot;
  }
  return 0;
}

void PrintGameBoard(char gb[6][7], char p1, char p2, int lastSlt, int slt)
{
  int x, y; // index for looping: x=row, y=slot
  // add a newline after each turn
  std::cout << "\n";
  // draw the column arrow if at least 1 move has been made
  if (slt > -1) PrintColumnBracket(slt);
  // if slot entered is not 1-7 then use the last slot to draw the brackets
  if ((slt < 0) || (slt > 6)) PrintColumnBracket(lastSlt);
  // print the top row of the board
  std::cout <<     " .---.---.---.---.---.---.---.\n";
  // print middle rows
  for (x = 0; x <= 5; x++) {
    // print cell: left divider (3 char), cell value (1 char), right divider (3 char)
    std::cout << " | "; // left divider
    for (y = 0; y <= 6; y++) {
      std::cout << gb[x][y]; // output cell value
      std::cout << " | "; // right divider
    }
    // print row number at the end of the board (right side)
    std::cout << x + 1 << " \n ";
    // print a standard row with edges unless it's the last (6th) row
    if (x != 5) {
      std::cout <<  "|---|---|---|---|---|---|---|\n";
      }
    // otherwise print the base
    else {
      std::cout <<  "|---|---|---|---|---|---|---|\n";
      std::cout << ".=============================.\n";
      std::cout << "|_____________________________|\n";
    }
  }
}

// draw title screen with alternating player chips
void PrintTitle(char p1, char p2)
{
  std::cout << " "; // add leading blank space for text alignment
  // print title with alternating p1 and p2 chips at the 4 corners
  std::cout << p1 << "---------------------------" << p2 << "\n";
  std::cout <<   " |  C o n n e c t   F o u r  |" << "\n" << " ";
  std::cout << p2 << "---------------------------" << p1;
}

// draw a bracket around the most recently-used slot
void PrintColumnBracket(int activeSlot)
{
  switch (activeSlot) {
      // print slot numbers without brackets if no moves made
      case -1: std::cout << "   1   2   3   4   5   6   7"; break;
      // print brackets around slot number if it's valid
      case 0:  std::cout << "  [1]  2   3   4   5   6   7"; break;
      case 1:  std::cout << "   1  [2]  3   4   5   6   7"; break;
      case 2:  std::cout << "   1   2  [3]  4   5   6   7"; break;
      case 3:  std::cout << "   1   2   3  [4]  5   6   7"; break;
      case 4:  std::cout << "   1   2   3   4  [5]  6   7"; break;
      case 5:  std::cout << "   1   2   3   4   5  [6]  7"; break;
      case 6:  std::cout << "   1   2   3   4   5   6  [7]"; break;
    }
  std::cout << "\n";
}

// print message and wait for a newline (enter key press)
void PauseScreen()
{
  std::cin.clear();
  std::cin.ignore();
  do {
    std::cout << '\n' << "Press Enter to continue...: ";
  } while (std::cin.get() != '\n');
}

// check current slot index (suspect) and 3 adjacent cells for 4-in-a-row matches
bool CheckForWinners(char gb[6][7], char suspect)
{
  int xRow, yCol; // used for check loops
  bool bWinnerFound = false; // assume nobody won if this function is being called
//            --- Array diagram with coordinates availble at EOF ---
  /* [0][1][2][3]  HORIZONTAL WIN = { [x][y], [x][y+1], [x][y+2], [x][y+3] }
     [ ][ ][ ][ ]
     [ ][ ][ ][ ]
     [ ][ ][ ][ ] */
  for (xRow = 0; xRow <= 5; xRow++) {
    for (yCol = 0; yCol <= 3; yCol++) {
      if ((gb[xRow][yCol] == suspect) && (gb[xRow][yCol + 1] == suspect) && (gb[xRow][yCol + 2] == suspect) && (gb[xRow][yCol + 3] == suspect)) {
        std::cout << "\n---- HORIZONTAL WIN AT ROW " << xRow + 1;
        bWinnerFound = true;
      }
    }
  }
  /* [0][ ][ ][ ]  VERTICAL WIN = { [x][y], [x-1][y], [x-2][y], [x-3][y] }
     [1][ ][ ][ ]
     [2][ ][ ][ ]
     [3][ ][ ][ ] */
  for (xRow = 0; xRow <= 5; xRow++) {
    for (yCol = 0; yCol <= 6; yCol++) {
      if ((gb[xRow][yCol] == suspect) && (gb[xRow - 1][yCol] == suspect) && (gb[xRow - 2][yCol] == suspect) && (gb[xRow - 3][yCol] == suspect)) {
        std::cout << "|||| VERTICAL WIN AT COLUMN " << yCol + 1;
        bWinnerFound = true;
      }
    }
  }
  /* [0][ ][ ][ ]  DIAGONAL WIN (DOWN) = { [x][y], [x+1][y+1], [x+2][y+2], [x+3][y+3] }
     [ ][1][ ][ ]
     [ ][ ][2][ ]
     [ ][ ][ ][3] */
  for (xRow = 0; xRow <= 2; xRow++) {
    for (yCol = 0; yCol <= 3; yCol++) {
      if ((gb[xRow][yCol] == suspect) && (gb[xRow + 1][yCol + 1] == suspect) && (gb[xRow + 2][yCol + 2] == suspect) && (gb[xRow + 3][yCol + 3] == suspect)) {
        std::cout << "\n\\\\\\\\ DIAGONAL WIN AT COLUMNS " << yCol + 1 << "-" << yCol + 4;
        bWinnerFound = true;
      }
    }
  }
  /* [ ][ ][ ][3]  DIAGONAL WIN (UP) = { [x][y], [x-1][y+1], [x-2][y+2], [x-3][y+3] }
     [ ][ ][2][ ]
     [ ][1][ ][ ]
     [0][ ][ ][ ] */
  for (xRow = 3; xRow <= 5; xRow++) {
    for (yCol = 0; yCol <= 3; yCol++) {
      if ((gb[xRow][yCol] == suspect) && (gb[xRow - 1][yCol + 1] == suspect) && (gb[xRow - 2][yCol + 2] == suspect) && (gb[xRow - 3][yCol + 3] == suspect)) {
        std::cout << "\n\\\\\\\\ DIAGONAL WIN AT COLUMNS " << yCol + 1 << "-" << yCol + 4;
        bWinnerFound = true;
      }
    }
  }
  // returns true if a winning match is found
  return(bWinnerFound);
}

/* Array diagram: char gameBoard[6][7],
             gb[x][y]
       [y]

  0   1   2   3   4   5   6
┌───┬───┬───┬───┬───┬───┬───┐
│0,0│0,1│0,2│0,3│0,4│0,5│0,6│ 0
├───┼───┼───┼───┼───┼───┼───┤
│1,0│1,1│1,2│1,3│1,4│1,5│1,6│ 1
├───┼───┼───┼───┼───┼───┼───┤
│2,0│2,1│2,2│2,3│2,4│2,5│2,6│ 2
├───┼───┼───┼───┼───┼───┼───┤   [x]
│3,0│3,1│3,2│3,3│3,4│3,5│3,6│ 3
├───┼───┼───┼───┼───┼───┼───┤
│4,0│4,1│4,2│4,3│4,4│4,5│4,6│ 4
├───┼───┼───┼───┼───┼───┼───┤
│5,0│5,1│5,2│5,3│5,4│5,5│5,6│ 5
├───┼───┼───┼───┼───┼───┼───┤
█████████████████████████████ */
