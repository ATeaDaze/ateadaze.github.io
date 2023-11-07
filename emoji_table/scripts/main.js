// 4 variables defined in external source file (generateNewList.js)
// emojiCodeList = [[range1,range2],[range3],[range4]]..., flagCodeList = ["🇦🇨","🇦🇩",..., fullEmojiList = [], nEmojisGenerated = 0
let nEmojisDrawn = 0;
let nFlagsGenerated = 0;
let nFlagsDrawn = 0;
let nTotalSymbols = 0;
let nCellsDrawn = 0;
let bDarkModeEnabled = false;

nFlagsGenerated = (flagCodeList.length);
nTotalSymbols = nFlagsGenerated + nEmojisGenerated;
printTableData(fullEmojiList, nEmojisGenerated, true);
printTableData(flagCodeList, nFlagsGenerated, false);
printEmojiFlagCounts();
//printTableToConsole(fullEmojiList, 'emoji');
//printTableToConsole(flagCodeList, 'flag');

if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggleDarkMode();
}

$(document).ready(function() {
  $("[id^=emoji]").click(function() {
    let txtCopy = $(this).closest('td').html();
    navigator.clipboard.writeText(txtCopy);
    displayCopyToast(txtCopy);
  });
  $('#btnDarkMode').click(function() {
    toggleDarkMode();
  });
});

function printTableData(fullList, nGenerated, bEnablePrintBtn) {
  for (let nDrawn = 0; nDrawn < nGenerated;) {
    let row = $('<tr></tr>');
    for (let cellValue = 0; cellValue < 10; cellValue++) {
      let cell = $('<td id = emoji-cell-' + nCellsDrawn + '></td>');
      $(cell).html(fullList[nDrawn]);
      $(cell).attr('title', 'Copy to clipboard (' + fullList[nDrawn] + ')');
      $(cell).addClass('emojiTableStyle');
      // Replace contents of 1st cell with a dark/light mode button
      if( (nGenerated == fullList.length) && (bEnablePrintBtn) ) {
        $(cell).html('<b><img src=images/menu.png id=btnDarkMode></b>');
        $(cell).attr('title','🌜 Click to toggle between dark and light mode 🌞');
        $(cell).attr('id', 'menuButtonCell');
      } // Deactivate any cell without a valid emoji or flag
      if( ((nCellsDrawn > 1122) && (nCellsDrawn < 1130)) || (nCellsDrawn > 1386) ) {
        $(cell).html('');
        $(cell).attr('id', 'null-cell-' + nCellsDrawn);
        $(cell).attr('title','');
      }
      $(cell).appendTo(row);
      nDrawn++
      nCellsDrawn++;
      fullList[nGenerated] = "&#" + cellValue + ";";
    }
    $(row).appendTo('table');
  }  
}

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

function displayCopyToast(txt) {
  let x = document.getElementById("toastMessage");
  x.innerHTML = "Copied " + txt + " to clipboard";
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}

function printEmojiFlagCounts() {
  $("#txtDisplayEmojiCount").html("<b>nEmojis</b> = " + nEmojisGenerated);
  $("#txtDisplayFlagCount").html("<b>nFlags</b> = " + nFlagsGenerated);
  $("#txtDisplayTotalCount").html("<b>Total</b> = " + nTotalSymbols);
}

/*function printTableToConsole(emojisFlags, iVal) {
  console.log(`|${iVal}|value|`);
  console.log(`|-----|-----|`)
  for(index = 0; index < (emojisFlags.length-1); index++) {
    console.log(`| ${index} | ${emojisFlags[index]} |`);
  }
}*/
