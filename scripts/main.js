// Rainbow Noise: draw random shapes with the mouse or animate them automatically
// TODO: improve overall structure and flow
// Default brush size: larger values add more color but can obscure finer details and patterns if set too high
const brushSize = 3.25;
// Palette list: cycles through each element (resets to the first element if the last element is called)
const paletteList = new Array('faded', 'rainbow', 'fire', 'ice', 'rgb', 'cmy', 'cga', 'cga16', 'pyxel', 'gb', 'usa', 'grayscale');
// Rainbow with desaturated colors
const randFadedColor = new Array("indianred", "coral", "khaki", "#90ee90", "dodgerblue", "#5d3fd3", "#cf9fff");
// Rainbow with classic primary colors (ROYGBIV)
const randRainbowColor = new Array("red", "orange", "yellow", "green", "blue", "indigo", "mediumorchid");
// Fire: deep red, orange red, red orange, and pale yellow
const randFireColor = new Array("firebrick", "orangered", "#ffaa33", "khaki");
// Ice: shades of blue with hints of white and pale green
const randIceColor = new Array("blue", "dodgerblue", "#088f8f", "#98fB98", "darkblue", "#dddddd");
// RGB and CMY: both palettes use the same array with offsets to call them separately (RGB = 0:2, CMY = 3:5)
const randRGBCMYColor = new Array("#ff0000", "#00ff00", "#0000ff", "#55ffff", "#ff55ff", "#ffff55");
// Patriot: red, white, and blue
const randPatriotColor = new Array("#b31942", "#ffffff", "#0a3161");
// Grayscale: dim gray to off-white
const randGrayscaleColor = new Array(	"#1e1e1e", "#3e3e3e", "#5e5e5e", "#7e7e7e", "#9b9b9b", "#b2b2b2", "#c2c2c2", "#d5d5d5");
// CGA-8 = intense colors = first 8 elements (0:7), CGA-16 = all 15 colors (0:14)
const randCGAColor = new Array(	"#5555ff", "#55ffff", "#55ff55", "#ff5555", "#ff55ff", "#ffff55", "#ffffff", "#555555", "#0000aa", "#00aaaa", "#00aa00", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa");
// Pyxel: default color palette for pyxeledit.com (no pure black as it creates too much negative space)
const randPyxelColor = new Array( "#9b9b9b", "#fdfdfd", "#de6e89", "#bc2532", "#493c2b", "#a26321", "#e98730", "#f5e06a", "#a1cc26", "#44891a", "#2f484e", "#1b2632", "#005784", "#31a2f2", "#b0daed");
// Gameboy: mostly official colors for the classic hand-held (3rd color is darkened as it was indistinguishable from the last one on a modern monitor)
const randGameBoyColor = new Array("#003f00", "#2e7320", "#688c07", "#a0cf0a");
// Array index used for palette swapping (0:11)
let i = 0;
// Default color palette, i = 0, 1st element = palleteList[0] = 'faded'
let activeColorMode = paletteList[i];
// Array index for selecting a random palette
let randomPaletteIndex;
// Runtime values for setting and tracking script states
let bIsRunning = false;
// Used to minimize the number of confirmation prompts
let bScreenIsClear = true;
// Enable or disable the Photosensitivity warning
let bDisablePhotoWarning = false;
// Select a random palette on page load if set to true
let bEnableRandomPalette = false;
// Draw shapes on the canvas while true
let bEnableDrawing = false;
// Set center as default origin for starburst animation on an 1000x500 canvas (center = length/2)
let xOrigin = 500;
let yOrigin = 250;
// Default mouse cursor position
let xPos = 0;
let yPos = 0;
// Animations are started manually so this starts at 0
let animationSpeed = 0;
// Default animation shape (triangle, line, starburst)
let shapeType = 'triangle';
// Adds more random variation to triangles
let randomTriangleLength, randomTriangleOffset;
// Counts number of shapes drawn for help screen (255 drawn by default)
let nBackgroundShapesDrawn;
// Used for random lines (x1,y1),(x2,y2)
let x1, y1, x2, y2;

// Draw random shape at the mouse cursor
function drawShape()
{
		// Check for mouse movement
		document.addEventListener('mousemove', e => {
			// Store mouse cursor position minus margin offset
			xPos = Math.round(e.clientX - rect.left);
			yPos = Math.round(e.clientY - rect.top);
			// Enable drawing on mousedown
			canvas.addEventListener('mousedown', e => {
				bEnableDrawing = true;
				// Store mouse cursor location as the new origin for starburst
				xOrigin = xPos;
				yOrigin = yPos;
			})
			// Draw a shape if drawing mode is enabled
			if(bEnableDrawing) {
				// Update mouse X,Y values on the UI
				updateCoords();
				// Random point (x1,y1): Two random numbers for lines with 10 extra pixels on the edges for coverage (-10:1009, -10:509)
				// TODO: make a random number function to reduce repeated Math.random() calls: getRandomNumber(x,y); | x = upper limit, y = offset
				x1 = Math.floor(Math.random() * 1020)-10;
				y1 = Math.floor(Math.random() * 520)-10;
				ctx.beginPath();
				setBrushColor();
				ctx.lineWidth = brushSize;
				// Line scatter: draw line from mouse cursor to a random point
				if(shapeType == 'line') {
					ctx.moveTo(xPos, yPos);
					ctx.lineTo(x1, y1);
					ctx.stroke();
					ctx.closePath();
				} else if(shapeType == 'triangle') {
					// Triangle web: draw triangle originating from mouse cursor
					randomTriangleLength = Math.floor(Math.random() * 30)+5;
					randomTriangleOffset = Math.floor(Math.random() * 35)+5;
					ctx.moveTo(xPos, yPos);
					ctx.lineTo(x1, y1);
					ctx.lineTo(x1+randomTriangleOffset,y1+randomTriangleLength);
					ctx.closePath();
					ctx.stroke();
					// Fill triangle with black to create more negative space (too similar to line scatter w/out the fill)
					ctx.fill();
				} else {
					// Starburst: draw line from origin point to mouse cursor
					ctx.moveTo(xOrigin,yOrigin);
					ctx.lineTo(xPos,yPos);
					ctx.closePath();
					ctx.stroke();
				}
			}
			// Disable drawing on mouseup
			canvas.addEventListener('mouseup', e => {
				bEnableDrawing = false;
				bScreenIsClear = false;
			})
	})
}

// Run animation without user input
function runAnimation()
{
	window.requestAnimationFrame(function loop() {
		x1 = Math.floor(Math.random() * 1020)-10;
		y1 = Math.floor(Math.random() * 520)-10;
		ctx.beginPath();
		setBrushColor();
		ctx.lineWidth = brushSize;
		if(shapeType == 'triangle') {
			drawRandomTriangle();
		} else if(shapeType == 'line') {
			drawRandomLine();
		} else {
			drawStarburstLine();
		}
		// Loop animation until bIsRunning=false
		if(!bIsRunning) return;
		window.requestAnimationFrame(loop);
	})
	bScreenIsClear = false;
}

// Random line = (x1,y1), (x2,y2)
function drawRandomLine()
{
	x2 = Math.floor(Math.random() * 1020)-10;
	y2 = Math.floor(Math.random() * 520)-10;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

// Random triangle = (x1,y1), (x2,y2), (x1+randomOffset(35)),y1+randomLength(40))
function drawRandomTriangle()
{
	x2 = Math.floor(Math.random() * 1020)-10;
	y2 = Math.floor(Math.random() * 520)-10;
	randomTriangleLength = Math.floor(Math.random() * 30)+5;
	randomTriangleOffset = Math.floor(Math.random() * 35)+5;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x1+randomTriangleOffset, y1+randomTriangleLength);
	ctx.closePath();
	ctx.stroke();
	// Fill triangle with black
	ctx.fill();
}

// Random starburst line = (xOrigin,yOrigin), (x1,y1)
function drawStarburstLine()
{
	ctx.moveTo(xOrigin, yOrigin);
	ctx.lineTo(x1, y1);
	ctx.stroke();
	ctx.closePath();
}

// Select random brush color from active palette
function setBrushColor()
{
	switch(activeColorMode) {
		case 'faded':
			currentColor = Math.floor(Math.random() * 7);
			ctx.strokeStyle = randFadedColor[currentColor];
			break;
		case 'rainbow':
			currentColor = Math.floor(Math.random() * 7);
			ctx.strokeStyle = randRainbowColor[currentColor];
			break;
		case 'fire':
			currentColor = Math.floor(Math.random() * 4);
			ctx.strokeStyle = randFireColor[currentColor];
			break;
		case 'ice':
			currentColor = Math.floor(Math.random() * 6);
			ctx.strokeStyle = randIceColor[currentColor];
			break;
		case 'rgb':
			currentColor = Math.floor(Math.random() * 3);
			ctx.strokeStyle = randRGBCMYColor[currentColor];
			break;
		case 'cmy':
			currentColor = Math.floor(Math.random() * 3) + 3;
			ctx.strokeStyle = randRGBCMYColor[currentColor];
			break;
		case 'cga':
			currentColor = Math.floor(Math.random() * 8);
			ctx.strokeStyle = randCGAColor[currentColor];
			break;
		case 'cga16':
			currentColor = Math.floor(Math.random() * 15);
			ctx.strokeStyle = randCGAColor[currentColor];
			break;
		case 'pyxel':
		 	currentColor = Math.floor(Math.random() * 15);
		 	ctx.strokeStyle = randPyxelColor[currentColor];
			break;
		case 'gb':
			currentColor = Math.floor(Math.random() * 4);
			ctx.strokeStyle = randGameBoyColor[currentColor];
			break;
		case 'usa':
			currentColor = Math.floor(Math.random() * 3);
			ctx.strokeStyle = randPatriotColor[currentColor];
			break;
		case 'grayscale':
			currentColor = Math.floor(Math.random() * 8);
			ctx.strokeStyle = randGrayscaleColor[currentColor];
			break;
		default:
			break;
		}
}

// Update button styles: needs optimization (a lot of conditionals and document edits)
function updateButtons()
{
	// Used for readability (TODO: add proper button names)
	let btn1 = document.getElementById("button1");
	let btn2 = document.getElementById("button2");
	let btn4 = document.getElementById("button4");
	let btn5 = document.getElementById("button5");
	let btn6 = document.getElementById("button6");
	let btn10 = document.getElementById("button10");
	let divclr = document.getElementById("divColorMode");
	// Run button colors
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
	// Shape button colors
	if(shapeType == 'triangle') {
		btn4.style.color = "violet";
	} else if(shapeType == 'line') {
		btn5.style.color = "violet";
	} else {
		btn6.style.color = "violet";
//		shapeType = 'starburst';
	}
	btn10.style = "filter:saturate(100%)";
	switch(activeColorMode) {
		case 'faded':
			divColorMode.innerHTML = "Faded";
			btn10.style = "filter:saturate(45%)";
			divclr.style.color = "#d7b1ff"
			btn10.innerHTML = "🌈";
			rainbowBanner.style = "background-image:linear-gradient(to left, indianred, coral, khaki, #90ee90, dodgerblue, #5d3fd3, #cf9fff);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 Colorful but not overpowering";
			break;
		case 'rainbow':
			divColorMode.innerHTML = "Rainbow";
			divclr.style.color = "#8f7be1";
			btn10.innerHTML = "🌈"
			rainbowBanner.style = "background-image:linear-gradient(to left, red, orange, yellow, green, blue, indigo, mediumorchid);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 The classics never fade";
			break;
		case 'fire':
			divColorMode.innerHTML = "Fire";
			divclr.style.color = "coral";
			btn10.innerHTML = "🔥";
			rainbowBanner.style = "background-image:linear-gradient(to right, firebrick, orangered, #FFAA33, khaki);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 💥 Warm but not necessarily inviting";
			break;
		case 'ice':
			divColorMode.innerHTML = "Ice";
			divclr.style.color = "dodgerblue"
			btn10.innerHTML = "🧊";
			rainbowBanner.style = "background-image:linear-gradient(to right, darkblue, blue, dodgerblue, #088f8f, #98fB98, #bbbbbb);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍹 Cool and refreshing";
			break;
		case 'rgb':
			divColorMode.innerHTML = "R G B";
			divclr.style.color = "#00ff00"
			btn10.innerHTML = "📊";
			rainbowBanner.style = "background-image:linear-gradient(to left, #ff0000, #00ff00, #0000ff);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🖥️ How your monitor views the world";
			break;
		case 'cmy':
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
	 		divColorMode.innerHTML = "CGA-16";
			btn10.style = "filter:saturate(50%)";
		 	btn10.innerHTML = "🦜";
		 	divclr.style.color = "#55ffff";
			rainbowBanner.style = "background-image:linear-gradient(to right, #0000aa, #00aaaa, #00aa00, #aa0000, #aa00aa, #aa5500, #aaaaaa, #5555ff, #55ffff, #55ff55, #ff5555, #ff55ff, #ffff55, #ffffff, #555555);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 Full 16-color CGA palette (minus pure black)";
			break;
		case 'pyxel':
			divColorMode.innerHTML = "Pyxel";
			divclr.style.color = "#de6e89"
			btn10.innerHTML = "🎨";
 			rainbowBanner.style = "background-image:linear-gradient(to left, #9b9b9b, #fdfdfd, #de6e89, #bc2532, #493C2B, #A26321, #E98730, #F5E06A, #A1CC26, #44891A, #2F484E, #1B2632, #005784, #31A2F2, #B0DAED);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 Default color palette for 'Pyxel Edit' (minus black)";
			break;
		case 'gb':
			divColorMode.innerHTML = "Gameboy";
			divclr.style.color = "#eeeeee";
			btn10.style = "background-color: #777777;";
			btn10.innerHTML = "🟩";
 			rainbowBanner.style = "background-image:linear-gradient(to right, #003f00 25%, #2e7320 25% 50%, #688c07 50% 75%, #a0cf0a 75% 100%);font-weight:bold;";
			rainbowBanner.title = "Rainbow Noise 🍭 It's just as beautiful and hideous as I remember";
			break;
		case 'usa':
			divColorMode.innerHTML = "Patriot";
			divclr.style.color = "#457bbc";
			btn10.innerHTML = "🧨";
			rainbowBanner.style = "background-image:linear-gradient(to left, #b31942, #ffffff, #0a3161)";
			rainbowBanner.title = "Rainbow Noise 🍔 Taste the freedom";
			break;
		case 'grayscale':
			divColorMode.innerHTML = "Grayscale";
			divclr.style.color = "#888888";
			btn10.innerHTML = "🏁";
			rainbowBanner.style = "background-image:linear-gradient(to right, #1e1e1e, #3e3e3e, #5e5e5e, #7e7e7e, #9b9b9b, #b2b2b2, #c2c2c2, #d5d5d5)";
			rainbowBanner.title = "Rainbow Noise 🍭 Every color from dim gray to off-white";
			break;
		default:
			break;
		}
}

// Print color commentary in the banner
function updateBanner()
{
	// Update animation speed on UI
	divSpeed.innerHTML = "Speed: " + animationSpeed + "x";
	// Print color commentary in the banner (1:5, 10:24, 25:49, 50:74, 75:99, 100:animationSpeed)
	if( (animationSpeed > 0) && (animationSpeed < 6) ) {
		rainbowBanner.innerHTML = "Rainbow Noise 🍀 Running at an optimal speed (1:5)";
		bDisablePhotoWarning = true;
	} else if( (animationSpeed > 9) && (animationSpeed < 25 ) ) {
		rainbowBanner.innerHTML = "Rainbow Noise 🌪️ Things are about to get a bit hectic...";
	} else if( (animationSpeed > 24) && (animationSpeed < 50) ) {
		rainbowBanner.innerHTML = "Rainbow Noise 🧬 Static and white noise are both made of random data points";
	} else if( (animationSpeed > 49) && (animationSpeed < 75) ) {
		rainbowBanner.innerHTML = "🌠 Random Rainbows 🪐 Jupiter and Beyond the Infinite 🌟";
	} else if( (animationSpeed > 74) && (animationSpeed < 100) ) {
		rainbowBanner.innerHTML = "Rainbow Noise? ☕ Frankly, 'Random Rainbows' and 'RGB Noise' seemed too long";
	} else if(animationSpeed > 99) {
		rainbowBanner.innerHTML = "💫 Migraine Simulator 2021  👑 " + animationSpeed + "x speed? Legendary. You absolute madlad";
	}	else if(!bDisablePhotoWarning) {
		// Display photosensitivity warning in the banner
		rainbowBanner.innerHTML = "⚠ Photosensitivity Warning: this app generates rapid and colorful patterns";
		rainbowBanner.title = "⚠ Photosensitivity Warning: click the banner, draw on the canvas, or start animation to dismiss";
		rainbowBanner.style = "background-image:linear-gradient(to right, maroon, firebrick, red)";
	} else {
		// Default banner text
		rainbowBanner.innerHTML = "Rainbow Noise 🎲 Draw with random shapes, animate them, or both";
		rainbowBanner.title = "Rainbow Noise 🎲 Colored lines create positive space";
	}
}

// Use a random color palette on page load (bEnableRandomPalette)
function setRandomPalette()
{
	randomPaletteIndex = Math.floor(Math.random() * 12)
	activeColorMode = paletteList[randomPaletteIndex];
	updateButtons()
	updateBanner();
}

// Keyboard shortcuts
function getKeyboardInput()
{
	document.addEventListener('keypress', e => {
		switch(e.key) {
			case 'r':
				newAnimationInstance();
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
				xOrigin = 500;
				yOrigin = 250;
				break;
			case '?':
				confirmCanvasOverwrite();
				break;
			case 'Enter':
				togglePaintMode();
				break;
			case 'd':
				activeColorMode = 'faded';
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
			case '8':
				activeColorMode = 'cga';
				break;
			case '6':
				activeColorMode = 'cga16';
				break;
			case 'x':
					activeColorMode = 'pyxel';
					break;
			case 'y':
				activeColorMode = 'gb';
				break;
			case 'u':
				activeColorMode = 'usa';
				break;
			case 'g':
				activeColorMode = 'grayscale';
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
	updateButtons();
	updateBanner();
	})
}

function clearScreen()
{
	// Set the canvas to a solid black 1000x500 rectangle
	ctx.fillRect(0, 0, 1000, 500);
	bScreenIsClear = true;
}

function pauseAnimation()
{
	bIsRunning = false;
	bScreenIsClear = false;
	animationSpeed = 0;
	updateButtons();
	updateBanner();
}

// Draw current mouse coordinates
function updateCoords()
{
	divCoordsX.innerHTML = "X: " + xPos;
	divCoordsY.innerHTML = "Y: " + yPos;
}

function newAnimationInstance()
{
	bIsRunning = true;
	animationSpeed++;
	runAnimation();
	updateButtons();
	updateBanner();
}

// Cycle through available color palettes
function swapColorMode()
{
	// Reset index to the start if the last element is called
	if(i == 11) {
		i = 0;
		// Otherwise increment the counter by 1 for the next palette
	} else {
		i++;
	}
	activeColorMode = paletteList[i];	// Set active color palette, regardless
	setBrushColor();
	updateButtons();
	updateBanner();
}

// Enable or disable free draw mode and update buttons
function togglePaintMode()
{
	let btn9 = document.getElementById("button9");
	if (bEnableDrawing) {
		bEnableDrawing = false;
		btn9.style = "filter:saturate(32%);#1e1e1e";
		btn9.title = "Enable free draw mode (Enter)";
	}	else {
		bEnableDrawing = true;
		btn9.style = "filter:saturate(100%);border-color:#74c365;";
		btn9.title = "Disable free draw mode (Enter)";
	}
	updateBanner();
	updateButtons();
}

function drawMenuBackground()
{
	nBackgroundShapesDrawn = 0;
	// Draw 256 triangles in the selected color as a background (0:255)
	while(nBackgroundShapesDrawn < 256) {
		x1 = Math.floor(Math.random() * 1020)-10;
		y1 = Math.floor(Math.random() * 520)-10;
		x2 = Math.floor(Math.random() * 820)-10;
		y2 = Math.floor(Math.random() * 520)-10;
		ctx.beginPath();
		setBrushColor();
		ctx.lineWidth = brushSize;
		drawRandomTriangle();
		nBackgroundShapesDrawn++;
	}
}

// Prints instructions on the canvas (overwrites occupied pixels)
function drawHelpScreen()
{
	drawMenuBackground();
	ctx.fillStyle = "#222222";
	// Dim gray header
	ctx.fillRect(160, 105, (canvas.width-333), 50);
	ctx.fillStyle = "#eeeeee";
	ctx.font = "bold 28px Arial";
	ctx.fillText("Rainbow Noise", leftTextOffset+105, textMidpoint-123);
	ctx.fillStyle = "#111111";
	// Dark gray backdrop
	ctx.fillRect(160, 175, (canvas.width-333), 195);
	ctx.font = "bold 25px Arial";
	ctx.fillStyle = "#dddddd";
	ctx.fillText("ateadaze.github.io", leftTextOffset+520,textMidpoint-123);
	ctx.fillStyle = "white";
	ctx.font = "21px Arial";
	let helpTextOffset = leftTextOffset + 100;
	ctx.fillText("✏️ Drag your mouse to paint shapes (or use free draw mode)", helpTextOffset, textMidpoint-60);
	ctx.fillText("✏️  Click the canvas to set a new origin for the starburst animation", helpTextOffset, textMidpoint);
	ctx.fillText("✏️  Press RUN repeatedly to increase the animation speed", helpTextOffset, textMidpoint-30);
	ctx.fillText("✔️  You can draw on the canvas while the animation is running", helpTextOffset, textMidpoint+30);
	ctx.fillText("✔️  Animations generally look smoother between 1x and 5x speed", helpTextOffset, textMidpoint+60);
	ctx.fillText("🎨  Press spacebar to select the next color palette", helpTextOffset, textMidpoint+90);
	ctx.fillStyle = "black";
	bScreenIsClear = true;
}

function confirmCanvasOverwrite()
{
	// Display a confirmation prompt if the canvas has been used
	if(!bScreenIsClear) {
		let r;
		r = confirm("Animation will pause and instructions will partially overwrite the canvas. Overwrite?");
		if (r == true) {
			pauseAnimation();
			drawHelpScreen();
			bScreenIsClear = true;
		}
	} else {
		// Otherwise draw help screen without prompt
		drawHelpScreen();
		}
}
