// Used to pause and unpause the animation
var bIsRunning = true;
// line = (x1,y1),(x2,y2)
var x1, y1, x2, y2;
// Set default animation style
var animationType = 'triangle';
// Only the 1st 6 colors from this list are called (violet overpowers the other colors with indigo and red on-screen)
const lineColor = new Array("red", "orange", "yellow", "green", "blue", "indigo", "violet");

// Draw a line with a random end-point based on user mouse coordinates
function drawLines(targetID, eventType)
{
	targetID.addEventListener(eventType, e => {
		xPos = e.offsetX;
		yPos = e.offsetY;
		// Draw current mouse coordinates below the title
		divCoords.innerHTML = "x=" + xPos + "&nbsp;&nbsp;&nbsp;&nbsp;" + "y=" + yPos;
		// x = random number between -9 and 809 (extra pixels on the edge for coverage)
		x2 = Math.floor(Math.random() * 820)-10;
		// y = random number between -9 and 609
		y2 = Math.floor(Math.random() * 620)-10;
		// Draw each shape with a random color taken from an array
		colorIndex = Math.floor(Math.random() * 6);
		ctx.beginPath();
		ctx.strokeStyle = lineColor[colorIndex];
		ctx.lineWidth = 3;
		// Random lines
		if(animationType == 'line') {
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(x2, y2);		
			ctx.stroke();
			ctx.closePath();
		}
		// Triangles
		else if(animationType == 'triangle') {
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(x2, y2);		
			ctx.lineTo(x2+25,y2+25);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		// Starburst pattern originating from the top-left (center origin looks better but is less satisfying for user input)
		else {
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(0, 0);		
			ctx.stroke();
			ctx.closePath();
		}
	})
}

// Automatically run the animation without user input
function animateLines()
{
	window.requestAnimationFrame(function loop() {
		x1 = Math.floor(Math.random() * 820)-10;
		y1 = Math.floor(Math.random() * 620)-10;
		x2 = Math.floor(Math.random() * 820)-10;
		y2 = Math.floor(Math.random() * 620)-10;
		colorIndex = Math.floor(Math.random() * 6);
		ctx.beginPath();
		ctx.strokeStyle = lineColor[colorIndex];
		ctx.lineWidth = 3;
		// More random lines
		if(animationType == 'line') {
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);		
			ctx.stroke();
			ctx.closePath();			
		}
		// Identical to the other function except it doesn't rely on user input
		else if(animationType == 'triangle') {
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);		
			ctx.lineTo(x2+25,y2+25);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		// Starburst pattern originating from the center
		else {
			ctx.moveTo(x1, y1);
			ctx.lineTo(400, 300);		
			ctx.stroke();
			ctx.closePath();
			}
		// Pause the animation if user clicks the [PAUSE] button
		if(!bIsRunning) return;
		window.requestAnimationFrame(loop);
	})
}

// Set the canvas to solid black 800x600 rectangle
function clearScreen()
{
	ctx.fillRect(0, 0, 800, 600);
}

function cancelAnimation()
{
	bIsRunning = false;
}
