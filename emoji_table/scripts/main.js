// TODO: optimize ranges (missing emojis), replace deprecated HTML formatting with CSS, put list data in a separate file/script, remove unused variables, remove duplicates
// Full list of emoji codes: [Smileys 1],[Smileys 2], [Smileys 3], [People 1], // [Gestures 1], [Gestures 2 + Fashion], [Animals 1], [Animals 2], // [Food 1], [Food 2], [Food 3], [Food 4], // [Cheese], [Hobbies + Business], [Media], [Places 1], // [Churches], [Transport], [EMS Siren], [Weather], // [Symbols 1], [Symbols 2], [Zodiac Signs], [Signs 1] // [Symbols 3], [Signs 2], [Shapes], [Joker Card], // [Mahjong card], [Clocks], [Checkered flag], [Red golf flag], // [Crossed flags], [Black flag], [White flag]
const emojiCodeList = [[128512,128592],[129296,129304],[129312,129343],[128100,128132],[129304,129311],[128064,128100],[128e3,128064],[129408,129426],[127789,127872],[129344,129350],[129351,129375],[129375,129392],[129472,129473],[127872,127956],[128176,128281],[127956,127985],[128331,128335],[128640,128680],[128680,128681],[127744,127789],[128293,128306],[128132,128176],[9800,9812],[127462,127488],[128281,128293],[9904,10162],[128306,128318],[127183,127184],[126980,126981],[128336,128360],[127937,127938],[128681,128682],[127884,127885],[127988,127989],[127987,127988]];
// Full list of flag codes (note: flags do not render properly in Chromium browsers on Windows)
const flagCodeList = new Array("🇦🇨","🇦🇩","🇦🇪","🇦🇫","🇦🇬","🇦🇮","🇦🇱","🇦🇲","🇦🇴","🇦🇶","🇦🇷","🇦🇸","🇦🇹","🇦🇺","🇦🇼","🇦🇽","🇦🇿","🇧🇦","🇧🇧","🇧🇩","🇧🇪","🇧🇫","🇧🇬","🇧🇭","🇧🇮","🇧🇯","🇧🇱","🇧🇲","🇧🇳","🇧🇴","🇧🇶","🇧🇷","🇧🇸","🇧🇹","🇧🇻","🇧🇼","🇧🇾","🇧🇿","🇨🇦","🇨🇨","🇨🇩","🇨🇫","🇨🇬","🇨🇭","🇨🇮","🇨🇰","🇨🇱","🇨🇲","🇨🇳","🇨🇴","🇨🇵","🇨🇷","🇨🇺","🇨🇻","🇨🇼","🇨🇽","🇨🇾","🇨🇿","🇩🇪","🇩🇬","🇩🇯","🇩🇰","🇩🇲","🇩🇴","🇩🇿","🇪🇦","🇪🇨","🇪🇪","🇪🇬","🇪🇭","🇪🇷","🇪🇸","🇪🇹","🇪🇺","🇫🇮","🇫🇯","🇫🇰","🇫🇲","🇫🇴","🇫🇷","🇬🇦","🇬🇧","🇬🇩","🇬🇪","🇬🇫","🇬🇬","🇬🇭","🇬🇮","🇬🇱","🇬🇲","🇬🇳","🇬🇵","🇬🇶","🇬🇷","🇬🇸","🇬🇹","🇬🇺","🇬🇼","🇬🇾","🇭🇰","🇭🇲","🇭🇳","🇭🇷","🇭🇹","🇭🇺","🇮🇨","🇮🇩","🇮🇪","🇮🇱","🇮🇲","🇮🇳","🇮🇴","🇮🇶","🇮🇷","🇮🇸","🇮🇹","🇯🇪","🇯🇲","🇯🇴","🇯🇵","🇰🇪","🇰🇬","🇰🇭","🇰🇮","🇰🇲","🇰🇳","🇰🇵","🇰🇷","🇰🇼","🇰🇾","🇰🇿","🇱🇦","🇱🇧","🇱🇨","🇱🇮","🇱🇰","🇱🇷","🇱🇸","🇱🇹","🇱🇺","🇱🇻","🇱🇾","🇲🇦","🇲🇨","🇲🇩","🇲🇪","🇲🇫","🇲🇬","🇲🇭","🇲🇰","🇲🇱","🇲🇲","🇲🇳","🇲🇴","🇲🇵","🇲🇶","🇲🇷","🇲🇸","🇲🇹","🇲🇺","🇲🇻","🇲🇼","🇲🇽","🇲🇾","🇲🇿","🇳🇦","🇳🇨","🇳🇪","🇳🇫","🇳🇬","🇳🇮","🇳🇱","🇳🇴","🇳🇵","🇳🇷","🇳🇺","🇳🇿","🇴🇲","🇵🇦","🇵🇪","🇵🇫","🇵🇬","🇵🇭","🇵🇰","🇵🇱","🇵🇲","🇵🇳","🇵🇷","🇵🇸","🇵🇹","🇵🇼","🇵🇾","🇶🇦","🇷🇪","🇷🇴","🇷🇸","🇷🇺","🇷🇼","🇸🇦","🇸🇧","🇸🇨","🇸🇩","🇸🇪","🇸🇬","🇸🇭","🇸🇮","🇸🇯","🇸🇰","🇸🇱","🇸🇲","🇸🇳","🇸🇴","🇸🇷","🇸🇸","🇸🇹","🇸🇻","🇸🇽","🇸🇾","🇸🇿","🇹🇦","🇹🇨","🇹🇩","🇹🇫","🇹🇬","🇹🇭","🇹🇯","🇹🇰","🇹🇱","🇹🇲","🇹🇳","🇹🇴","🇹🇷","🇹🇹","🇹🇻","🇹🇼","🇹🇿","🇺🇦","🇺🇬","🇺🇲","🇺🇸","🇺🇾","🇺🇿","🇻🇦","🇻🇨","🇻🇪","🇻🇬","🇻🇮","🇻🇳","🇻🇺","🇼🇫","🇼🇸","🇽🇰","🇾🇪","🇾🇹","🇿🇦","🇿🇲","🇿🇼");
let fullEmojiList = [];   // List of generated emoji codes
let nEmojisGenerated = 0; // Emojis generated from range sets
let nEmojisDrawn = 0      // Emojis drawn to table cells
let nFlagsGenerated = 0;  // Flags generated from range sets
let nFlagsDrawn = 0;      // Flags drawn to cells
let nTotalSymbols = 0;    // nEmojisGenerated + nFlagsGenerated
let nCellsDrawn = 0;
let bDarkModeEnabled = false;

// Generate a full list of Emoji character codes from the array of ranges
for (let listRow = 0; listRow < emojiCodeList.length; listRow++) {
  let range = emojiCodeList[listRow];
  for (let listColumn = range[0]; listColumn < range[1]; listColumn++) {
    // Add emoji to array and increment emoji counter
    fullEmojiList[nEmojisGenerated] = "&#" + listColumn + ";";
    nEmojisGenerated++;
  }
}

// Number of flags is equal to the length of its list
nFlagsGenerated = (flagCodeList.length);
// Print all emojis and flags in a table with 10 columns
printTableData(fullEmojiList, nEmojisGenerated, nEmojisDrawn, true);
printTableData(flagCodeList, nFlagsGenerated, nFlagsDrawn, false);
nTotalSymbols = nFlagsGenerated + nEmojisGenerated;
// Update stats on the bottom of the page
$("#txtDisplayEmojiCount").html("<b>nEmojis</b> = " + nEmojisGenerated);
$("#txtDisplayFlagCount").html("<b>nFlags</b> = " + nFlagsGenerated);
$("#txtDisplayTotalCount").html("<b>Total</b> = " + nTotalSymbols);
// Print a table of emoji and flag arrays (for testing)
//printTableToConsole(fullEmojiList, "emoji");
//printTableToConsole(flagCodeList, "flag");

// Toggle dark mode on if user preference is set
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggleDarkMode();
}

// Copy Emoji to clipboard when clicked and display a toast
$(document).ready(function() {
  $("[id^=emoji]").click(function() {
    let txtCopy = $(this).closest('td').html();
    navigator.clipboard.writeText(txtCopy);
    displayCopyToast(txtCopy);
  });

// Toggle dark mode on/off
  $('#btnDarkMode').click(function() {
    toggleDarkMode();
  });
});

// Print list of characters in a table with 10 columns
function printTableData(fullList, nGenerated, nDrawn, bPrintButton) {
  for (let nDrawn = 0; nDrawn < nGenerated;) {
    let row = $('<tr></tr>');
    for (let nColumns = 0; nColumns < 10; nColumns++) {
      let cell = $('<td id = emoji-cell-' + nCellsDrawn + '></td>');
      // Add new cell to current row
      $(cell).html(fullList[nDrawn]);
      $(cell).attr('title', 'Copy to clipboard (' + fullList[nDrawn] + ')');
      $(cell).addClass('emojiTableStyle');
      $(cell).appendTo(row);
      // Replace the 1st cell with a dark mode button and change its ID
      if( (nGenerated == fullList.length) && (bPrintButton) ) {
        $(cell).html('<b><img src=images/menu.png id=btnDarkMode></b>');
        $(cell).attr('title','🌜 Click to toggle between dark and light mode 🌞');
        $(cell).attr('id', 'menuButtonCell');
      }
      nDrawn++
      nCellsDrawn++;
      // Combine strings to create HTML code, format = "&#abcxyz;"
      fullList[nGenerated] = "&#" + nColumns + ";";
    }
    // Add new row to table
    $(row).appendTo('table');
  }  
}

// Swap dark mode flags and update styles
function toggleDarkMode() {
  let styleElement = document.body;
  styleElement.classList.toggle("darkMode");
  if(bDarkModeEnabled) {
    btnDarkMode.src = "images/menu.png";
    $(btnDarkMode).attr('title','☀️ Light Mode');
    $("#txtMainHeader").html("🔲&nbsp;Emoji Table")    
    bDarkModeEnabled = false;
  } else {
    btnDarkMode.src = "images/menu-dark.png";  
    $(btnDarkMode).attr('title','🌙 Dark Mode');
    $("#txtMainHeader").html("🔳&nbsp;Emoji Table");
    bDarkModeEnabled = true;
  }
}

// Display toast notification for copying
function displayCopyToast(txt) {
  let x = document.getElementById("toastMessage");
  x.innerHTML = "Copied " + txt + " to clipboard";
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}

// Print Emoji array with Markdown table syntax to console
function printTableToConsole(emojis, iVal) {
  // Markdown table header
  console.log(`|${iVal}|value|`);
  console.log(`|-----|-----|`)
  // Set range to (emojis.length-1) for proper array index
  for(index = 0; index < (emojis.length-1); index++) {
    console.log(`| ${index} | ${emojis[index]} |`);
  }
}
