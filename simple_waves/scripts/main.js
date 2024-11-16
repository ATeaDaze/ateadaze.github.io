/* TODO: see which variables can be switched to constants, read more about the sound API to add ADSR,
  add functionality to track playback state, history, and stop the audio */
let currentWaveform = "triangle";
let currentTrack = "ffPrelude";
let bIsLoggingEnabled = false;
let bIsAudioPlaying = false;
let currentGain = 0.1;
let bpm = 160;

let ctx = new(window.AudioContext || window.webkitAudioContext)();
let volume = ctx.createGain();

volume.connect(ctx.destination);
volume.gain.value = currentGain;

function playNote(frequency, duration, name) {
  $("#txtFrequencyValue").html(note[2]);
  osc = ctx.createOscillator();
  osc.type = currentWaveform;
  osc.frequency.value = frequency;
  osc.connect(volume);
  osc.start();
  setTimeout(
    function() {
      osc.stop();
      playMelody();
    }, duration);
}

function playMelody() {
  if (notes.length > 0) {
    // 
    note = notes.pop();
    playNote(note[0], (1000 * 256 / (note[1] * bpm)), note[2]);
    $("#btnPlayAudioTrack").html("PLAYING");
    $("#btnPlayAudioTrack").removeClass("playStyle");
    $("#btnPlayAudioTrack").addClass("playStyleRunning");
    if(bIsLoggingEnabled) {
      console.log(`%c [${note[0]} Hz, 1/${note[1]} note]`, 'font-weight: bold');
      if(notes.length == 0) console.log(`%c Tempo: ${bpm} BPM`, 'color: orchid');
    }
  } else {
    $("#btnPlayAudioTrack").html("PLAY TRACK");
    $("#btnPlayAudioTrack").removeClass("playStyleRunning");
    $("#btnPlayAudioTrack").addClass("playStyle");
    enableTrackButtons();
  }
}

$(document).ready(function() {

  updateTxtTrackTitle();
  updateTxtWaveform();
  updateCurrentWaveform(currentWaveform)

  $("#btnPlayAudioTrack").click(function() {
    if(currentTrack == "ffPrelude") {
      notes = trackNotesFFPrelude;
    } else if(currentTrack == "stIntro") {
      notes = trackNotesStrangerThings;
    } else {
      notes = trackNotesImperialMarch;
    }
    disableTrackButtons();
    notes.reverse();
    playMelody();
  });

  if(bIsLoggingEnabled) logTablesToConsole();

});

function updateCurrentWaveform(newWave) {
  currentWaveform = newWave;
  $("#txtWaveformValue").html(newWave.toUpperCase());
  return(newWave);
}

function updateTxtTrackTitle() {
  $("#btnPlayTrackFinalFantasy").click(function() {
    currentTrack = "ffPrelude";
    updateCurrentWaveform("triangle");
    $("#txtActiveTrackValue").html("Prelude (Final Fantasy)");
    bpm = 160;
  });
  $("#btnPlayTrackStrangerThings").click(function() {
    currentTrack = "stIntro";
    updateCurrentWaveform("square");
    $("#txtActiveTrackValue").html("Stranger Things (Main Theme)");
      bpm = 184;
  });
  $("#btnPlayTrackStarWars").click(function() {
    currentTrack = "swIntro";
    updateCurrentWaveform("sawtooth");
    $("#txtActiveTrackValue").html("Imperial March (Star Wars)");
      bpm = 103;
  });
}

function updateTxtWaveform() {
  $("#btnWaveSine").click(function() {
    updateCurrentWaveform("sine");
  });
  $("#btnWaveSquare").click(function() {
    updateCurrentWaveform("square");
  });
  $("#btnWaveSawtooth").click(function() {
    updateCurrentWaveform("sawtooth");
  });
  $("#btnWaveTriangle").click(function() {
    updateCurrentWaveform("triangle");
  });
}

function disableTrackButtons() {
  $("[id^=btnPlayTrack]").removeClass("playStyle");
  $("[id^=btnPlayTrack]").addClass("disabledButton");
  $("[id^=btnPlayTrack]").prop( "disabled", true );
}

function enableTrackButtons() {
  $("[id^=btnPlayTrack]").removeClass("disabledButton");
  $("[id^=btnPlayTrack]").addClass("trackStyle");
  $("[id^=btnPlayTrack]").prop("disabled", false);
}

function logTablesToConsole() {
  console.table(C);
  console.table(D);
  console.table(E);
  console.table(F);
  console.table(G);
  console.table(A);
  console.table(B);  
}
