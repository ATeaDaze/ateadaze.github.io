class BinaryAppConsole {
  public static void main(String[] args) {

    int     decimalNumber = 12345,
            remainder[] = new int[500000],
            index,
            currentDigit;
    String  txtDecimalNumber,
            txtExampleNumber = "12345",
            txtLineSeparator = "--------------------------------------------------------";
    boolean itWorked = true,
            displayAchievement = false;

    System.out.println("Decimal to Binary Converter (example: 12345)");
    System.out.println(txtLineSeparator);  
    System.out.print("Enter a number: ");
    txtDecimalNumber = System.console().readLine();
    System.out.println(txtLineSeparator);  

    decimalNumber = formatNumber(decimalNumber, txtDecimalNumber);
    itWorked = checkInputRanges(decimalNumber);

    if(decimalNumber == 12345) displayAchievement = true;

    if(itWorked) {
      System.out.println("digit\tx % 2\tx / 2");
      System.out.println("════════════════════════════════════════════════════════");
      for(index = 0; decimalNumber > 0; index++) {
        remainder[index] = decimalNumber % 2;
        decimalNumber = decimalNumber / 2;
        System.out.print("[" + index + "]\t" + remainder[index] + "\t" + decimalNumber + "\n");
        if (decimalNumber < 1) {
          break;
        }
      }
      System.out.println(txtLineSeparator);  
      System.out.print(txtDecimalNumber + " converted to binary equals: ");
      for (currentDigit = index; currentDigit > -1; currentDigit--) {
      System.out.print(remainder[currentDigit]);
      }
    }
    System.out.println("\n" + txtLineSeparator);  

    if(displayAchievement) {
      System.out.println("***** ACHIEVEMENT UNLOCKED: HIGHLY RECOMMENDED *****");
      System.out.println("> You used the example decimal number: " + txtDecimalNumber);
    }

  }

  public static int formatNumber(int decNum, String txtNum) {
    decNum = Integer.parseInt(txtNum);
    if(decNum < 0) {
      decNum = decNum * -1;
    }
    return(decNum);
  }

  public static boolean checkInputRanges(int decNum) {
    if( (decNum < -5000000) || (decNum > 5000000) ) {
      System.out.println("> Invalid Input");
      System.out.println("Enter a number between 0 and 5,000,000");
      return(false);
    }
    return(true);
  }

}
