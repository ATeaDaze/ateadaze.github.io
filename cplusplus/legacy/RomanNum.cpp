// PROGRAM: Roman Numeral Converter
// --------
// DESCRIPTION: converts a roman-numeral to a decimal.

#include <iostream>
#include <iomanip>

using namespace std; // introduces standard namespace;

int main()
{
// declare variables
string		romanStr;		// roman numeral as entered by user

bool		errorCode;		// is non-zero unless an error occurs

long int	baseNum[100],	// stores value of each place
			total=0;		// running total, stores final value

int			i,				// first element
			j,				// second element
			len;			// length of roman numeral

// output title screen
cout <<
     ".-------------------------." << endl <<
     "| Roman Numeral Converter |" << endl <<
     "'-------------------------'" << endl;
	// input a roman numeral as a string
	do
	{
	cout << "Enter a roman numeral: ";
	cin >> romanStr;
	}
	while((romanStr.size() < 1)||(romanStr.size() > 100));

// determine the numer of characters in the string entered
len = romanStr.size();

	// go through each character and determine it's value
	for(i=0; i<len; i++)
	{

	// convert each roman numeral to lower case
	romanStr[i] = tolower(romanStr[i]);

		switch(romanStr[i])
		{
		case 'm':
			baseNum[i] = 1000;
			break;
		case 'd':
			baseNum[i] = 500;
			break;
		case 'c':
			baseNum[i] = 100;
			break;
		case 'l':
			baseNum[i] = 50;
			break;
		case 'x':
			baseNum[i] = 10;
			break;
		case 'v':
			baseNum[i] = 5;
			break;
		case 'i':
			baseNum[i] = 1;
			break;
		default:
			// an error has occured
			errorCode = 1;
			break;
		}

	}

	// go through the string 2 characters at a time 
	for(i=0; i<=len-2; i++)
	{
		for(j=i+1; j<=len-1; j++)
		{
 			// if the first element is less than the second element
			if(baseNum[i] < baseNum[j])
			{
			// find difference of the second and first element, store as first
			baseNum[i] = baseNum[j] - baseNum[i];;
			// set other element to zero
  			baseNum[j] = 0;
			}
		}
	}

	// combine value of each character to find the final total
	for(i=0; i<len; i++)
	{
	// add each value to running total
	total += baseNum[i];
	// convert original string to upper case
	romanStr[i] = toupper(romanStr[i]); 
	}

	// catch any invalid input
	if(errorCode==1)
	{
	cout << endl << "Error: Invalid Input" << endl;
	}
	// otherwise output the final value
	else
	{
	cout << endl << romanStr << " = " << total << endl << endl;
	}
system("PAUSE");
return 0;

}
