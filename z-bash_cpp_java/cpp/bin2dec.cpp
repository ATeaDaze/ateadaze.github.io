// Convert a binary number (base2) to decimal (base10)
#include <iostream>
#include <iomanip>
#include <cstring>
// find b to the power of n
double GetPowerOf(int, double);
// draw line separator
void PrintLine();
// portable function to approximate the Windows system("pause") command
void PauseScreen();

// test input = 11000000111001, 0101100101, 1011011111110100110100001000001101
int main()
{
  bool bLineError = false, // flag line if an error is found
       bKeepRunning = false; // return user to prompt instead of exiting
  char binaryStr[128] = { 0 }; // binary string as entered by user
  double currentSum = 0, // current running sum per line
         runningTotal = 0; // running total for each line processed
  int binaryDigit[128] = { 0 }, // binary number as a string of integers
      currentPlace = 0, // index for active place
      places = -1, // total number of places in the binary string
      nErrors = 0, // running total of errors caught
      i; // array index
  // show prompt until input is within range (1-128 digits)
  PromptUser:
  while ( (places > 127) || (places < 0) ) {
    std::cout << "Enter a binary number (ex: 11000000111001)\n> ";
    std::cin >> binaryStr;
    places = strlen(binaryStr) - 1;
  }
  currentPlace = places;
  PrintLine();
  for (i = 0; i <= places; i++) {
    // add each character to an array of integers
    switch (binaryStr[i]) {
      case '1':
        binaryDigit[i] = 1;
        break;
      case '0':
        binaryDigit[i] = 0;
        break;
      // everything else can be tossed out
      default:
        bLineError = true;
        break;
    }
    if (!bLineError) {
      // current digit sum = (current digit value) * 2^(current place)
      currentSum = binaryDigit[i] * GetPowerOf(2, currentPlace);
      // add current digit sum to the running total
      runningTotal = runningTotal + currentSum;
      std::cout << binaryDigit[i] << " x 2^" << currentPlace << " =\t\t" << currentSum << "\t\tLINE " << currentPlace << "\n";
    } else {
      // print error message
      std::cout << "\a<ERROR> " << binaryStr[i] << " is not a binary digit\n";
      // increment error counter
      nErrors++;
      // reset error flag for next line
      bLineError = false;
  }
  currentPlace--;
}
  // output calculated sum of each line unless there are errors or whitespace
  PrintLine();
  if (nErrors == 0) {
    std::cout << "Decimal =\t\t" << runningTotal << "\n";
    PrintLine();
    std::cout << "Total sum of LINES 0 to " << places << "\n";
    if (runningTotal == 12345) std::cout << "#### Achievement Unlocked: Highly Recommended!\n";
    }
  else {
    std::cout << "<ERROR> " << nErrors << " invalid digits entered (" << runningTotal << ")\n";
    }
  PauseScreen();
  return 0;
}

// credit: https://stackoverflow.com/a/58861548
double GetPowerOf(int b, double n)
{
  if (n == 0) return 1;
  return (b * GetPowerOf(b, n - 1));
}

// print 57 ticks and start a new line
void PrintLine()
{
  std::cout << "---------------------------------------------------------\n";
}

// prints message and wait for a newline (enter key press)
void PauseScreen()
{
  std::cin.clear();
  std::cin.ignore();
  do {
    std::cout << '\n' << "Press Enter to continue...: ";
  } while (std::cin.get() != '\n');
}
