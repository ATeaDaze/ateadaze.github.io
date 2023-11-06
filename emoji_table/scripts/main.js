// TODO: optimize ranges, replace (deprecated) HTML formatting with CSS, remove duplicates
// Put this data in a separate file
let emojiCodeList = [ [128512, 128592], [129296, 129304], // Smileys 1+2
                      [129312, 129343], [128100, 128132], // Smileys 3 + People 1
                      [129304, 129311], [128064, 128100], // Gestures 1 + Gestures 2 / Fashion
                      [128000, 128064], [129408, 129426], // Animals 1+2
                      [127789, 127872], [129344, 129350], // Food 1+2
                      [129351, 129375], [129375, 129392], // Food 3+4
                      [129472, 129473], [127872, 127956], // Cheese + Hobbies
                      [128176, 128281], [127956, 127985], // Business / Media + Places 1
                      [128331, 128335], [128640, 128680], // Churches + Travel/Transport
                      [128680, 128681], [127744, 127789], // Police Siren + Weather
                      [128293, 128306], [128132, 128176], // Symbols 1+2
                      [9800,   9812  ], [127462, 127488], // Astrology Signs + Signage 1                  
                      [128281, 128293], [9904,   10162 ], // Symbols 3 + Signage 1
                      [128306, 128318], [127183, 127184], // Shapes / Bullet Points + Joker card
                      [126980, 126981], [127937, 127938], // Mahjong card + Clocks
                      [128681, 128682], [127884, 127885], // Checker flag + Golf flag
                      [127988, 127989], [127987, 127988], // Crossed flags + Black flag
                      [128336, 128360] ]; // White flag
const flagCodeList = new Array(
  "&#127462;&#127464;", "&#127462;&#127465;", "&#127462;&#127466;", "&#127462;&#127467;", "&#127462;&#127468;", "&#127462;&#127470;", "&#127462;&#127473;", "&#127462;&#127474;", "&#127462;&#127476;",
  "&#127462;&#127478;", "&#127462;&#127479;", "&#127462;&#127480;", "&#127462;&#127481;", "&#127462;&#127482;", "&#127462;&#127484;", "&#127462;&#127485;", "&#127462;&#127487;", "&#127463;&#127462;",
  "&#127463;&#127463;", "&#127463;&#127465;", "&#127463;&#127466;", "&#127463;&#127467;", "&#127463;&#127468;", "&#127463;&#127469;", "&#127463;&#127470;", "&#127463;&#127471;", "&#127463;&#127473;",
  "&#127463;&#127474;", "&#127463;&#127475;", "&#127463;&#127476;", "&#127463;&#127478;", "&#127463;&#127479;", "&#127463;&#127480;", "&#127463;&#127481;", "&#127463;&#127483;", "&#127463;&#127484;",
  "&#127463;&#127486;", "&#127463;&#127487;", "&#127464;&#127462;", "&#127464;&#127464;", "&#127464;&#127465;", "&#127464;&#127467;", "&#127464;&#127468;", "&#127464;&#127469;", "&#127464;&#127470;",
  "&#127464;&#127472;", "&#127464;&#127473;", "&#127464;&#127474;", "&#127464;&#127475;", "&#127464;&#127476;", "&#127464;&#127477;", "&#127464;&#127479;", "&#127464;&#127482;", "&#127464;&#127483;",
  "&#127464;&#127484;", "&#127464;&#127485;", "&#127464;&#127486;", "&#127464;&#127487;", "&#127465;&#127466;", "&#127465;&#127468;", "&#127465;&#127471;", "&#127465;&#127472;", "&#127465;&#127474;", "&#127465;&#127476;", 
  "&#127465;&#127487;", "&#127466;&#127462;", "&#127466;&#127464;", "&#127466;&#127466;", "&#127466;&#127468;", "&#127466;&#127469;", "&#127466;&#127479;", "&#127466;&#127480;", "&#127466;&#127481;", "&#127466;&#127482;", 
  "&#127467;&#127470;", "&#127467;&#127471;", "&#127467;&#127472;", "&#127467;&#127474;", "&#127467;&#127476;", "&#127467;&#127479;", "&#127468;&#127462;", "&#127468;&#127463;", "&#127468;&#127465;", "&#127468;&#127466;", 
  "&#127468;&#127467;", "&#127468;&#127468;", "&#127468;&#127469;", "&#127468;&#127470;", "&#127468;&#127473;", "&#127468;&#127474;", "&#127468;&#127475;", "&#127468;&#127477;", "&#127468;&#127478;", "&#127468;&#127479;", 
  "&#127468;&#127480;", "&#127468;&#127481;", "&#127468;&#127482;", "&#127468;&#127484;", "&#127468;&#127486;", "&#127469;&#127472;", "&#127469;&#127474;", "&#127469;&#127475;", "&#127469;&#127479;", "&#127469;&#127481;", 
  "&#127469;&#127482;", "&#127470;&#127464;", "&#127470;&#127465;", "&#127470;&#127466;", "&#127470;&#127473;", "&#127470;&#127474;", "&#127470;&#127475;", "&#127470;&#127476;", "&#127470;&#127478;", "&#127470;&#127479;", 
  "&#127470;&#127480;", "&#127470;&#127481;", "&#127471;&#127466;", "&#127471;&#127474;", "&#127471;&#127476;", "&#127471;&#127477;", "&#127472;&#127466;", "&#127472;&#127468;", "&#127472;&#127469;", "&#127472;&#127470;", 
  "&#127472;&#127474;", "&#127472;&#127475;", "&#127472;&#127477;", "&#127472;&#127479;", "&#127472;&#127484;", "&#127472;&#127486;", "&#127472;&#127487;", "&#127473;&#127462;", "&#127473;&#127463;", "&#127473;&#127464;", 
  "&#127473;&#127470;", "&#127473;&#127472;", "&#127473;&#127479;", "&#127473;&#127480;", "&#127473;&#127481;", "&#127473;&#127482;", "&#127473;&#127483;", "&#127473;&#127486;", "&#127474;&#127462;", "&#127474;&#127464;", 
  "&#127474;&#127465;", "&#127474;&#127466;", "&#127474;&#127467;", "&#127474;&#127468;", "&#127474;&#127469;", "&#127474;&#127472;", "&#127474;&#127473;", "&#127474;&#127474;", "&#127474;&#127475;", "&#127474;&#127476;", 
  "&#127474;&#127477;", "&#127474;&#127478;", "&#127474;&#127479;", "&#127474;&#127480;", "&#127474;&#127481;", "&#127474;&#127482;", "&#127474;&#127483;", "&#127474;&#127484;", "&#127474;&#127485;", "&#127474;&#127486;", 
  "&#127474;&#127487;", "&#127475;&#127462;", "&#127475;&#127464;", "&#127475;&#127466;", "&#127475;&#127467;", "&#127475;&#127468;", "&#127475;&#127470;", "&#127475;&#127473;", "&#127475;&#127476;", "&#127475;&#127477;", 
  "&#127475;&#127479;", "&#127475;&#127482;", "&#127475;&#127487;", "&#127476;&#127474;", "&#127477;&#127462;", "&#127477;&#127466;", "&#127477;&#127467;", "&#127477;&#127468;", "&#127477;&#127469;", "&#127477;&#127472;", 
  "&#127477;&#127473;", "&#127477;&#127474;", "&#127477;&#127475;", "&#127477;&#127479;", "&#127477;&#127480;", "&#127477;&#127481;", "&#127477;&#127484;", "&#127477;&#127486;", "&#127478;&#127462;", "&#127479;&#127466;", 
  "&#127479;&#127476;", "&#127479;&#127480;", "&#127479;&#127482;", "&#127479;&#127484;", "&#127480;&#127462;", "&#127480;&#127463;", "&#127480;&#127464;", "&#127480;&#127465;", "&#127480;&#127466;", "&#127480;&#127468;", 
  "&#127480;&#127469;", "&#127480;&#127470;", "&#127480;&#127471;", "&#127480;&#127472;", "&#127480;&#127473;", "&#127480;&#127474;", "&#127480;&#127475;", "&#127480;&#127476;", "&#127480;&#127479;", "&#127480;&#127480;", 
  "&#127480;&#127481;", "&#127480;&#127483;", "&#127480;&#127485;", "&#127480;&#127486;", "&#127480;&#127487;", "&#127481;&#127462;", "&#127481;&#127464;", "&#127481;&#127465;", "&#127481;&#127467;", "&#127481;&#127468;", 
  "&#127481;&#127469;", "&#127481;&#127471;", "&#127481;&#127472;", "&#127481;&#127473;", "&#127481;&#127474;", "&#127481;&#127475;", "&#127481;&#127476;", "&#127481;&#127479;", "&#127481;&#127481;", "&#127481;&#127483;", 
  "&#127481;&#127484;", "&#127481;&#127487;", "&#127482;&#127462;", "&#127482;&#127468;", "&#127482;&#127474;", "&#127482;&#127480;", "&#127482;&#127486;", "&#127482;&#127487;", "&#127483;&#127462;", "&#127483;&#127464;", 
  "&#127483;&#127466;", "&#127483;&#127468;", "&#127483;&#127470;", "&#127483;&#127475;", "&#127483;&#127482;", "&#127484;&#127467;", "&#127484;&#127480;", "&#127485;&#127472;", "&#127486;&#127466;", "&#127486;&#127481;", 
  "&#127487;&#127462;", "&#127487;&#127474;", "&#127487;&#127484;" );
// Need to create functions for table generation to parse strings
const emojiflagList = new Array( "&#127987 &#65039 &#8205 &#127752",
                                 "&#127988 &#8205 &#9760 &#65039" );
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
//printEmojiTableToConsole();

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
      $(cell).attr('id', 'mainButton');
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
//printFlagTableToConsole();

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
}

function displayCopyToast(txt) {
  // Display notification
  let x = document.getElementById("toastMessage");
  x.innerHTML = "Copied " + txt + " to clipboard";
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 1000);
}

// Print Emoji array with Markdown table syntax to console
/*function printEmojiTableToConsole() {
  console.log(`|index|value|`);
  console.log(`|-----|-----|`)
  for(index = 0; index < fullEmojiList.length; index++) {
    console.log(`| ${index} | ${fullEmojiList[index]} |`);
  }
}*/

/*function printFlagTableToConsole() {
  console.log(`|index|value|`);
  console.log(`|-----|-----|`)
  for(let index = 0; index < nFlagsGenerated; index++) {
    console.log(`| ${index} | ${flagCodeList[index]} |`);
  }
}*/
