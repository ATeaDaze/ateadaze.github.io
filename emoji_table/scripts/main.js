const emojiCodeList = [[128512,128592],[129296,129304],[129312,129343],[128100,128132],[129304,129311],[128064,128100],[128e3,128064],[129408,129426],[127789,127872],[129344,129350],[129351,129375],[129375,129392],[129472,129473],[127872,127956],[128176,128281],[127956,127985],[128331,128335],[128640,128680],[128680,128681],[127744,127789],[128293,128306],[128132,128176],[9800,9812],[127462,127488],[128281,128293],[9904,10162],[128306,128318],[127183,127184],[126980,126981],[128336,128360],[127937,127938],[128681,128682],[127884,127885],[127988,127989],[127987,127988]];
const flagCodeList = new Array("🇦🇨","🇦🇩","🇦🇪","🇦🇫","🇦🇬","🇦🇮","🇦🇱","🇦🇲","🇦🇴","🇦🇶","🇦🇷","🇦🇸","🇦🇹","🇦🇺","🇦🇼","🇦🇽","🇦🇿","🇧🇦","🇧🇧","🇧🇩","🇧🇪","🇧🇫","🇧🇬","🇧🇭","🇧🇮","🇧🇯","🇧🇱","🇧🇲","🇧🇳","🇧🇴","🇧🇶","🇧🇷","🇧🇸","🇧🇹","🇧🇻","🇧🇼","🇧🇾","🇧🇿","🇨🇦","🇨🇨","🇨🇩","🇨🇫","🇨🇬","🇨🇭","🇨🇮","🇨🇰","🇨🇱","🇨🇲","🇨🇳","🇨🇴","🇨🇵","🇨🇷","🇨🇺","🇨🇻","🇨🇼","🇨🇽","🇨🇾","🇨🇿","🇩🇪","🇩🇬","🇩🇯","🇩🇰","🇩🇲","🇩🇴","🇩🇿","🇪🇦","🇪🇨","🇪🇪","🇪🇬","🇪🇭","🇪🇷","🇪🇸","🇪🇹","🇪🇺","🇫🇮","🇫🇯","🇫🇰","🇫🇲","🇫🇴","🇫🇷","🇬🇦","🇬🇧","🇬🇩","🇬🇪","🇬🇫","🇬🇬","🇬🇭","🇬🇮","🇬🇱","🇬🇲","🇬🇳","🇬🇵","🇬🇶","🇬🇷","🇬🇸","🇬🇹","🇬🇺","🇬🇼","🇬🇾","🇭🇰","🇭🇲","🇭🇳","🇭🇷","🇭🇹","🇭🇺","🇮🇨","🇮🇩","🇮🇪","🇮🇱","🇮🇲","🇮🇳","🇮🇴","🇮🇶","🇮🇷","🇮🇸","🇮🇹","🇯🇪","🇯🇲","🇯🇴","🇯🇵","🇰🇪","🇰🇬","🇰🇭","🇰🇮","🇰🇲","🇰🇳","🇰🇵","🇰🇷","🇰🇼","🇰🇾","🇰🇿","🇱🇦","🇱🇧","🇱🇨","🇱🇮","🇱🇰","🇱🇷","🇱🇸","🇱🇹","🇱🇺","🇱🇻","🇱🇾","🇲🇦","🇲🇨","🇲🇩","🇲🇪","🇲🇫","🇲🇬","🇲🇭","🇲🇰","🇲🇱","🇲🇲","🇲🇳","🇲🇴","🇲🇵","🇲🇶","🇲🇷","🇲🇸","🇲🇹","🇲🇺","🇲🇻","🇲🇼","🇲🇽","🇲🇾","🇲🇿","🇳🇦","🇳🇨","🇳🇪","🇳🇫","🇳🇬","🇳🇮","🇳🇱","🇳🇴","🇳🇵","🇳🇷","🇳🇺","🇳🇿","🇴🇲","🇵🇦","🇵🇪","🇵🇫","🇵🇬","🇵🇭","🇵🇰","🇵🇱","🇵🇲","🇵🇳","🇵🇷","🇵🇸","🇵🇹","🇵🇼","🇵🇾","🇶🇦","🇷🇪","🇷🇴","🇷🇸","🇷🇺","🇷🇼","🇸🇦","🇸🇧","🇸🇨","🇸🇩","🇸🇪","🇸🇬","🇸🇭","🇸🇮","🇸🇯","🇸🇰","🇸🇱","🇸🇲","🇸🇳","🇸🇴","🇸🇷","🇸🇸","🇸🇹","🇸🇻","🇸🇽","🇸🇾","🇸🇿","🇹🇦","🇹🇨","🇹🇩","🇹🇫","🇹🇬","🇹🇭","🇹🇯","🇹🇰","🇹🇱","🇹🇲","🇹🇳","🇹🇴","🇹🇷","🇹🇹","🇹🇻","🇹🇼","🇹🇿","🇺🇦","🇺🇬","🇺🇲","🇺🇸","🇺🇾","🇺🇿","🇻🇦","🇻🇨","🇻🇪","🇻🇬","🇻🇮","🇻🇳","🇻🇺","🇼🇫","🇼🇸","🇽🇰","🇾🇪","🇾🇹","🇿🇦","🇿🇲","🇿🇼");
let fullEmojiList = [];
let nEmojisGenerated = 0;
let nEmojisDrawn = 0;
let nFlagsGenerated = 0;
let nFlagsDrawn = 0;
let nTotalSymbols = 0;
let nCellsDrawn = 0;
let bDarkModeEnabled = false;

for (let listIndex = 0; listIndex < emojiCodeList.length; listIndex++) {
  let range = emojiCodeList[listIndex];
  for (let listValue = range[0]; listValue < range[1]; listValue++) {
    fullEmojiList[nEmojisGenerated] = "&#" + listValue + ";";
    nEmojisGenerated++;
  }
}

nFlagsGenerated = (flagCodeList.length);
nTotalSymbols = nFlagsGenerated + nEmojisGenerated;
printTableData(fullEmojiList, nEmojisGenerated, true);
printTableData(flagCodeList, nFlagsGenerated, false);
$("#txtDisplayEmojiCount").html("<b>nEmojis</b> = " + nEmojisGenerated);
$("#txtDisplayFlagCount").html("<b>nFlags</b> = " + nFlagsGenerated);
$("#txtDisplayTotalCount").html("<b>Total</b> = " + nTotalSymbols);

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

function printTableData(fullList, nGenerated, bEnablePrintButton) {
  for (let nDrawn = 0; nDrawn < nGenerated;) {
    let row = $('<tr></tr>');
    for (let cellValue = 0; cellValue < 10; cellValue++) {
      let cell = $('<td id = emoji-cell-' + nCellsDrawn + '></td>');
      $(cell).html(fullList[nDrawn]);
      $(cell).attr('title', 'Copy to clipboard (' + fullList[nDrawn] + ')');
      $(cell).addClass('emojiTableStyle');
      if( (nGenerated == fullList.length) && (bEnablePrintButton) ) {
        $(cell).html('<b><img src=images/menu.png id=btnDarkMode></b>');
        $(cell).attr('title','🌜 Click to toggle between dark and light mode 🌞');
        $(cell).attr('id', 'menuButtonCell');
      }
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

function printTableToConsole(emojis, iVal) {
  console.log(`|${iVal}|value|`);
  console.log(`|-----|-----|`)
  for(index = 0; index < (emojis.length-1); index++) {
    console.log(`| ${index} | ${emojis[index]} |`);
  }
}
