// Regex to remove comments: (^\/\/.*)|(\s+\/\/.*)
let nEmojisDrawn = 0;
let nFlagsDrawn = 0;
let nFlagsGenerated = 0;
let nTotalSymbols = 0;
let nCellsDrawn = 0;
let nBrowserLogLines = 0;
let bEnableDarkMode = false;
let bEnableLogging = false;

nFlagsGenerated = (flagCodeList.length);
nTotalSymbols = nFlagsGenerated + nEmojisGenerated;
printTableData(fullEmojiList, nEmojisGenerated, true);
printTableData(flagCodeList, nFlagsGenerated, false);
printEmojiFlagCounts();

if(bEnableLogging) printLogInfo();

// Enable dark mode if it's detected by the browser
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
      } // Deactivate any trailing blank cells
/*      if( ((nCellsDrawn > (nEmojisGenerated-1)) && (nCellsDrawn < (nEmojisGenerated+3))) || (nCellsDrawn > (nTotalSymbols+2)) ) {
        $(cell).html('');
        $(cell).attr('id', 'null-cell-' + nCellsDrawn);
        $(cell).attr('title','');
      } */
      $(cell).appendTo(row);
      nDrawn++
      nCellsDrawn++;
      fullList[nGenerated] = "&#" + cellValue + ";";
    }
    $(row).appendTo('table');
  }  
}

function swapBooleanValues(value1) {
  if(value1) {
    return(false);
  }
  return(true);
}

function toggleDarkMode() {
  let styleElement = document.body;
  styleElement.classList.toggle("darkMode");
  if(bEnableDarkMode) {
    btnDarkMode.src = "images/menu.png";
    $("#txtMainHeader").html("🔲&nbsp;Emoji Table")    
  } else {
    btnDarkMode.src = "images/menu-dark.png";  
    $("#txtMainHeader").html("🔳&nbsp;Emoji Table");
  }
  bEnableDarkMode = swapBooleanValues(bEnableDarkMode);
  if(bEnableLogging) console.log(`bEnableDarkMode = ${bEnableDarkMode}`);
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
  $("#txtDisplayEmojiCount").html("<b>nEmojis</b> = " + (nEmojisGenerated-1));
  $("#txtDisplayFlagCount").html("<b>nFlags</b> = " + nFlagsGenerated);
  $("#txtDisplayTotalCount").html("<b>Total</b> = " + nTotalSymbols);
}

function printLogInfo() {
  printTableLogHeader("emoji");
  fullEmojiList.forEach(item => printNewLogLine(item, nBrowserLogLines));
  printTableLogHeader("flag");
  flagCodeList.forEach(item => printNewLogLine(item, nBrowserLogLines));
}

function printTableLogHeader(txtHeaderCell) {
  console.log("| index | " + txtHeaderCell + " | ");
  console.log("|---|---|");
}

function printNewLogLine(line, nLines) {
  if((nLines < nTotalSymbols+1)&&(nLines > 0)&&(nLines != nEmojisGenerated)) {
    console.log(`| ${nLines} | ${line} |`);
  }
  nBrowserLogLines++;
  if(nLines == nEmojisGenerated) console.log("\n");
}
