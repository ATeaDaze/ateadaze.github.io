let windowY = document.documentElement.clientWidth; // 1920
let scrollPos = $(document).scrollTop();
let scrollLimit = document.documentElement.scrollHeight;
let scrollLimitY = document.documentElement.scrollWidth;
let scrollProgress = scrollPos / windowY;
let scrollProgressInverse = scrollProgress - 1;
let bEnableDebug = true;
let hrWidth1 = $("#progressBar1").width();
let hrWidth2 = $("#progressBar2").width();

$(window).scroll(function(){
  windowY = document.documentElement.clientWidth;
  scrollPos = $(document).scrollTop();
  scrollPos = Number(scrollPos.toFixed(0));
  updateDebugInfo();
/*  if(bEnableDebug) {
    console.log(`scrollPos\t${scrollPos}\tscrollLimit\t${scrollLimit}`);
  } */
  $("#progressBar1").css({
    'width' : scrollProgressInverse*250
  });
  $("#progressBar2").css({
    'width' : scrollProgress*250
  });

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

  $("#progressCell").on("click", function() {
    hrWidth1 = $("#progressBar1").width();
    hrWidth2 = $("#progressBar2").width();
    $("#txtDebugHRWidth1").html(hrWidth1);
    $("#txtDebugHRWidth2").html(hrWidth2);
  });

});

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
  hrWidth1 = $("#progressBar1").width();
  hrWidth2 = $("#progressBar2").width();
  scrollProgress = (scrollPos / windowY).toFixed(4)
  scrollProgressInverse = 1 - scrollProgress;
  scrollProgressInverse = scrollProgressInverse.toFixed(4);
  scrollProgressPercent = ( (scrollPos / windowY) * 100).toFixed(2);

  $("#txtDebugHRWidth1").html(hrWidth1);
  $("#txtDebugPwInverse").html(scrollProgressInverse);
  $("#txtDebugPW").html(scrollProgress);
  $("#txtDebugHRWidth2").html(hrWidth2);
  $("#txtDebugPos").html(scrollPos);
  $("#txtDebugWindow").html(windowY)
  $("#txtDebugTotal").html(scrollProgressPercent + "%");
}
