// Maximum window height
let scrollMax;
let viewportX;
let viewportY;
// Current scollbar position
let scrollPosition = $(document).scrollTop();
// Size of one page scroll
let scrollPageSize = document.documentElement.scrollHeight;
// Percent scrolled
let pctScrolled = 0;
// Percent not scrolled = pctScrolled-1 (complement value)
let pctNotScrolled = 1;
// Get inital width of each bar
let hrRedSize = $("#progressBar1").width();
let hrGreenSize = $("#progressBar2").width();

$(document).ready(function() {
  // Find maximum window scroll height
  scrollMax = getDocumentHeight();
  updateDebugInfo();

  // TODO: add check for screen orientation to it works in portrait mode
  // Update value for maximum scroll height when orientation changes
  $(window).scroll(function() {
    // Update position on scroll
    scrollPosition = $(document).scrollTop();
    updateDebugInfo();
    // Convert values to raw percentages to use as CSS variables
    let scrollPercent = pctScrolled*100 + "%";
    let scrollPercentComplement = pctNotScrolled*100 + "%";
    // Update width of both bars
    $("#progressBar1").css({
      'width' : scrollPercentComplement
    });
    $("#progressBar2").css({
      'width' : scrollPercent
    });
  });

  // Buttons: jump to top and bottom of page
  $("#btnTop, #progressBar1").on("click", function() {
    scrollToTop(0);
    updateDebugInfo();
  });
  $("#btnBottom, #progressBar2").on("click", function() {
    scrollToBottom(0);
    updateDebugInfo();
  });
  // Remove warning message on click/tap
  $("#warningHeader").on("click touchstart", function() {
    $(this).removeClass("warningMessage");
    $(this).addClass("invisible");
  });

  $("#owlCaveArt").on("click", function() {
    viewportX = $(window).width();
    viewportY = $(window).height();
    viewportX = (viewportX / 8);
    viewportY = (viewportY / 6) + 512;
    console.log(`viewportX = ${viewportX}, viewportY = ${viewportY}`);
    window.open("images/owl_cave.html", "_blank", "width=512,height=517,top=" + viewportX + ",left=" + viewportY);
  });

});


function updateDebugInfo() {
   // Get size of red and green bars
  hrRedSize = $("#progressBar1").width();
  hrGreenSize = $("#progressBar2").width();
  // Perent scrolled = current position / (maximum size - page size)
  pctScrolled = (scrollPosition / (scrollMax - scrollPageSize)).toFixed(3)
  // Find complement of percent scrolled
  pctNotScrolled = 1 - pctScrolled;
  pctNotScrolled = pctNotScrolled.toFixed(3);
  scrollProgressPercent = (pctScrolled * 100).toFixed(2);
  // Update debug table information
  // $("#txtDebugHRWidth1").html(hrRedSize.toFixed(1));
  // $("#txtDebugHRWidth2").html(hrGreenSize.toFixed(1));
  $("#txtDebugPctNotScrolled").html(pctNotScrolled);
  $("#txtDebugPctScrolled").html(pctScrolled);

  $("#txtDebugPctNotScrolled").html((Math.round(pctNotScrolled * 100) / 100).toFixed(2));
  $("#txtDebugPctScrolled").html((Math.round(pctScrolled * 100) / 100).toFixed(2));

  $("#txtDebugPos").html(scrollPosition);
  $("#txtDebugWindow").html(scrollMax - scrollPageSize);
  // $("#txtDebugTotal").html(scrollProgressPercent + "%");
  // $("#txtDebugOffset").html(scrollPageSize);
}

// Get the entire document height (scrollMax)
function getDocumentHeight() {
  let d = document;
  return Math.max ( Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
                    Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
                    Math.max(d.body.clientHeight, d.documentElement.clientHeight) );
}

function scrollToBottom(msec) {
  window.scrollTo(msec, document.body.scrollHeight);
}

function scrollToTop(msec) {
  window.scrollTo({
    top: msec,
    behavior: 'auto'
  });
}
