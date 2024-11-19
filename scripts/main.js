// Maximum window height
let scrollMaximum;
// Current scollbar position
let scrollPosition = $(document).scrollTop();
// Size of one page scroll
let scrollPageSize = document.documentElement.scrollHeight;
// Percent scrolled
let pctScrolled = 0;
// Percent not scrolled = pctScrolled-1 (complement value)
let pctNotScrolled = 1;
let bEnableDebug = false;
let hrRedSize = $("#progressBar1").width();
let hrGreenSize = $("#progressBar2").width();

$(document).ready(function() {
  // Find window scroll height
  scrollMaximum = getDocumentHeight();
  // Update stats
  updateDebugInfo();
  // Quick links for top and bottom of page
  $("#btnTop, #progressBar1").on("click", function() {
    scrollToTop(0);
    updateDebugInfo();
  });
  $("#btnBottom, #progressBar2").on("click", function() {
    scrollToBottom(0);
    updateDebugInfo();
  });
});

$(window).scroll(function() {
  // Update position on scroll
  scrollPosition = $(document).scrollTop();
//  scrollPosition = Number(scrollPosition.toFixed(0));
  updateDebugInfo();
//  console.log(`${scrollPosition} / ${scrollMaximum} = ${pctScrolled}, scrollPageSize = ${scrollPageSize}`);
  // Convert values to raw percentages to use as CSS variables
  let scrollProgressPct = pctScrolled*100 + "%";
  let scrollProgressInversePct = pctNotScrolled*100 + "%";
  // Update width of both bars
  $("#progressBar1").css({
    'width' : scrollProgressInversePct
  });
  $("#progressBar2").css({
    'width' : scrollProgressPct
  });
});

function updateDebugInfo() {
  // Get size of red and green bars
  hrRedSize = $("#progressBar1").width();
  hrGreenSize = $("#progressBar2").width();
  // Perent scrolled = current position / (maximum size - page size)
  pctScrolled = (scrollPosition / (scrollMaximum - scrollPageSize)).toFixed(4)
  // Find complement of percent scrolled
  pctNotScrolled = 1 - pctScrolled;
  pctNotScrolled = pctNotScrolled.toFixed(4);
  scrollProgressPercent = (pctScrolled * 100).toFixed(2);
  // Update debug table information
  $("#txtDebugHRWidth1").html(hrRedSize.toFixed(1));
  $("#txtDebugPwInverse").html(pctNotScrolled);
  $("#txtDebugPW").html(pctScrolled);
  $("#txtDebugHRWidth2").html(hrGreenSize.toFixed(1));
  $("#txtDebugPos").html(scrollPosition);
  $("#txtDebugWindow").html(scrollMaximum)
  $("#txtDebugTotal").html(scrollProgressPercent + "%");
  $("#txtDebugOffset").html(scrollPageSize);
}

// Get the entire document height (scroll limit)
function getDocumentHeight() {
  let x = document;
  return Math.max ( Math.max(x.body.scrollHeight, x.documentElement.scrollHeight),
                    Math.max(x.body.offsetHeight, x.documentElement.offsetHeight),
                    Math.max(x.body.clientHeight, x.documentElement.clientHeight) );
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
