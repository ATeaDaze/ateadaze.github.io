// TODO: optimize ranges, replace (deprecated) HTML formatting with CSS, remove duplicates
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
                      [9904,   10161 ], [128367, 128512] ]; // Symbols 3+4
let fullEmojiList = [];
let nEmojisGenerated = 0; // Track numbers of emojis generated from list
let nEmojisDrawn = 0 // Track number of emojis drawn to table cells
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

// Display number of symbols drawn on bottom of page
txtDisplayCounter.innerHTML = "<i>n</i> = " + nEmojisGenerated;
printEmojiTableToConsole();

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
        $(cell).html('<b><img src=images/menu.png width=50 id=btnDarkMode></b>');
        $(cell).attr('title','🌜 Click to toggle between dark and light mode 🌞');
        $(cell).attr('id', 'mainButton');
      }
      nEmojisDrawn++
      cellCount++;
      fullEmojiList[nEmojisGenerated] = "&#" + nColumns + ";";
    }
  $(row).appendTo('table');
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
}

function displayCopyToast(txt) {
  // Display notification
  let x = document.getElementById("toastMessage");
  x.innerHTML = "Copied " + txt + " to clipboard";
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}

// Print Emoji array with Markdown table syntax to console
function printEmojiTableToConsole() {
  console.log(`|index|value|`);
  console.log(`|-----|-----|`)
  for(index = 0; index < fullEmojiList.length; index++) {
    console.log(`| ${index} | ${fullEmojiList[index]} |`);
  }
}
