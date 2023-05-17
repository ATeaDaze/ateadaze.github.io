  // Canvas game board
  let c = document.getElementById("gameBoardPlayer");
  let ctx = c.getContext("2d");

  ctx.moveTo(xGBp-5, yGBp-45);
  ctx.lineTo(xGBp-5, yGBp+20);
  ctx.stroke(); 

  ctx.moveTo(xGBp-5, yGBp-45);
  ctx.lineTo(xGBp+75, yGBp-45);
  ctx.stroke();

  ctx.moveTo(xGBp+75, yGBp+20);
  ctx.lineTo(xGBp+75, yGBp-45);
  ctx.stroke();

  ctx.moveTo(xGBp-5, yGBp+20);
  ctx.lineTo(xGBp+75, yGBp+20);
  ctx.stroke();

  ctx.font = "35px Times New Roman"
  ctx.fillText(newCard, xGBp, yGBp);

  xGBp = xGBp + 100;
  