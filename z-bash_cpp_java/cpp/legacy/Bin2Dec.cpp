// http://home.comcast.net/~jeffm24

#include <iostream>
#include <math.h> // needed for pow() function

using namespace std;

int main()
{
	bool error = false;
	char binaryStr[128]; // binary string as entered by user
	float binaryIndex[128], // binary string converted to double
		  currentSum = 0, // current sum for output
		  total = 0, // running total
		  currentPlace;
	int i, // array index
		places; // number of places in the binary string
	
	do
	{
		cout << "Enter a binary number: ";
		cin >> binaryStr;
		places = strlen(binaryStr) - 1;
	}
	while((places > 127)||(places < 0));
	
	currentPlace = places;
	
	cout << "\n";
	
	for(i = 0; i <= places ; i++)
	{
		// add each character to an array of type double
		switch (binaryStr[i])
		{
			case '1':
				binaryIndex[i] = 1;
				break;
				
			case '0':
				binaryIndex[i] = 0;
				break;
				
			// everything else can be tossed out
			default:
				cout << "Error!\t\t" << binaryStr[i] << " is not a binary digit" << endl;
				error = true;
				break;
		}
		
		// take the value of this element and multiply it by 2 raised to the appropriate power
		currentSum = binaryIndex[i] * pow(2,currentPlace);
		total += currentSum;
		
		if(!error)
		{
			cout << binaryIndex[i] << " x 2^" << currentPlace << " =\t" << currentSum << endl;
		}
		
		// go on to the next place
		currentPlace--;
	}
	cout << "\nTotal: \t\t" << total << "\n\n";
    system("pause");
	return 0;
}
