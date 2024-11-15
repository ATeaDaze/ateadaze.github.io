// Create an 800x600 canvas and add it to the document body
const canvas = document.createElement('canvas');
document.body.appendChild(canvas)
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

clearScreen();
// Uses actionListener to track mouse movement
drawLines(canvas, 'mousemove');
