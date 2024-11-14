# JaNK&nbsp;<a href="https://ateadaze.github.io/jank_table/"><img src="images/logo-512.png" width="50" title="JaNK TaBLe"></a>&nbsp;TaBLe
## Visualize a 2-dimensional array with a table

## `main.js`

```javascript
// ...
// LINE 5: Maximum table size = nRows x nColumns (usable range 2:20, ideal range: 4:12)
const maxLengthTable = 10; // Maximum table size: nRows == nColumns
const nTotalCells = maxLengthTable * maxLengthTable; // Total number of cells = (nRows x nColumns) = maxTableLength^2
let activeI = 0; // Array index of hovered table cell (i, j)
let activeJ = 0;
// Display strings: long and commonly-used text
let msgDebugRange = "[0][0]:[" + (maxLengthTable-1) + "][" + (maxLengthTable-1) + "]"; // [0][0]:[9][9]
let msgDebugLength = maxLengthTable + "x" + maxLengthTable + " (" + nTotalCells + ")"; // 10x10 (100)

// ...
// LINE 22: $("[id^=cell-]").on("mousemove", function() {
let activeRowID = this.id;
let displayCoordsComma = "i=" + activeI + ", j=" + activeJ;

// ...
// LINE 40: function drawTable(maxLen) {
let nRows = 0; // Number of rows in table
// ...
let nCols = nRows;
// ...
let row = $("<tr></tr>"); // HTML for table row
let cell = $("<td id=cell-" + nCols + "_" + nRows + "></td>"); // HTML for table cell
let displayCoordsArray = "[" + nCols + "][" + nRows + "]" // [0][0]:[9][9]
// ...

```

|Name|Value|Description|Type|
|--:|---|---|---|
|`maxLengthTable`|10 (0:9)|Maximum table size|Integer|
|`nTotalCells`|`maxLengthTable`<sup>2</sup>|Total number of cells|Integer|
|`activeI`|*undefined*|Current array index of i|Integer|
|`activeJ`|*undefined*|Current array index of j|Integer|
|`activeRowID`|<i>this</i>.id|Current mouse hover cell: `$("[id^=cell-]")`|Object ID|

### `main.js`&nbsp;&gt;&nbsp;Longer Strings

|Name|Value / Format|Description|
|--:|---|---|
|`msgDebugRange`|`"[0][0]:[" + (maxLengthTable-1) + "][" + (maxLengthTable-1) + "]";`|Debug range format|
|`msgDebugLength`|`maxLengthTable + "x" + maxLengthTable + " (" + nTotalCells + ")";`|Debug length format|
|`displayCoordsComma`|`"i=" + activeI + ", j=" + activeJ;` (ex: `i=0, j=0`)|Mouse Coordinates|

## `main.js`&nbsp;&gt;&nbsp;`drawTable(maxLen)`

|Name|Value|Description|Type|
|--:|---|---|---|
|`maxLen`|`maxLengthTable`|Maximum table size|Integer|
|`nRows`|`0:maxLen-1`|Total number of rows|Integer|
|`nCols`|`nRows`|Total number of columns|Integer|
|&nbsp;|&nbsp;|&nbsp;|**Element**|
|`row`|<i>undefined</i>|Create a new row|`<tr>`
|`cell`|ID=`cell-i_j`|Create a new cell|`<td>`|

## `main.js`&nbsp;&gt;&nbsp;`drawTable(maxLen)`&nbsp;&gt;&nbsp;Longer Strings

|Name|Value / Format|Description|Type|
|--:|---|---|---|
|`displayCoordsArray`| `"[" + nCols + "][" + nRows + "]"`|Current display coordinates (ex: `[i][j]`)|String|

## HTML&nbsp;&gt;&nbsp;Elements and IDs

|Name|Description|Element|
|--:|---|---|
|`debugTable`|Main debug table|`<table>`|
|`debugCellID`|Current table cell ID|`<td>`|
|`debugIJ`|Current array index for cell|`<td>`|
|`debugLength`|Length of table|`text`|
|`debugRange`|Total range of table values|`(td).html()`|
|`colorKeyHeader`|Header style, i or j == 0 (pink)|`(td).css()`
|`colorKeyDiagonal`|Diagonal style, i==j (green)|`(td).css`
|`colorKeyDefault`|Default cell text style|`(td).css`
|`mainTable`|Main table for output|`<table>`
|`debugFootnote`|Footnotes for additional hints|`(td).html`

## Array Diagram

```javascript
// Table array indices (maxLengthTable = 10 | 0:9)
[0][0]  [1][0]  [2][0]  [3][0]  [4][0]  [5][0]  [6][0]  [7][0]  [8][0]  [9][0]
[0][1]  [1][1]  [2][1]  [3][1]  [4][1]  [5][1]  [6][1]  [7][1]  [8][1]  [9][1]
[0][2]  [1][2]  [2][2]  [3][2]  [4][2]  [5][2]  [6][2]  [7][2]  [8][2]  [9][2]
[0][3]  [1][3]  [2][3]  [3][3]  [4][3]  [5][3]  [6][3]  [7][3]  [8][3]  [9][3]
[0][4]  [1][4]  [2][4]  [3][4]  [4][4]  [5][4]  [6][4]  [7][4]  [8][4]  [9][4]
[0][5]  [1][5]  [2][5]  [3][5]  [4][5]  [5][5]  [6][5]  [7][5]  [8][5]  [9][5]
[0][6]  [1][6]  [2][6]  [3][6]  [4][6]  [5][6]  [6][6]  [7][6]  [8][6]  [9][6]
[0][7]  [1][7]  [2][7]  [3][7]  [4][7]  [5][7]  [6][7]  [7][7]  [8][7]  [9][7]
[0][8]  [1][8]  [2][8]  [3][8]  [4][8]  [5][8]  [6][8]  [7][8]  [8][8]  [9][8]
[0][9]  [1][9]  [2][9]  [3][9]  [4][9]  [5][9]  [6][9]  [7][9]  [8][9]  [9][9]
```

```
/* Table cell IDs: cell-{xy}
00, 10, 20, 30...
01, 11, 21, 31...
02, 12, 22, 32...
*/
```

## TODO

### Priority

* [ ] Store values for each cell in a new array (assignment and range errors)
* [ ] Test with a static variable 1st (maybe use an object to store properties)
* [ ] Clean up variable names
  * [ ] **JavaScript:** [main.js](../scripts/main.js)
  * [ ] **StyleSheet:** [jank_table.css](../styles/jank_table.css)
  * [ ] **HTML:** [index.html](../index.html)

Example Format and Range:
```javascript
// maxTableLength = 10, total range = [0][0]:[9][9]
mainTableCell[0][0] ... mainTableCell[maxTableLength][maxTableLength]
```

### Low Priority

* [ ] Implement user input to populate table
* [ ] Allow editing of table contents

### User Interface
* [X] Color-code and edit HTML of header and diagonal cells
    * [X] Header Cells: `i or j == 0`
    * [X] Diagonal Cells: `i == j` (overwrite header cell colors)
* [X] Create a basic legend for the cell colors
* [ ] Alternate background shading for rows

* [X] Display debug information in a table

## Optional
* [ ] Allow editing of table contents
* [ ] Alternate background shading for rows
