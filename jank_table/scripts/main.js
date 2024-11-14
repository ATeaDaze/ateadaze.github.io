// JaNK TaBLe: generate a table with loops to visualize an array
/* TODO: clean up variable names, store values for each cell in a new array (assignment and range errors),
    test with a static variable 1st (maybe use an object to store properties) */

// Maximum table size = nRows x nColumns (usable range 2:20, ideal range: 4:12)
const maxLengthTable = 10;
// Total number of cells = maxTableLength^2
const nTotalCells = maxLengthTable * maxLengthTable;
// Display strings: long and commonly-used (keep the main code clean)
const msgDebugRange = "[0][0]:[" + (maxLengthTable-1) + "][" + (maxLengthTable-1) + "]";
const msgDebugLength = maxLengthTable + "x" + maxLengthTable + " (" + nTotalCells + ")";
// Array index of hovered table cell
let activeI = 0;
let activeJ = 0;

$(document).ready(function() {
  $("#debugLength").html(msgDebugLength);
  $("#debugRange").html(msgDebugRange);
  // Draw table with given length
  drawWordTable(maxLengthTable);
    // Parse cell IDs on mouseover
    $("[id^=cell-]").on("mousemove", function() {
      let activeRowID = this.id;
      $("#debugCellID").html(activeRowID);
      // Remove "cell-" prefix from ID
      activeRowID = activeRowID.slice(5, activeRowID.length)
      // Separate X and Y values at the underscore
      activeRowID = activeRowID.split("_");
      // Print current values for i and j
      activeI = activeRowID[0];
      activeJ = activeRowID[1];
      let displayCoordsComma = "i=" + activeI + ", j=" + activeJ;
      $("#debugIJ").html(displayCoordsComma);
      $("#debugIJ").attr('title', displayCoordsComma);
      $("#debugFootnote").addClass("hidden");
    });
});

// Draw table (size = maxLen*maxLen)
function drawWordTable(maxLen) {
  let nRows = 0;
  while(nRows < maxLen) {
    let row = $("<tr></tr>");
    for(let nCols = 0; nCols < maxLen; nCols++) {
      let cell = $("<td id=cell-" + nCols + "_" + nRows + "></td>");
      $(cell).appendTo(row);
      // Print index in 2-dimensional array format
      let displayCoordsArray = "[" + nCols + "][" + nRows + "]"
      $(cell).html(displayCoordsArray);
      $(cell).attr('title', displayCoordsArray);
      // Color cell light gray if it has a 0
      if((nCols == 0) || (nRows == 0)) {
        $(cell).css({
          'background-color' : '#333333',
          'font-weight' : 'bold',
          'color' : 'orchid'
        });
        // Print pink header text ((i or j) == 0)
/*
        if(nRows == 0) {
          $(cell).html("i=="+nCols);
        } else {
          $(cell).html("j=="+nRows);
        }
*/
      }
      // Color cell dark gray if nCols=nRows (high priority: run last to overwrite any previous checks)
      if(nCols == nRows ) {
        $(cell).css({
          'background-color' : '#121212',
          'color' : 'chartreuse'
        });
        // Print green single digit along diagonal line (i == j)
//        $(cell).html("<b>" + nCols + "</b>");
      }

     }
     // Add row to table and move down to the next row
    $(row).appendTo(mainTable);
    nRows++;
  }
}
