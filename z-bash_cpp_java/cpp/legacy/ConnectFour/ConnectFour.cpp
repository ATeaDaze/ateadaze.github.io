/****************************************
 * Connect Four (console version)
 * http://home.comcast.net/~jeffm24
 ***************************************/

#include <iostream>
#include <windows.h>
#include "colors.h"

using namespace std; // standard namespace

void DrawTitle(char, char);
void DrawScreen(char[6][7], char, char);
bool CheckWinner(char[6][7], char);
void SwitchColor(char, char, char);

HANDLE hOut;

int main()
{
    // for console text colors
 	hOut = GetStdHandle(STD_OUTPUT_HANDLE);
 	
	int
	slot, // holds user's slot choice
	coins = 0, // number of coins in use
	x, // array index for coin stacking
	i, j; // loop
	// default symbols for player 1 and 2
	char player1 = '0',   
		 player2 = 'é', // é = ASCII theta
		 currentPlayer;

	bool somebodyWon = false; // winner flag
	
    // the game board is a 6x7 two-dimensional array (x = down / y = right)	
	char gameBoard[6][7] =
	{
		// clear the board
		{' ',' ',' ',' ',' ',' ',' '},
		{' ',' ',' ',' ',' ',' ',' '},
		{' ',' ',' ',' ',' ',' ',' '},
		{' ',' ',' ',' ',' ',' ',' '},
		{' ',' ',' ',' ',' ',' ',' '},
		{' ',' ',' ',' ',' ',' ',' '}
	};
	
	DrawTitle(player1, player2);
	
	// a row index for all 7 slots, this ensures the coins "stack up"
	// always start the first coin on the bottom (6th) row
	int currentRow[7] = {5,5,5,5,5,5,5};

// uncomment for user-defined symbols (no error-checking)	
/*	cout << "Player 1:\nWhich symbol would you like to use? ";
	cin >> player1;
	
	do
	{
		cout << "\nPlayer 2:\nWhich symbol would you like to use? ";
		cin >> player2;
	}
	// team symbols must be different
	while (player1 == player2); // needs more error-checking
	cout << "\n";*/
	
	currentPlayer = player1; // player 1 gets the first turn
	
    SetConsoleTextAttribute(hOut,TXT_WHITE);

	DrawScreen(gameBoard, player1, player2); // draw the board	
	// take turns until somebody wins
	while (!somebodyWon)
	{
        StartTurn:
        // user enters their row of choice
		cout << "\nIt's your turn, ";
		if(currentPlayer==player1)
        {
		 	    SetConsoleTextAttribute(hOut,TXT_GREEN);
		 		cout << "Player " << player1;
		}
		else
        {
            SetConsoleTextAttribute(hOut,TXT_RED);
            cout << "Player " << player2;
        }
		cout << "\n\n";
		SetConsoleTextAttribute(hOut,TXT_WHITE);
		cout << "Enter a column: ";

		// Enter this loop if input fails because of invalid data.
        while ((!(cin >> slot)) || (slot < 1) || (slot > 7) || (currentRow[slot-1] < 1) )
        {
            DrawScreen(gameBoard, player1, player2);
            SetConsoleTextAttribute(hOut,TXT_CYAN);
            cout << "*** ERROR: Enter an available column (1-7)";
            SetConsoleTextAttribute(hOut,TXT_WHITE);
    
            cin.clear ();   // reset the "failure" flag
						cin.ignore (1000,'\n');  // Skip to next newline or 1000 chars, whichever comes first.
                                      // http://www.physicsforums.com/showthread.php?t=206539
            goto StartTurn;
        }
		slot--; // subtract 1 from the chosen row for proper array references
		
		// take a trip down the slot
		for (x = 0; x < 6; x++)
		{
			// if this cell has a coin
			if( (gameBoard[x][slot] == player1) || (gameBoard[x][slot] == player2) )
			{
                // change the index so the coin is inserted above it
				currentRow[slot] = currentRow[slot] - 1;
				break;
			}
		}
		// and insert the coin
 		gameBoard[ currentRow[slot] ][ slot ] = currentPlayer;
		
		coins++; // update the number of coins in use
		DrawScreen(gameBoard, player1, player2);
 		somebodyWon = CheckWinner(gameBoard, currentPlayer); // check for winners

            if(somebodyWon)
	        {
                // identify the winner and set the winner flag to true
                if(currentPlayer == player1)
                {
			    SetConsoleTextAttribute(hOut,TXT_GREEN);	
			    }
                else
			    {
                    SetConsoleTextAttribute(hOut,TXT_RED);	
			    }
 			  cout << "\n*** PLAYER " << currentPlayer << " WINS!\n\n";

			  SetConsoleTextAttribute(hOut,TXT_WHITE);
			  system("pause");

                // clear the game board
				for (i = 0; i <= 5; i++)
				{
					for (j = 0; j <= 6; j++)
					{
					 	gameBoard[i][j] = ' ';
					}
				}
				// display GAME OVER in the cells
				gameBoard[2][1] = 'G';
				gameBoard[2][2] = 'A';
				gameBoard[2][3] = 'M';
				gameBoard[2][4] = 'E';
				gameBoard[3][2] = 'O';
				gameBoard[3][3] = 'V';
				gameBoard[3][4] = 'E';
				gameBoard[3][5] = 'R';
			
                DrawScreen(gameBoard, player1, player2);
                cout << "\n";
                system("pause");
            }

		
		// exit the game if there are no more open slots
		if(coins >= 42)
		{
                 cout << "--- The game has ended in a draw.\n";
                 system("pause");
                 break;
		}
		
		// now it's the other player's turn
		if (currentPlayer == player1) currentPlayer = player2;
		else currentPlayer = player1;
		
	}
	return 0;
}

void DrawScreen(char gb[6][7], char p1, char p2)
{
	int x,y; // row, slot index
	
 	hOut = GetStdHandle(STD_OUTPUT_HANDLE);
	system("cls");
    DrawTitle(p1,p2);

    // print slot numbers for reference
   	SetConsoleTextAttribute(hOut,TXT_WHITE);
	cout << "   1   2   3   4   5   6   7\n";	
	SetConsoleTextAttribute(hOut,TXT_YELLOW);  

	cout << " ÚÄÄÄÂÄÄÄÂÄÄÄÂÄÄÄÂÄÄÄÂÄÄÄÂÄÄÄ¿\n"; // print top row   

	// print middle rows
	for (x = 0; x <= 5; x++)
	{
		cout << " ³ ";
		for (y = 0; y <= 6; y++)
		{
/*		 	if(gb[x][y]==p1) // player 1 coins are green
		 	{
				SetConsoleTextAttribute(hOut,TXT_GREEN);
 			}
			else if(gb[x][y]==p2) // player 2 coins are red
			{
		 		SetConsoleTextAttribute(hOut,TXT_RED);
		   	}
			else
			{
		  	 	SetConsoleTextAttribute(hOut,TXT_WHITE); // reset color
			}*/
            
            SwitchColor(gb[x][y],p1,p2);
            
            		 	
	//		cout << gb[x][y]; // print coin
			SetConsoleTextAttribute(hOut,TXT_YELLOW);
			cout << " ³ "; // divider
		}
	 	SetConsoleTextAttribute(hOut,TXT_WHITE);
		cout << x+1; // print row number
	 	SetConsoleTextAttribute(hOut,TXT_YELLOW);

        // if it's the last row then print the blue base
		if(x==5)
		{
		 		cout  << " \n ÃÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄ´\n ";
			 	SetConsoleTextAttribute(hOut,TXT_BLUE);
				cout << "ÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛ\n";
			 	SetConsoleTextAttribute(hOut,TXT_DRKBLUE);
				cout << " ÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛÛ\n";
		}							
        // otherwise print a regular row
		else
		{
		 	 	 	cout  << " \n ÃÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄÅÄÄÄ´" << endl;
		}
		if(x==5) SetConsoleTextAttribute(hOut, TXT_WHITE); // reset the color for the status text
	}
	
}
void DrawTitle(char p1, char p2)
{    
// this function prints the title menu w/ optional user-defined symbols	 
    cout << " ";
    SwitchColor(p1,p1,p2);
    cout << "---------------------------";
    SwitchColor(p2,p1,p2);
    cout << "\n";
    cout    << " |  C o n n e c t   F o u r  |" << "\n" << " ";
    SwitchColor(p2,p1,p2);
    cout << "---------------------------";
    SwitchColor(p1,p1,p2);
    cout << "\n\n";	
}

bool CheckWinner(char gb[6][7], char suspect)
{
	int x,y, z; // for loops
	int bonusCounter = 0; // number of extra 4-in-a-row wins

	bool winner = false; // called CheckWinner
	
	// HORIZONTAL WIN CHECK
	for (x = 0; x <= 5; x++)
	{
		for (y = 0; y <= 3; y++)
		{
			if (( gb[x][y] == suspect) && ( gb[x][y+1] == suspect) && (gb[x][y+2] == suspect) && ( gb[x][y+3] == suspect))	
			{
			   bonusCounter++;
	  		   if(bonusCounter > 1) cout << "\n*** EXTRA WIN BONUS x" << bonusCounter;
			   else cout << "\n*** HORIZONTAL WIN AT ROW " << x+1;
			   winner=true;
			}
		}
	}
	// VERTICAL WIN CHECK
	for (x = 0; x <= 5; x++)
	{
		for (y = 0; y <= 6; y++)
		{
			if
			((gb[x][y] == suspect) && (gb[x-1][y] == suspect) && (gb[x-2][y] == suspect) && (gb[x-3][y] == suspect))
			{
   	  		   cout << "\n*** VERTICAL WIN AT COLUMN " << y+1;
				winner=true;
			}
		}
	}
	// DIAGONAL WIN CHECK 1
	for (x = 0; x <= 2; x++)
	{
		for (y = 0; y <= 3; y++)
		{
			if
			((gb[x][y] == suspect) && (gb[x+1][y+1] == suspect) && (gb[x+2][y+2] == suspect) && (gb[x+3][y+3] == suspect))
			{
   	  		   cout << "\n*** DIAGONAL WIN AT COLUMNS " << y+1 << "-" << y+4;
				winner=true;
			}
		}
	}
	// DIAGONAL WIN CHECK 2
	for (x = 3; x <= 5; x++)
	{
		for (y = 0; y <= 3; y++)
		{
			if
			((gb[x][y] == suspect) && (gb[x-1][y+1] == suspect) && (gb[x-2][y+2] == suspect) && (gb[x-3][y+3] == suspect))
			{
	 		    cout << "\n*** DIAGONAL WIN AT COLUMNS " << y+1 << "-" << y+4; 		   
				winner=true;
			}
		}
	}
	
// otherwise we're still without a winner
return (winner);
}
void SwitchColor(char px, char p1, char p2)
{
 	hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    if(px==p1) // player 1 coins are green
	{
		SetConsoleTextAttribute(hOut,TXT_GREEN);
 	}
	else if(px==p2) // player 2 coins are red
	{
        SetConsoleTextAttribute(hOut,TXT_RED);
		   	}
	else
	{
        SetConsoleTextAttribute(hOut,TXT_WHITE); // reset color
	}
    cout << px;
    SetConsoleTextAttribute(hOut,TXT_WHITE); // reset color
}

