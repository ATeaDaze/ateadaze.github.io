const paletteList = new Array('faded', 'rainbow', 'fire', 'ice', 'rgb', 'cmy', 'cga', 'cga16', 'pyxel', 'gb', 'usa', 'grayscale', 'ukraine');
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
const randUkraineColor = new Array("#0056b9","#ffd800 ");
let paletteIndex = 0;
let activeColorPalette = 'faded'
let bIsRunning = false;
let bScreenIsClear = true;
let bFullScreen = false;
let bHideCursor = false;
let xCanvasBound, yCanvasBound;
let xOrigin, yOrigin;
let animationSpeed = 0;
let shapeType = 'triangle';
let nShapes;
let nMaxShapes;
let randomTriangleLength, randomTriangleOffset;
let x1, y1, x2, y2;
let brushSize = 3.0;
let textMidpoint = (window.innerHeight / 4.1); // No idea where I got a divisor of 4.1
const leftTextOffset = 70;

// Create new 2D canvas element that fills screen
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
resizeCanvas();

$(document).ready(function () {
  getKeyboardInput();
  // Resize canvas when the window size changes
  window.addEventListener('resize', resizeCanvas, false);
  // Toggle fullscreen on double-click
  $(document).on("dblclick", function() {
    toggleFullscreen();
  });
  // Hide [START] button and run animation
  $("#btnStart").on("click", function() {
    hideStartButton();
    newAnimationInstance();
  });

  // Toggle mouse cursor visibility, source: https://stackoverflow.com/a/39756131/14192820
  let mouseStartedMoving, mouseMoved = false;
  let MINIMUM_MOVE_TIME = 2000;
  setInterval(() => { 
    // Hide cursor if mouse stops for 2 seconds in fullscreen
    if(!mouseMoved && mouseStartedMoving && bFullScreen) {
      $("canvas").css({'cursor':'none'});
      mouseStartedMoving = false;
    }
    mouseMoved = false;
  }, MINIMUM_MOVE_TIME);
  // Show cursor on mouse move
  $("canvas").on("mousemove", function() {
    mouseStartedMoving = true;
    mouseMoved = true;
    $("canvas").css({'cursor':'default'});
  });

});

// Animation runs and clears screen after X shapes are drawn
function runAnimation() {
  nShapes = 0;
  // Speed multiplier: 1024 = 17 seconds, 2048 = 34 seconds...
  nMaxShapes = 1024 * animationSpeed;
  window.requestAnimationFrame(function loop() {
    x1 = Math.floor(Math.random() * xCanvasBound);
    y1 = Math.floor(Math.random() * yCanvasBound);
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

// Cycle through available color palettes and display toast
function swapColorMode() {
  if(paletteIndex == 12) {
    paletteIndex = 0;
  } else {
    paletteIndex++;
  }
  activeColorPalette = paletteList[paletteIndex];
  setBrushColor();
  displayPaletteToast(activeColorPalette);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    bFullScreen = true;
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    bFullScreen = false;
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
  // Reset animation
  if(!bIsRunning) {
    pauseAnimation();
    runAnimation();
  }
}

function hideStartButton() {
  $("#btnStart").addClass("hidden");
}

// There is definitely a better way to this
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
    case 'ukraine':
      currentColor = Math.floor(Math.random() * 2);
      ctx.strokeStyle = randUkraineColor[currentColor];
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
      hideStartButton();
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

// Display palette toast for 2.5 seconds
function displayPaletteToast(txtActivePalette) {
  let x = document.getElementById("toastMessage");
  x.innerHTML = txtActivePalette;
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2500);
}
