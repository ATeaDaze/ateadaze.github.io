// TODO: optimize ranges, replace (deprecated) HTML formatting with CSS, remove duplicates
// Put this data in a separate file
let emojiCodeList = [
  [128512, 128592], [129296, 129304], [129312, 129343], [128100, 128132], // Smileys 1+2 / Smileys 3 + People 1
  [129304, 129311], [128064, 128100], [128000, 128064], [129408, 129426], // Gestures 1+2, Fashion / Animals 1+2
  [127789, 127872], [129344, 129350], [129351, 129375], [129375, 129392], // Food 1+2 / Food 3+4
  [129472, 129473], [127872, 127956], [128176, 128281], [127956, 127985], // Cheese + Hobbies / Business, Media + Places 1
  [128331, 128335], [128640, 128680], [128680, 128681], [127744, 127789], // Churches + Transport / EMS Siren + Weather
  [128293, 128306], [128132, 128176], [9800,   9812  ], [127462, 127488], // Symbols 1+2 / Zodiac Signs + Signs 1
  [128281, 128293], [9904,   10162 ], [128306, 128318], [127183, 127184], // Symbols 3 + Signs 2 / Shapes + Joker Card
  [126980, 126981], [128336, 128360], [127937, 127938], [128681, 128682], // Mahjong card + Clocks / Checkered flag + Red golf flag
  [127884, 127885], [127988, 127989], [127987, 127988] ];// Crossed flags + Black flag / White flag
const flagCodeList = new Array(
  "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩",
  "🇧🇪", "🇧🇫", "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨",
  "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲", "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇩🇪", "🇩🇬",
  "🇩🇯", "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺", "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷",
  "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭", "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇭🇰",
  "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶", "🇮🇷", "🇮🇸", "🇮🇹", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵",
  "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳", "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹", "🇱🇺",
  "🇱🇻", "🇱🇾", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲", "🇲🇳", "🇲🇴","🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺",
  "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿", "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇴🇲", "🇵🇦", "🇵🇪",
  "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼", "🇵🇾", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇸🇦", "🇸🇧",
  "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬", "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽", "🇸🇾", "🇸🇿", "🇹🇦",
  "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳", "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇸",
  "🇺🇾", "🇺🇿", "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇼🇫", "🇼🇸", "🇽🇰", "🇾🇪", "🇾🇹", "🇿🇦", "🇿🇲", "🇿🇼");

let fullEmojiList = [];
let nEmojisGenerated = 0; // Track numbers of emojis generated from list
let nEmojisDrawn = 0 // Track number of emojis drawn to table cells
let nFlagsGenerated = 0;
let nFlagsDrawn = 0;
let nTotalSymbols = 0;
let cellCount = 0; // Total number of table cells drawn
let bDarkModeEnabled = false;

// Generate full list of Emoji character codes
for (let listRow = 0; listRow < emojiCodeList.length; listRow++) {
  let range = emojiCodeList[listRow];
  for (let listColumn = range[0]; listColumn < range[1]; listColumn++) {
    fullEmojiList[nEmojisGenerated] = "&#" + listColumn + ";";
    nEmojisGenerated++;
  }
}
//console.log('# ' + Object.keys({fullEmojiList})[0] + "[]");
//printTableToConsole(fullEmojiList);

// Print table of Emojis
for (let nEmojisDrawn = 0; nEmojisDrawn < nEmojisGenerated;) {
  let row = $('<tr></tr>');
  for (let nColumns = 0; nColumns < 10; nColumns++) {
    let cell = $('<td id = emoji-' + nEmojisDrawn + '></td>');
    $(cell).html(fullEmojiList[nEmojisDrawn]);
    $(cell).attr('title', 'Copy to clipboard (' + fullEmojiList[nEmojisDrawn] + ')');
    $(cell).addClass('emojiTableStyle');
    $(cell).appendTo(row);
    if(nEmojisGenerated == fullEmojiList.length) {
      $(cell).html('<b><img src=images/menu.png id=btnDarkMode></b>');
      $(cell).attr('title','🌜 Click to toggle between dark and light mode 🌞');
      $(cell).attr('id', 'menuButtonCell');
    }
    nEmojisDrawn++
    cellCount++;
    fullEmojiList[nEmojisGenerated] = "&#" + nColumns + ";";
  }
$(row).appendTo('table');
$("#txtDisplayEmojiCount").html("<b>nEmojis</b> = " + nEmojisGenerated + ", ");
}

// Print the entire list of flags
nFlagsGenerated = flagCodeList.length;
  for (let nFlagsDrawn = 0; nFlagsDrawn < nFlagsGenerated;) {
    let row = $('<tr></tr>');
    for (let nColumns = 0; nColumns < 10; nColumns++) {
      let cell = $('<td id = emoji-' + nFlagsDrawn + '></td>');
      $(cell).html(flagCodeList[nFlagsDrawn]);
      $(cell).attr('title', 'Copy to clipboard (' + flagCodeList[nFlagsDrawn] + ')');
      $(cell).addClass('emojiTableStyle');
      $(cell).appendTo(row);
      nFlagsDrawn++
      cellCount++;
    }
  $(row).appendTo('table');
}
$("#txtTableOutput").html("</table>");
nTotalSymbols = nFlagsGenerated + nEmojisGenerated;
$("#txtDisplayFlagCount").html("<b>nFlags</b> = " + nFlagsGenerated);
$("#txtDisplayFlagCount").append(", <b>Total</b> = " + nTotalSymbols);
//console.log('# ' + Object.keys({flagCodeList})[0] + "[]");
//printTableToConsole(flagCodeList);
// Toggle dark mode on if user preference is set
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggleDarkMode();
}

// Copy Emoji to clipboard when clicked
$(document).ready(function() {
  $("[id^=emoji]").click(function() {
    let txtCopy = $(this).closest('td').html();
    navigator.clipboard.writeText(txtCopy);
    displayCopyToast(txtCopy);
  });
});

// Toggle dark mode on/off
$(document).ready(function() {
  $('#btnDarkMode').click(function() {
    toggleDarkMode();
  });
});

// Swap dark mode flags and update styles
function toggleDarkMode() {
  let element = document.body;
  element.classList.toggle("darkMode");
  if(bDarkModeEnabled) {
    btnDarkMode.src = "images/menu.png";
    $(btnDarkMode).attr('title','☀️ Light Mode');
    bDarkModeEnabled = false;
  } else {
    btnDarkMode.src = "images/menu-dark.png";  
    $(btnDarkMode).attr('title','🌙 Dark Mode');
    bDarkModeEnabled = true;
  }
  if(bDarkModeEnabled) {
    $("#txtMainHeader").html("🔳&nbsp;Emoji Table");
  } else {
    $("#txtMainHeader").html("🔲&nbsp;Emoji Table")    
  }
}

function displayCopyToast(txt) {
  // Display notification
  let x = document.getElementById("toastMessage");
  x.innerHTML = "Copied " + txt + " to clipboard";
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 1500);
}

// Print Emoji array with Markdown table syntax to console
/*function printTableToConsole(emojis) {
  console.log(`|index|value|`);
  console.log(`|-----|-----|`)
  for(index = 0; index < emojis.length; index++) {
    console.log(`| ${index} | ${emojis[index]} |`);
  }
}*/
