// Default brush size: larger values add more color but can obscure finer details and patterns if set too high
const brushSize = 2.75;
// Palette list: cycles through each element (resets to the first element if the last element is called)
const paletteList = new Array('faded', 'rainbow', 'fire', 'ice', 'rgb', 'cmy', 'cga', 'cga16', 'pyxel', 'gb', 'usa', 'grayscale');
// Rainbow with desaturated colors (pastel)
const randFadedColor = new Array("indianred", "coral", "khaki", "#90ee90", "dodgerblue", "#5d3fd3", "#cf9fff");
// Rainbow with classic colors (primary)
const randRainbowColor = new Array("red", "orange", "yellow", "green", "blue", "indigo", "mediumorchid");
// Fire: deep red, orange red, red orange, and pale yellow
const randFireColor = new Array("firebrick", "orangered", "#ffaa33", "khaki");
// Ice: shades of blue with a touch of white and pale green
const randIceColor = new Array("blue", "dodgerblue", "#088f8f", "#98fB98", "darkblue", "#dddddd");
// RGB and CMY: both palettes use the same array with offsets to call them separately (RGB = 0:2, CMY = 3:5)
const randRGBCMYColor = new Array("#ff0000", "#00ff00", "#0000ff", "#55ffff", "#ff55ff", "#ffff55");
// Patriot: red, white, and blue
const randPatriotColor = new Array("#b31942", "#ffffff", "#0a3161");
// Grayscale: dim gray to off-white
const randGrayscaleColor = new Array("#1e1e1e", "#3e3e3e", "#5e5e5e", "#7e7e7e", "#9b9b9b", "#b2b2b2", "#c2c2c2", "#d5d5d5");
// CGA = first 8 elements (intense colors), CGA-16 = all 15 elements (uses brown instead of dark yellow)
const randCGAColor = new Array(	"#5555ff", "#55ffff", "#55ff55", "#ff5555", "#ff55ff", "#ffff55", "#ffffff", "#555555",
																"#0000aa", "#00aaaa", "#00aa00", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa");
// Pyxel: default color palette for pyxeledit.com (1st element not called as pure black is overpowering)
const randPyxelColor = new Array(	"#9b9b9b", "#fdfdfd", "#de6e89", "#bc2532", "#493c2b", "#a26321", "#e98730", "#f5e06a",
																	"#a1cc26", "#44891a", "#2f484e", "#1b2632", "#005784", "#31a2f2", "#b0daed");
const randGameBoyColor = new Array("#003f00", "#2e7320", "#688c07", "#a0cf0a");
// Default color palette = 1st element (faded)
var activeColorMode = paletteList[0];
// Array index used for palette swapping
var i = 0;
// Used for the random palette select function
var randomPaletteIndex;
// Runtime values for setting and tracking script states
var bIsRunning = false;
var bScreenIsClear = true;
var bDisablePhotoWarning = false;
var bEnableRandomPalette = false;
// Used for random lines: (x1,y2),(x2,y2)
var x1, y1, x2, y2;
// Set center as default origin for starburst animation on an 800x500 canvas (center = width/2)
var xOrigin = 400, yOrigin = 250;
// Default mouse cursor position
var xPos = 0, yPos = 0;
// Animations are started manually so this starts at 0
var animationSpeed = 0;
// Adds more random variation to triangles
var randomTriangleLength, randomTriangleOffset;
// Default animation shape (triangle, line, starburst)
var shapeType = 'triangle';
// Counts number of shapes drawn for help screen
var nBackgroundLinesDrawn;
// Used for confirmation dialog
var r;

// Draw random shape at the mouse cursor
function drawShape()
{
		// Check for mouse movement
		canvas.addEventListener('touchmove', e => {
		// Disable health warning if mouse is moved over the canvas
		bDisablePhotoWarning = true;
		// Store mouse cursor position
  	const rect = canvas.getBoundingClientRect();
		xPos = Math.round(e.touches[0].clientX)-rect.left;
		yPos = Math.round(e.touches[0].clientY)-rect.top;
		// Update X and Y values on the UI
		updateCoords();
		// Two random numbers for a line with 18 extra pixels on the edges for coverage (-9:809, -9:509)
		x1 = Math.floor(Math.random() * 820)-10;
		y1 = Math.floor(Math.random() * 520)-10;
		ctx.beginPath();
		setBrushColor();
		ctx.lineWidth = brushSize;
		// Draw line from mouse cursor to a random point
		if(shapeType == 'line') {
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(x1, y1);
			ctx.stroke();
			ctx.closePath();
		} else if(shapeType == 'triangle') {
			// Draw triangle originating from mouse cursor
			randomTriangleLength = Math.floor(Math.random() * 30)+5;
			randomTriangleOffset = Math.floor(Math.random() * 35)+5;
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(x1, y1);
			ctx.lineTo(x1+randomTriangleOffset,y1+randomTriangleLength);
			ctx.closePath();
			ctx.stroke();
		} else {
			// Store current mouse cursor position as new origin if a button is clicked
			canvas.addEventListener('touchdown', e => {
				xOrigin = xPos;
				yOrigin = yPos;
			})
			// Draw line from the origin to the mouse cursor
			ctx.moveTo(xOrigin,yOrigin);
			ctx.lineTo(xPos,yPos);
			ctx.closePath();
			ctx.stroke();
		}
		ctx.fill();
		bScreenIsClear = false;
		})
}

// Run animation without user input
function runAnimation()
{
	window.requestAnimationFrame(function loop() {
		x1 = Math.floor(Math.random() * 820)-10;
		y1 = Math.floor(Math.random() * 520)-10;
		ctx.beginPath();
		setBrushColor();
		ctx.lineWidth = brushSize;
		if(shapeType == 'triangle') {
			x2 = Math.floor(Math.random() * 820)-10;
			y2 = Math.floor(Math.random() * 520)-10;
			drawRandomTriangle();
		} else if(shapeType == 'line') {
			x2 = Math.floor(Math.random() * 820)-10;
			y2 = Math.floor(Math.random() * 520)-10;
			drawRandomLine();
		} else {
			shapeType = 'starburst'
			drawStarburstLine();
		}
		// Pause animation
		if(!bIsRunning) return;
		window.requestAnimationFrame(loop);
	})
	bScreenIsClear = false;
}

function drawRandomLine()
{
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

function drawRandomTriangle()
{
	randomTriangleLength = Math.floor(Math.random() * 30)+5;
	randomTriangleOffset = Math.floor(Math.random() * 35)+5;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x1+randomTriangleOffset, y1+randomTriangleLength);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}

function drawStarburstLine()
{
	x1 = Math.floor(Math.random() * 820)-10;
	y1 = Math.floor(Math.random() * 520)-10;
	ctx.moveTo(xOrigin, yOrigin);
	ctx.lineTo(x1, y1);
	ctx.stroke();
	ctx.closePath();
}

// Set active brush color, update palette button and palette UI text
function setBrushColor()
{
	var btn10 = document.getElementById("button10");
	var divclr = document.getElementById("divColorMode");
	btn10.style = "filter:saturate(100%)";
	switch(activeColorMode) {
		case 'faded':
			currentColor = Math.floor(Math.random() * 7);
			ctx.strokeStyle = randFadedColor[currentColor];
			divColorMode.innerHTML = "Faded";
			btn10.style = "filter:saturate(45%)";
			divclr.style.color = "#d7b1ff"
			btn10.innerHTML = "🌈";
			rainbowBanner.style = "background-image:linear-gradient(to left, indianred, coral, khaki, #90ee90, dodgerblue, #5d3fd3, #cf9fff);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 Colorful but not overpowering";
			break;
		case 'rainbow':
			currentColor = Math.floor(Math.random() * 7);
			ctx.strokeStyle = randRainbowColor[currentColor];
			divColorMode.innerHTML = "Rainbow";
			divclr.style.color = "#8f7be1";
			btn10.innerHTML = "🌈"
			rainbowBanner.style = "background-image:linear-gradient(to left, red, orange, yellow, green, blue, indigo, mediumorchid);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 The classics never fade";
			break;
		case 'fire':
			currentColor = Math.floor(Math.random() * 4);
			ctx.strokeStyle = randFireColor[currentColor];
			divColorMode.innerHTML = "Fire";
			divclr.style.color = "coral";
			btn10.innerHTML = "🔥";
			rainbowBanner.style = "background-image:linear-gradient(to right, firebrick, orangered, #FFAA33, khaki);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 💥 Warm but not necessarily inviting";
			break;
		case 'ice':
			currentColor = Math.floor(Math.random() * 6);
			ctx.strokeStyle = randIceColor[currentColor];
			divColorMode.innerHTML = "Ice";
			divclr.style.color = "dodgerblue"
			btn10.innerHTML = "🧊";
			rainbowBanner.style = "background-image:linear-gradient(to right, darkblue, blue, dodgerblue, #088f8f, #98fB98, #bbbbbb);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍹 Cool and refreshing";
			break;
		case 'rgb':
			currentColor = Math.floor(Math.random() * 3);
			ctx.strokeStyle = randRGBCMYColor[currentColor];
			divColorMode.innerHTML = "R G B";
			divclr.style.color = "#00ff00"
			btn10.innerHTML = "📊";
			rainbowBanner.style = "background-image:linear-gradient(to left, #ff0000, #00ff00, #0000ff);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🖥️ How your monitor views the world";
			break;
		case 'cmy':
			currentColor = Math.floor(Math.random() * 3) + 3;
			ctx.strokeStyle = randRGBCMYColor[currentColor];
			divColorMode.innerHTML = "C M Y";
			divclr.style.color = "#ff55ff"
			btn10.innerHTML = "✨";
			rainbowBanner.style = "background-image:linear-gradient(to right, #55ffff, #ff55ff, #ffff55);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🖨️ How your printer views the world";
			break;
		case 'cga':
			currentColor = Math.floor(Math.random() * 8);
			ctx.strokeStyle = randCGAColor[currentColor];
			divColorMode.innerHTML = "CGA-8";
			divclr.style.color = "#5555ff";
			btn10.innerHTML = "🦜";
			rainbowBanner.style = "background-image:linear-gradient(to right, #5555ff, #55ffff, #55ff55, #ff5555, #ff55ff, #ffff55, #ffffff, #555555);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 An 8-color palette used by old PC/DOS games (minus black)";
			break;
		case 'cga16':
			currentColor = Math.floor(Math.random() * 15);
			ctx.strokeStyle = randCGAColor[currentColor];
	 		divColorMode.innerHTML = "CGA-16";
			btn10.style = "filter:saturate(50%)";
		 	btn10.innerHTML = "🦜";
		 	divclr.style.color = "#55ffff";
			rainbowBanner.style = "background-image:linear-gradient(to right, #0000aa, #00aaaa, #00aa00, #aa0000, #aa00aa, #aa5500, #aaaaaa, #5555ff, #55ffff, #55ff55, #ff5555, #ff55ff, #ffff55, #ffffff, #555555);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 Full 16-color CGA palette (minus pure black)";
			break;
		case 'pyxel':
		 	currentColor = Math.floor(Math.random() * 15);
		 	ctx.strokeStyle = randPyxelColor[currentColor];
			divColorMode.innerHTML = "Pyxel";
			divclr.style.color = "#de6e89"
			btn10.innerHTML = "🎨";
 			rainbowBanner.style = "background-image:linear-gradient(to left, #9b9b9b, #fdfdfd, #de6e89, #bc2532, #493C2B, #A26321, #E98730, #F5E06A, #A1CC26, #44891A, #2F484E, #1B2632, #005784, #31A2F2, #B0DAED);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 Default color palette for 'Pyxel Edit' (minus black)";
			break;
		case 'gb':
			currentColor = Math.floor(Math.random() * 4);
			ctx.strokeStyle = randGameBoyColor[currentColor];
			divColorMode.innerHTML = "Gameboy";
			divclr.style.color = "#eeeeee";
			btn10.style = "background-color: #777777;";
			btn10.innerHTML = "🟩";
 			rainbowBanner.style = "background-image:linear-gradient(to right, #003f00 25%, #2e7320 25% 50%, #688c07 50% 75%, #a0cf0a 75% 100%);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 It's just as beautiful and hideous as I remember";
			break;
		case 'usa':
			currentColor = Math.floor(Math.random() * 3);
			ctx.strokeStyle = randPatriotColor[currentColor];
			divColorMode.innerHTML = "Patriot";
			divclr.style.color = "#457bbc";
			btn10.innerHTML = "🧨";
			rainbowBanner.style = "background-image:linear-gradient(to left, #b31942, #ffffff, #0a3161)";
			rainbowBanner.title = "Rainbow Noise 🍔 Taste the freedom";
			break;
		case 'grayscale':
			currentColor = Math.floor(Math.random() * 8);
			ctx.strokeStyle = randGrayscaleColor[currentColor];
			divColorMode.innerHTML = "Grayscale";
			divclr.style.color = "#888888";
			btn10.innerHTML = "🏁";
			rainbowBanner.style = "background-image:linear-gradient(to right, #1e1e1e, #3e3e3e, #5e5e5e, #7e7e7e, #9b9b9b, #b2b2b2, #c2c2c2, #d5d5d5)";
			rainbowBanner.title = "Rainbow Noise 🍭 Every color from dim gray to off-white";
			break;
		default:
			break;
		}
updateUI();
}

// Update button style, animation speed, and banner
function updateUI()
{
	var btn1 = document.getElementById("button1");
	var btn2 = document.getElementById("button2");
	var btn4 = document.getElementById("button4");
	var btn5 = document.getElementById("button5");
	var btn6 = document.getElementById("button6");
	// Set colors for shape and animation buttons
	if(bIsRunning) {
		btn1.style.color = "palegreen";
		btn2.style.color = "white";
	} else {
		btn2.style.color = "indianred";
		btn1.style.color = "white";
	}
	btn4.style.color = "white";
	btn5.style.color = "white";
	btn6.style.color = "white";
	if(shapeType == 'triangle') {
		btn4.style.color = "violet";
	} else if(shapeType == 'line') {
		btn5.style.color = "violet";
	} else {
		btn6.style.color = "violet";
		shapeType == 'starburst';
	}
	divSpeed.innerHTML = "Speed: " + animationSpeed + "x";
	// Display color commentary in the banner
 	if((animationSpeed > 0) && (animationSpeed < 6)) {
			bDisablePhotoWarning = true;
			rainbowBanner.innerHTML = "Rainbow Noise 🍀 Running at an optimal speed (1:5)";
	} else if((animationSpeed > 9) && (animationSpeed < 25)) {
			rainbowBanner.innerHTML = "Rainbow Noise 🌪️ Things are about to get a bit hectic...";
	} else if((animationSpeed > 24) && (animationSpeed < 50)) {
			rainbowBanner.innerHTML = "Rainbow Noise 🧬 Static and white noise are both made of random data points";
	} else if((animationSpeed > 49) && (animationSpeed < 75)) {
			rainbowBanner.innerHTML = "🌠 Random Rainbows 🪐 Jupiter and Beyond the Infinite 🌟";
	} else if((animationSpeed > 74) && (animationSpeed < 100)) {
			rainbowBanner.innerHTML = "Rainbow Noise? ☕ Frankly, 'Random Rainbows' and 'RGB Noise' seemed too long";
	} else if(animationSpeed > 99) {
			rainbowBanner.innerHTML = "💫 Migraine Simulator 2021  👑 " + animationSpeed + "x speed? Legendary. You absolute madlad";
	}	else if((!bDisablePhotoWarning) && (animationSpeed == 0)) {
				rainbowBanner.innerHTML = "⚠ Photosensitivity Warning: this app generates rapid and colorful patterns";
				rainbowBanner.title = "⚠ Photosensitivity Warning: click the banner, draw on the canvas, or start animation to dismiss";
				rainbowBanner.style = "background-image:linear-gradient(to right, firebrick, maroon, red)";
		} else {
			rainbowBanner.innerHTML = "Rainbow Noise 🎲 Draw with random shapes, animate them, or both";
			rainbowBanner.title = "Rainbow Noise 🎲 Colored lines create positive space";
		}
}

// Use a random color palette on page load
function setRandomPalette()
{
	randomPaletteIndex = Math.floor(Math.random() * 12)
	activeColorMode = paletteList[randomPaletteIndex];
	updateUI();
}

// Keyboard shortcuts
function getKeyboardInput()
{
	document.addEventListener('keypress', e => {
		switch(e.key) {
			case 'r':
				bIsRunning = true;
				animationSpeed++;
				runAnimation();
				break;
			case 'p':
				bIsRunning = false;
				pauseAnimation();
				break;
			case 'c':
				clearScreen();
				break;
			case 's':
				shapeType = 'starburst'
				break;
			case 'l':
				shapeType = 'line'
				break;
			case 't':
				shapeType = 'triangle'
				break;
			case 'o':
				xOrigin = 400;
				yOrigin = 250;
				break;
			case 'h':
				confirmCanvasOverwrite();
				break;
			case 'e':
				printCanvas();
				break;
			case 'g':
				activeColorMode = 'grayscale';
				break;
			case 'a':
				activeColorMode = 'rainbow';
				break;
			case 'f':
				activeColorMode = 'fire';
				break;
			case 'i':
				activeColorMode = 'ice';
				break;
			case 'b':
				activeColorMode = 'rgb';
				break;
			case 'm':
				activeColorMode = 'cmy';
				break;
			case 'd':
				activeColorMode = 'faded';
				break;
			case '8':
				activeColorMode = 'cga';
				break;
				case 'x':
					activeColorMode = 'pyxel';
					break;
			case '6':
				activeColorMode = 'cga16';
				break;
			case 'y':
				activeColorMode = 'gb';
				break;
			case '*':
				setRandomPalette();
				break;
			case ' ':
				swapColorMode();
				break;
			default:
				break;
		}
	setBrushColor();
	updateCoords();
	updateUI();
	})
}

function clearScreen()
{
	ctx.fillRect(0, 0, 800, 500); // Set the canvas to a solid black 800x500 rectangle
	if(!bIsRunning) bScreenIsClear = true; // Allows screen clearing without stopping the animation
}

function pauseAnimation()
{
	bIsRunning = false;
	bScreenIsClear = false;
	animationSpeed = 0;
}

// Draw current mouse coordinates below the title
function updateCoords()
{
	divCoordsX.innerHTML = "X = " + xPos;
	divCoordsY.innerHTML = "Y = " + yPos;
}

// Revisit the looping structure of this entire app
function newAnimationInstance()
{
	bIsRunning = true;
	animationSpeed++;
	setBrushColor();
	updateUI();
	runAnimation();
	bScreenIsClear = false;
}

// Cycle through available color palettes
function swapColorMode()
{
	if(i == 11){	// Reset index to the start if the last element is called
		i = 0;
	} else {	// Otherwise increment the counter by 1 for the next palette
		i++;
	}
	activeColorMode = paletteList[i];	// Set active color palette, regardless
	setBrushColor();
	updateUI();
}

function drawMenuBackground()
{
	nBackgroundLinesDrawn = 0;
	// Draw 256 triangles in the selected color as a background
	while(nBackgroundLinesDrawn <= 256) {
		x1 = Math.floor(Math.random() * 820)-10;
		y1 = Math.floor(Math.random() * 520)-10;
		x2 = Math.floor(Math.random() * 820)-10;
		y2 = Math.floor(Math.random() * 520)-10;
		ctx.beginPath();
		setBrushColor();
		ctx.lineWidth = brushSize;
		drawRandomTriangle();
		nBackgroundLinesDrawn++;
	}
}

function drawHelpScreen()
{
	drawMenuBackground();
	ctx.fillStyle = "#222222";
	ctx.fillRect(60, 105, (canvas.width-120), 50);
	ctx.fillStyle = "#eeeeee";
	ctx.font = "bold 28px Arial";
	ctx.fillText("Rainbow Noise", leftTextOffset, textMidpoint-123);
	ctx.fillStyle = "#111111";
	ctx.fillRect(60, 175, (canvas.width-120), 195);
	ctx.font = "bold 25px Arial";
	ctx.fillStyle = "#dddddd";
	ctx.fillText("Jeff McMillin", leftTextOffset+500,textMidpoint-123);
	ctx.fillStyle = "white";
	ctx.font = "bold 21px Arial";
	ctx.fillText("✓  Move your mouse over the canvas to paint with shapes", leftTextOffset, textMidpoint-60);
	ctx.fillText("✓  Press RUN repeatedly to increase the animation speed", leftTextOffset, textMidpoint-30);
	ctx.fillText("✓  Click the canvas to set a new origin for the starburst animation", leftTextOffset, textMidpoint);
	ctx.fillText("✓  You can draw on the canvas while the animation is running", leftTextOffset, textMidpoint+30);
	ctx.fillText("✓  Animations generally look smoother between 1x and 5x speed", leftTextOffset, textMidpoint+60);
	ctx.fillText("✓  Press spacebar to select the next color palette", leftTextOffset, textMidpoint+90);
	ctx.fillStyle = "black";
	bScreenIsClear = true;
}

function confirmCanvasOverwrite()
{
	if(!bScreenIsClear) {
		r = confirm("Animation will pause and instructions will partially overwrite the canvas. Overwrite?");
		if (r == true) {
			pauseAnimation();
			drawHelpScreen();
			bScreenIsClear = true;
		}
	} else {
		drawHelpScreen();
		}
}
