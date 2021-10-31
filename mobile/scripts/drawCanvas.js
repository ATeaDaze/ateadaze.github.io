// Create an 800x600 canvas and add it to the document body
const canvas = document.createElement('canvas');
document.body.appendChild(canvas)
canvas.width = 800;
canvas.height = 500;
// Define offsets for text alignment
const leftTextOffset = 70;
const textMidpoint = (canvas.height/1.9);
const ctx = canvas.getContext('2d');

// Main loop
clearScreen();
if(bEnableRandomPalette) setRandomPalette();
drawHelpScreen();
updateUI();
drawShape();
getKeyboardInput();