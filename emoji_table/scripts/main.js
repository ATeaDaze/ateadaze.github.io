// TODO: refactor without reversing order of list, remove duplicates, specific ranges, 
// add CSS for HTML formatting (deprecated)
let emojiCodeList = [ [128512, 128592], // Smileys 1
                      [129296, 129304], // Smileys 2
                      [129312, 129343], // Smileys 3
                      [128100, 128132], // People 1
                      [129304, 129311], // Gestures 1
                      [128064, 128100], // Gestures 2 and Fashion
                      [128000, 128064], // Animals 1
                      [129408, 129426], // Animals 2
                      [127789, 127872], // Food 1
                      [129344, 129350], // Food 2
                      [129351, 129375], // Food 3
                      [129375, 129392], // Food 4
                      [129472, 129473], // Cheese!\
                      [127872, 127956], // Hobbies
                      [128176, 128281], // Business and Media
                      [127956, 127985], // Places 1
                      [128331, 128335], // Religious buildings
                      [128640, 128680], // Travel and Transport
//                      [128680, 128681], // Police Siren
                      [127744, 127789], // Weather
                      [128293, 128306], // Symbols 1
                      [128132, 128176], // Symbols 2
                      [9904,   10161 ], // Symbols 3
                      [128367, 128512] ]; // Symbols 4
//                      [128681, 128759] ]; // Signs and Warnings (needs cleanup)


//let emojiCodeListRange = 1425; // (129425-128000)
let fullEmojiList = [];
let nEmojisGenerated = 0; // Track numbers of emojis printed (per section)
let nEmojisDrawn = 0
let cellCount = 0; // Total number of cells drawn
let bDarkModeEnabled = false;

// Generate full list of Emoji character codes
  for (let listRow = 0; listRow < emojiCodeList.length; listRow++) {
    let range = emojiCodeList[listRow];
    for (let listColumn = range[0]; listColumn < range[1]; listColumn++) {
      fullEmojiList[nEmojisGenerated] = "&#" + listColumn + ";";
      nEmojisGenerated++;
    }
  }
// Display number of symbols drawn on bottom of page
txtDisplayCounter.innerHTML = "<i>n</i> = " + nEmojisGenerated;

printEmojiTableToConsole();

// Print table of Emojis
  for (let nEmojisDrawn = 0; nEmojisDrawn < nEmojisGenerated;) {
    let row = $('<tr></tr>');
    for (let y = 0; y < 10; y++) {
      let cell = $('<td id = cell-' + nEmojisDrawn + '></td>');
      $(cell).html(fullEmojiList[nEmojisDrawn]);
//      $(cell).text(fullEmojiList[nEmojisDrawn]);
      $(cell).attr('title', fullEmojiList[nEmojisDrawn]);
      $(cell).addClass('emojiTableStyle');
      $(cell).appendTo(row);
      if(nEmojisGenerated == fullEmojiList.length) {
        $(cell).html('<b><img src=images/menu.png width=50 id=btnDarkMode></b>');
        $(cell).attr('title','🌜 Click to toggle between Dark and Light Mode 🌞');
      }
      nEmojisDrawn++
      cellCount++;
      fullEmojiList[nEmojisGenerated] = "&#" + y + ";";
//      console.log(`nEmojisDrawn = ${nEmojisDrawn}, y = ${y}`);
    }
  $(row).appendTo('table');
  }

//console.log(`nEmojisGenerated = ${nEmojisGenerated}, nEmojisDrawn = ${nEmojisDrawn}, cellCount = ${cellCount}`);
//console.log(`emojiCodeList.length = ${emojiCodeList.length}`)

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

// Print Emoji array with Markdown table syntax to console
function printEmojiTableToConsole() {
  console.log(`|index|value|`);
  console.log(`|-----|-----|`)
  for(index = 0; index < fullEmojiList.length; index++) {
    console.log(`| ${index} | ${fullEmojiList[index]} |`);
  }
}
