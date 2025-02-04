// TODO: [DONE] [TESTING] Make the canvas resize on window/screen changes
// ISSUE: [FIXED] [TESTING] freezes if fullscreen mode is already enabled with F11 browser keybind
const paletteList = new Array('faded', 'rainbow', 'fire', 'ice', 'rgb', 'cmy', 'cga', 'cga16', 'pyxel', 'gb', 'usa', 'grayscale');
const randFadedColor = new Array("indianred", "coral", "khaki", "#90ee90", "dodgerblue", "#5d3fd3", "#cf9fff");
const randRainbowColor = new Array("red", "orange", "yellow", "green", "blue", "indigo", "mediumorchid");
const randFireColor = new Array("firebrick", "orangered", "#ffaa33", "khaki");
const randIceColor = new Array("blue", "dodgerblue", "#088f8f", "#98fB98", "darkblue", "#dddddd");
const randRGBCMYColor = new Array("#ff0000", "#00ff00", "#0000ff", "#55ffff", "#ff55ff", "#ffff55");
const randPatriotColor = new Array("#b31942", "#ffffff", "#0a3161");
const randGrayscaleColor = new Array( "#1e1e1e", "#3e3e3e", "#5e5e5e", "#7e7e7e", "#9b9b9b", "#b2b2b2", "#c2c2c2", "#d5d5d5");
const randCGAColor = new Array( "#5555ff", "#55ffff", "#55ff55", "#ff5555", "#ff55ff", "#ffff55", "#ffffff", "#aaaaaa", "#0000aa", "#00aaaa", "#00aa00", "#aa0000", "#aa00aa", "#aa5500", "#555555");
const randPyxelColor = new Array( "#9b9b9b", "#fdfdfd", "#de6e89", "#bc2532", "#493c2b", "#a26321", "#e98730", "#f5e06a", "#a1cc26", "#44891a", "#2f484e", "#1b2632", "#005784", "#31a2f2", "#b0daed");
const randGameBoyColor = new Array("#003f00", "#2e7320", "#688c07", "#a0cf0a");
let paletteIndex = 0;
let activeColorPalette = 'faded'
let bIsRunning = false;
let bScreenIsClear = true;
let bEnableRandomPalette = false;
let xCanvasBound;
let yCanvasBound;
let xOrigin;
let yOrigin;
let animationSpeed = 0;
let shapeType = 'triangle';
let randomTriangleLength, randomTriangleOffset;
let x1, y1, x2, y2;
let brushSize = 3.0;
let textMidpoint = (window.innerHeight / 4.1); // No idea where I got a divisor of 4.1
const leftTextOffset = 70;

// Create new 2D canvas element
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
resizeCanvas();

$(document).ready(function () {
  if(bEnableRandomPalette) setRandomPalette();
  drawHelpScreen();
  getKeyboardInput();
  // Event handler to resize the canvas when the document view is changed
  window.addEventListener('resize', resizeCanvas, false);
  // Toggle fullscreen on double-click
  $(document).on("dblclick", function() {
    toggleFullscreen();
  });
});

// Screen saver mode: animation runs and clears screen after 512 shapes
function runAnimation() {
  let nShapes = 0;
  // Multiply shape count by animation speed (faster speeds won't immediately the clear screen)
  // 1024 = 17 seconds, 2048 = 34 seconds, 4096 = 68 seconds, etc. (approximately)
  let nMaxShapes = 1024 * animationSpeed;
  window.requestAnimationFrame(function loop() {
    x1 = Math.floor(Math.random() * xCanvasBound);
    y1 = Math.floor(Math.random() * yCanvasBound);
    ctx.beginPath();
    setBrushColor();
    ctx.lineWidth = brushSize;
    // Randomize brush stroke size (~1.5 to 6.5)
//    ctx.lineWidth = ((Math.random() * brushSize )+2).toFixed(2);
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
    nShapes++;
    if(nShapes > nMaxShapes) {
      clearScreen();
      nShapes = 0;
    }
  })
  bScreenIsClear = false;
  bIsRunning = true;
}

// Random line = (x1,y1), (x2,y2)
function drawRandomLine() {
  x2 = Math.floor(Math.random() * xCanvasBound);
  y2 = Math.floor(Math.random() * yCanvasBound);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

// Random triangle = (x1,y1), (x2,y2), (x1+randomOffset(35)),y1+randomLength(40))
function drawRandomTriangle() {
  x2 = Math.floor(Math.random() * xCanvasBound);
  y2 = Math.floor(Math.random() * yCanvasBound);
  randomTriangleLength = Math.floor(Math.random() * 30) + 5;
  randomTriangleOffset = Math.floor(Math.random() * 35) + 5;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x1+randomTriangleOffset, y1+randomTriangleLength);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Random starburst line = (xOrigin,yOrigin), (x1,y1)
function drawStarburstLine() {
  ctx.moveTo(xOrigin, yOrigin);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.closePath();
}

// Select a random color palette
function setRandomPalette() {
  let lastColorPalette = activeColorPalette;
  let randomPaletteIndex = Math.floor(Math.random() * 12)
  activeColorPalette = paletteList[randomPaletteIndex];
  while(activeColorPalette == lastColorPalette) {
    randomPaletteIndex = Math.floor(Math.random() * 12)
    activeColorPalette = paletteList[randomPaletteIndex];
  }
  displayPaletteToast(activeColorPalette);
}

function clearScreen() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  bScreenIsClear = true;
}

function pauseAnimation() {
  bIsRunning = false;
  bScreenIsClear = false;
  animationSpeed = 0;
}

// Each new instance increments the number of shapes drawn per cycle
function newAnimationInstance() {
  bIsRunning = true;
  animationSpeed++;
  runAnimation();
}

// Cycle through available color palettes and display notification
function swapColorMode() {
  // Reset index to the start if the last element is called
  if(paletteIndex == 11) {
    paletteIndex = 0;
    // Otherwise advance to the next palette
  } else {
    paletteIndex++;
  }
  activeColorPalette = paletteList[paletteIndex];
  setBrushColor();
  displayPaletteToast(activeColorPalette);
}

// Switch between windowed and fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else {
    console.log("Warning ⚠️ This should not happen");
  }
  resizeCanvas();
}

// Resize the canvas to fill the entire window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  xCanvasBound = (window.innerWidth)-20;
  yCanvasBound = (window.innerHeight)-20;
  xOrigin = xCanvasBound / 2;
  yOrigin = yCanvasBound / 2;
  if(!bIsRunning) drawHelpScreen();
}

// Select random brush color from active palette
function setBrushColor() {
  switch(activeColorPalette) {
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

// Keyboard shortcuts
function getKeyboardInput() {
  document.addEventListener('keypress', e => {
  switch(e.key) {
    case 'r':
      clearScreen();
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
      xOrigin = xCanvasBound / 2;
      yOrigin = yCanvasBound / 2;
      break;
    case '?':
      drawHelpScreen();
      break;
    case 'f':
      toggleFullscreen();
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
  })
}

// ISSUE: need to use flexible values for variable screen and window sizes
function drawHelpScreen() {
  // Clear screen if it's not running so you can read the text
  if(!bIsRunning) clearScreen();
  // Main title with brief description
  ctx.fillStyle = "#eeeeee";
  ctx.font = "bold 42px Arial,Helvetica";
  ctx.fillText("LCD Tool 🖥️ Prevent or Fix Screen Image Persistence", leftTextOffset+105, textMidpoint-115);
  // Main header with GitHub link
  ctx.font = "bold 40px Consolas, Ubuntu Mono, monospace";
  ctx.fillStyle = "#cf9fff";
  ctx.fillText("ateadaze.github.io", leftTextOffset+1250,textMidpoint-115);
  // General help section
  ctx.fillStyle = "white";
  ctx.font = "34px Consolas, Ubuntu Mono, monospace";
  let helpTextOffset = leftTextOffset + 100;
  ctx.fillText("✔️ Run this in fullscreen mode for maximum coverage (results may vary)", helpTextOffset, textMidpoint-50);
  ctx.fillText("✔️ Press [R] repeatedly to increase speed (2x or higher is recommended)", helpTextOffset, textMidpoint-5);
  ctx.fillText("✔️ Let it run for 2-10 minutes to reset pixels or keep it running to prevent them", helpTextOffset, textMidpoint+40);
  ctx.fillStyle = "#777777";
  // Keyboard map
  ctx.fillRect(helpTextOffset, textMidpoint+60, (canvas.width-355), 5);
  ctx.fillStyle = "white";
  ctx.font = "35px Consolas, Ubuntu Mono, monospace";
  ctx.fillText("Keyboard Map: [R] = Run animation   [P] = Pause animation      [F] = Fullscreen", helpTextOffset, textMidpoint+105);
  ctx.fillText("              [C] = Clear screen    [?] = Help", helpTextOffset, textMidpoint+150);
  ctx.fillText("Palettes:     [*] = Random palette  [Spacebar] = Next palette",helpTextOffset, textMidpoint+240)
  // Keyboard map small line
  ctx.fillStyle = "#333333";
  ctx.fillRect(helpTextOffset, textMidpoint+180, (canvas.width-355), 5);
  // Animation keybinds
  ctx.fillStyle = "white";
  ctx.fillText("Animations:   [T] = Triangle Web    [L] = Line Scatter         [S] = Starburst",helpTextOffset, textMidpoint+285)
  ctx.fillStyle = "#000000";
  bScreenIsClear = true;
}

function displayPaletteToast(txtActivePalette) {
  let x = document.getElementById("toastMessage");
  x.innerHTML = txtActivePalette;
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}
