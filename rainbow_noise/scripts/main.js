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
let bDisablePhotoWarning = false;
let bEnableRandomPalette = false;
let bEnableDrawing = false;
let bShowHelp = true;
let xOrigin = 500;
let yOrigin = 250;
let xPos = 0;
let yPos = 0;
let animationSpeed = 0;
let shapeType = 'triangle';
let randomTriangleLength, randomTriangleOffset;
let x1, y1, x2, y2;
let brushSize = 2.73;

// Draw random shape at the mouse cursor
function drawShape() {
  document.addEventListener('mousemove', e => {
    xPos = Math.round(e.clientX - rect.left);
    yPos = Math.round(e.clientY - rect.top);
    canvas.addEventListener('mousedown', e => {
      bEnableDrawing = true;
      xOrigin = xPos;
      yOrigin = yPos;
    })
    if(bEnableDrawing) {
      updateCoords();
      x1 = Math.floor(Math.random() * 1020) - 10;
      y1 = Math.floor(Math.random() * 520) - 10;
      ctx.beginPath();
      setBrushColor();
      ctx.lineWidth = brushSize;
    if(shapeType == 'line') {
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.closePath();
    } else if(shapeType == 'triangle') {
      randomTriangleLength = Math.floor(Math.random() * 30) + 5;
      randomTriangleOffset = Math.floor(Math.random() * 35) + 5;
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x1+randomTriangleOffset,y1+randomTriangleLength);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } else {
      ctx.moveTo(xOrigin,yOrigin);
      ctx.lineTo(xPos,yPos);
      ctx.closePath();
      ctx.stroke();
    }
  }
    canvas.addEventListener('mouseup', e => {
      bEnableDrawing = false;
      bScreenIsClear = false;
    })
  })
}

// Run animation without user input
function runAnimation() {
  window.requestAnimationFrame(function loop() {
    x1 = Math.floor(Math.random() * 1020) - 10;
    y1 = Math.floor(Math.random() * 520) - 10;
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
function drawRandomLine() {
  x2 = Math.floor(Math.random() * 1020) - 10;
  y2 = Math.floor(Math.random() * 520) - 10;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

// Random triangle = (x1,y1), (x2,y2), (x1+randomOffset(35)),y1+randomLength(40))
function drawRandomTriangle() {
  x2 = Math.floor(Math.random() * 1020) - 10;
  y2 = Math.floor(Math.random() * 520) - 10;
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

// Select random brush color from active palette
// TODO: refactor this monstrosity
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

// Update button styles: needs optimization (a lot of conditionals and document edits)
function updateButtons() {
  let btn1 = document.getElementById("button1");
  let btn2 = document.getElementById("button2");
  let btn4 = document.getElementById("button4");
  let btn5 = document.getElementById("button5");
  let btn6 = document.getElementById("button6");
  let btn10 = document.getElementById("button10");
  let divclr = document.getElementById("divColorMode");
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
  }
  btn10.style = "filter:saturate(100%)";
  switch(activeColorPalette) {
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
      rainbowBanner.style = "background-image:linear-gradient(to right, #0000aa, #00aa00, #00aaaa, #aa0000, #aa00aa, #aa5500, #aaaaaa, #5555ff, #55ff55, #55ffff, #ff5555, #ff55ff, #ffff55, #ffffff, #555555);font-weight:bold;";
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
      rainbowBanner.title = "Rainbow Noise 🇺🇸 E Pluribus Unum";
      break;
    case 'grayscale':
      divColorMode.innerHTML = "Grayscale";
      divclr.style.color = "#888888";
      btn10.innerHTML = "🏁";
      rainbowBanner.style = "background-image:linear-gradient(to right, #1e1e1e, #3e3e3e, #5e5e5e, #7e7e7e, #9b9b9b, #b2b2b2, #c2c2c2, #d5d5d5)";
      rainbowBanner.title = "Rainbow Noise 🍭 Every color from dim gray to off-white";
      break;
    case 'ukraine':
      divColorMode.innerHTML = "UA";
      divclr.style.color = "#70A4E0";
      btn10.innerHTML = "🔱";
      rainbowBanner.style = "background-image:linear-gradient(to bottom, #0056b9 50%, #ffd800 50%)";
      rainbowBanner.title = "Rainbow Noise 🇺🇦 ";
      break;
    default:
      break;
    }
}

// Print color commentary in the banner at 6 thresholds
function updateBanner() {
  divSpeed.innerHTML = "Speed: " + animationSpeed + "x";
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
  } else if(!bDisablePhotoWarning) {
    rainbowBanner.innerHTML = "⚠ Photosensitivity Warning: this app generates rapid and colorful patterns";
    rainbowBanner.title = "⚠ Photosensitivity Warning: click the banner, draw on the canvas, or start the animation to dismiss this warning";
    rainbowBanner.style = "background-image:linear-gradient(to right, maroon, firebrick, red)";
  } else {
    rainbowBanner.innerHTML = "Rainbow Noise 🎲 Draw with random shapes, animate them, or both";
    rainbowBanner.title = "Rainbow Noise 🎲 Colored lines create positive space";
  }
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
  updateButtons()
  updateBanner();
}

// Keyboard shortcuts
function getKeyboardInput() {
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
      activeColorPalette = 'faded';
      break;
    case 'a':
      activeColorPalette = 'rainbow';
      break;
    case 'f':
      activeColorPalette = 'fire';
      break;
    case 'i':
      activeColorPalette = 'ice';
      break;
    case 'b':
      activeColorPalette = 'rgb';
      break;
    case 'm':
      activeColorPalette = 'cmy';
      break;
    case '8':
      activeColorPalette = 'cga';
      break;
    case '6':
      activeColorPalette = 'cga16';
      break;
    case 'x':
        activeColorPalette = 'pyxel';
        break;
    case 'y':
      activeColorPalette = 'gb';
      break;
    case 'u':
      activeColorPalette = 'usa';
      break;
    case 'g':
      activeColorPalette = 'grayscale';
      break;
    case 'k':
      activeColorPalette = 'ukraine';
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

// Set the canvas to a solid black 1000x500 rectangle
function clearScreen() {
  ctx.fillRect(0, 0, 1000, 500);
  bScreenIsClear = true;
}

function pauseAnimation() {
  bIsRunning = false;
  bScreenIsClear = false;
  animationSpeed = 0;
  updateButtons();
  updateBanner();
}

// Draw current mouse coordinates
function updateCoords() {
  divCoordsX.innerHTML = "X: " + xPos;
  divCoordsY.innerHTML = "Y: " + yPos;
}

// Each new instance increments the number of shapes drawn per cycle
function newAnimationInstance() {
  bIsRunning = true;
  animationSpeed++;
  runAnimation();
  updateButtons();
  updateBanner();
}

// Cycle through available color palettes
function swapColorMode() {
  // Reset index to the start if the last element is called
  if(paletteIndex == 12) {
    paletteIndex = 0;
    // Otherwise increment the counter by 1 for the next palette
  } else {
    paletteIndex++;
  }
  // Set active color palette regardless
  activeColorPalette = paletteList[paletteIndex];
  setBrushColor();
  updateButtons();
  updateBanner();
}

// Enable or disable free draw mode and update buttons
function togglePaintMode() {
  let btn9 = document.getElementById("button9");
  if (bEnableDrawing) {
    bEnableDrawing = false;
    btn9.style = "filter:saturate(32%);#1e1e1e";
    btn9.title = "Enable free draw mode (Enter)";
  } else {
    bEnableDrawing = true;
    btn9.style = "filter:saturate(100%);border-color:#74c365;";
    btn9.title = "Disable free draw mode (Enter)";
  }
  updateBanner();
  updateButtons();
}

// Draw 256 triangles in the selected color as a background (0:255)
function drawMenuBackground() {
  let nBackgroundShapesDrawn = 0;
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

function drawHelpScreen() {
  drawMenuBackground();
  ctx.fillStyle = "#222222";
  // Dim gray header
  ctx.fillRect(160, 105, (canvas.width-333), 50);
  ctx.fillStyle = "#eeeeee";
  ctx.font = "bold 25px Arial,Helvetica";
  ctx.fillText("Rainbow Noise", leftTextOffset+105, textMidpoint-123);
  ctx.fillStyle = "#111111";
  // Dark gray backdrop
  ctx.fillRect(160, 175, (canvas.width-333), 195);
  ctx.font = "bold 23px monospace";
  ctx.fillStyle = "#dddddd";
  ctx.fillText("ateadaze.github.io", leftTextOffset+460,textMidpoint-123);
  ctx.fillStyle = "white";
  ctx.font = "20px Helvetica,Arial";
  let helpTextOffset = leftTextOffset + 100;
  ctx.fillText("✏️  Drag your mouse to paint shapes (or use free draw mode)", helpTextOffset, textMidpoint-60);
  ctx.fillText("🎯  Click the canvas to set a new origin for the starburst animation", helpTextOffset, textMidpoint);
  ctx.fillText("▶️  Press RUN repeatedly to increase the animation speed", helpTextOffset, textMidpoint-30);
  ctx.fillText("✔️  Animations generally look smoother between 1x and 5x speed", helpTextOffset, textMidpoint+30);
  ctx.fillText("🎨  Press spacebar to select the next color palette", helpTextOffset, textMidpoint+60);
  ctx.fillText("💾  Right-click on the canvas to save it as an image (png)", helpTextOffset, textMidpoint+90);
  ctx.fillStyle = "black";
  bScreenIsClear = true;
}

function toggleKeyMap() {
  let kMenu = document.getElementById("txtKeyMap");
  let kButton = document.getElementById("btnKeyMap");
  let kStatus;
  kMenu.classList.toggle("nothing");
  if(bShowHelp) {
    kStatus = "Show";
    kButton.style = "color: #90ee90";
    bShowHelp = false;
    scrollToTop(0);
  } else {
    kStatus = "Hide";
    kButton.style = "color: #cd5c5c";
    bShowHelp = true;
    scrollToBottom(0);
  }
  kButton.innerHTML = kStatus;
}

function scrollToBottom(msec) {
  window.scrollTo(msec, document.body.scrollHeight);
}

function scrollToTop(msec) {
  window.scrollTo({ top: msec, behavior: 'auto' });
}

function confirmCanvasOverwrite() {
  if(!bScreenIsClear) {
    let r = confirm("Animation will pause and instructions will partially overwrite the canvas. Overwrite?");
    if (r == true) {
      pauseAnimation();
      drawHelpScreen();
      bScreenIsClear = true;
    }
  } else {
    drawHelpScreen();
    }
}
