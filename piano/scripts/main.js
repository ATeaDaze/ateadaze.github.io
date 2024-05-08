// TODO: add keyboard support, read documentation again, find a way to lower the volume (gain)
let ctx = new AudioContext();
let osc = null;

$(document).ready(function() {
  $("[id^=btn]").on("mousedown", function() {
    startOsc();
  });
  $("[id^=btn]").on("mouseup", function() {
    startOsc(false);
  });
});

function startOsc(bool) {
  let x = document.getElementById("txtFrequencyValue");
  if (bool === undefined) bool = true;
  if (bool === true) {
    osc = ctx.createOscillator();
    osc.type = currentWaveform;
    osc.frequency.value = currentKeyTone;
    x.innerHTML = currentKeyTone.toFixed(2) + " Hz";
    osc.start(ctx.currentTime);
    osc.connect(ctx.destination);
  } else {
    osc.stop(ctx.currentTime);
    osc.disconnect(ctx.destination);
    osc = null;
  }
}

function setCurrentTone(newKey) {
  currentKeyTone = newKey;
}

function setCurrentWaveform(newWave) {
  currentWaveform = newWave;
  let x = document.getElementById("txtWaveformValue");
  x.innerHTML = newWave.toUpperCase();
}
