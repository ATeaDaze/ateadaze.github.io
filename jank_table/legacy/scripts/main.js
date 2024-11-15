// Table template
let maxLengthTable = 10;
let currentX = 0;
let currentY = 0;

$(document).ready(function() {
  drawWordTable(maxLengthTable);
    $("[id^=cell-]").on("click", function() {
    let activeRowID = this.id;
      // Remove cell ID prefix
      activeRowID = activeRowID.slice(5, activeRowID.length)
      // Separate X and Y values at the underscore
      activeRowID = activeRowID.split("_");
      // x = activeRowID[0], y = activeRowID[1]
      currentX = activeRowID[0];
      currentY = activeRowID[1];
      $("#debugI").html(currentX);
      $("#debugJ").html(currentY);
      $("#debugRange").html(maxLengthTable + " (0:" + (maxLengthTable-1) + ")");
      $("#debugCoords").html("[" + currentX + "][" + currentY + "]");
    });
});

function drawWordTable(maxLen) {
let y = 0;
  while(y < maxLen) {
    let row = $("<tr></tr>");
    for(let x = 0; x < maxLen; x++) {
      let cell = $("<td id=cell-" + x + "_" + y + "></td>");
      $(cell).appendTo(row);
//      $(cell).html("(" + x + "," + y + ")");
      $(cell).html("[" + x + "][" + y + "]");
      $(cell).attr('title', x + ", " + y);
      // Color cell light gray if it has a 0
      if((x == 0) || (y == 0)) {        
        if(y == 0) {
          $(cell).html("i="+x);
        } else {
          $(cell).html("j="+y);
        }
        $(cell).css({
          'background-color' : '#333333'
        });
      }
      // Color cell dark gray if x=y
      if(x == y ) {
        $(cell).css({
          'background-color' : '#121212'
        });
        $(cell).html("<b>" + x + "</b>");
      }

     }
    $(row).appendTo(mainGameBoard);
    y++;
  }
}

/* Table cell IDs: cell-{xy}
00, 10, 20, 30...
01, 11, 21, 31...
02, 12, 22, 32...
*/
