let emojiRange = [ [128513, 128591],   // 1st array : Emoticons icons
                  [9986, 10160],      // 2nd range : Dingbats
                  [128640, 128704] ]; // 3rd range : Transport and map symbols
let nCharsPrinted = 0; // Track numbers of emojis printed (per section)
// Loop through all valid emoji codes
for (let i = 0; i < emojiRange.length; i++) {
  let range = emojiRange[i];
  for (let x = range[0]; x < range[1]; x++) {
    txtTableOutput.innerHTML += "&#" + x + ";" + "&nbsp;";
    // Print header and separator for section 2
    if(x == 128590) {
      txtTableOutput.innerHTML += "<br><br><b>Dingbats and Symbols</b><hr>";
      nCharsPrinted = 0;
    }
    // Print header and separator for section 3
    if(x == 10159) {
      txtTableOutput.innerHTML += "<br><br><b>Travel and Transport</b><hr>";
      // Reset characters printed after each section
      nCharsPrinted = 0;
    }
    nCharsPrinted++;
    // Add a line break every 20 characters (for readability)
    if(nCharsPrinted % 20 == 0) txtTableOutput.innerHTML += "<br>";
  }
}
