// Converts a roman numeral to decimal
#include <iostream>
#include <iomanip>

void PauseScreen();

int main()
{
	// declare variables
	std::string	romanStr; // roman numeral as entered by user
	bool	bErrorCode = 0; // is non-zero unless an error occurs
	int		baseNum[100], // stores value of each place
			total = 0; // running total, stores final value
	int		i, j, // first element and second element
			len;			// length of roman numeral

	// output title screen
	std::cout << ".-------------------------.\n";
	std::cout << "| Roman Numeral Converter |\n";
	std::cout << "'-------------------------'\n";
	// input a roman numeral as a string
	do {
		std::cout << "Enter a roman numeral: ";
		std::cin >> romanStr;
	} while ((romanStr.size() < 1) || (romanStr.size() > 100));
	// determine the numer of characters in the string entered
	len = romanStr.size();

	// go through each character and determine it's value
	for (i = 0; i < len; i++) {
		// convert each roman numeral to upper case
		romanStr[i] = toupper(romanStr[i]);
		switch (romanStr[i]) {
			case 'M': baseNum[i] = 1000; break;
			case 'D': baseNum[i] = 500; break;
			case 'C': baseNum[i] = 100; break;
			case 'L': baseNum[i] = 50; break;
			case 'X': baseNum[i] = 10; break;
			case 'V': baseNum[i] = 5; break;
			case 'I': baseNum[i] = 1; break;
			default:  bErrorCode = 1; break;
			}
		}

	// go through the string 2 characters at a time 
	for (i = 0; i <= len - 2; i++) {
		for (j = i + 1; j <= len - 1; j++) {
			// if the first element is less than the second element
			if (baseNum[i] < baseNum[j]) {
				// find difference of the second and first element, store as first
				baseNum[i] = baseNum[j] - baseNum[i];
				// set other element to zero
				baseNum[j] = 0;
				}
			}
		}

	// combine value of each character to find the final total
	for (i = 0; i < len; i++) {
		// add each value to running total
		total += baseNum[i];
		}

	// catch any invalid input
	if (bErrorCode == 1) {
		std::cout << "\nError: Invalid Input\n";
		}	
	// otherwise output the final value
	else {
		std::cout << "\n" << romanStr << " = " << total << "\n";
		}
	PauseScreen();
	return 0;
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
