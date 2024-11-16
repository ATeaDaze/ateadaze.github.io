// scrollSize = 920, totalHeight ~3680
let scrollSize = document.documentElement.scrollHeight;
let scrollSizeDouble = scrollSize.toFixed(0)
//let windowX = document.documentElement.clientHeight;
let windowY = document.documentElement.clientWidth;
//let offsetX = window.scrollX;
//let offsetY = window.scrollY;
let scrollPos = $(document).scrollTop();
//let scrollLimit = window.innerHeight;
let scrollLimit = document.documentElement.scrollHeight;
//let scrollLimit = getScrollLimit();
// scrollProgress = (scollbar position / window height)
let scrollProgress = scrollPos / windowY;
let bEnableDebug = true;

$(window).scroll(function(){
  windowY = document.documentElement.clientWidth;
  scrollPos = $(document).scrollTop();
  scrollPos = Number(scrollPos.toFixed(0));
  updateDebugInfo();
  if(bEnableDebug) {
    console.log(`scrollPos\t${scrollPos}\tscrollLimit\t${scrollLimit}`);
  }
});

$(document).ready(function() {
  updateDebugInfo();

  $("#btnTop").on("click", function() {
    scrollToTop(0);
    updateDebugInfo();
  });
  $("#btnBottom").on("click", function() {
    scrollToBottom(0);
    updateDebugInfo();
  });

});

/*function getScrollLimit() {
  let max = document.body.scrollHeight();
  return(max);
}*/

function scrollToBottom(msec) {
  window.scrollTo(msec, document.body.scrollHeight);
}

function scrollToTop(msec) {
  window.scrollTo({
    top: msec,
    behavior: 'auto'
  });
}

function updateDebugInfo() {
  $("#txtDebug1").html(scrollPos);
  $("#txtDebug2").html(windowY); // + "x" + windowX);
  $("#txtDebug3").html(scrollSizeDouble);
  $("#txtDebug4").html(scrollLimit);
  scrollProgress = (scrollPos / windowY).toFixed(2)
  scrollProgressPercent = ( (scrollPos / windowY) * 100).toFixed(2)
  $("#txtDebug5").html(scrollProgressPercent + "%");
}
