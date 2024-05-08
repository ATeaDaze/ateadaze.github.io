let currentWaveform = "triangle";
let currentTrack = "ffPrelude";
let bIsLoggingEnabled = false;
let bIsAudioPlaying = false;

let ctx = new(window.AudioContext || window.webkitAudioContext)();
let volume = ctx.createGain();
volume.connect(ctx.destination);
volume.gain.value = 0.1;

function playNote(frequency, duration) {
  $("#txtFrequencyValue").html(note[0] + " Hz");
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
    note = notes.pop();
    playNote(note[0], 1000 * 256 / (note[1] * bpm));
    $("#btnPlayAudioTrack").html("PLAYING");
    $("#btnPlayAudioTrack").addClass("playStyleRunning");
    if(bIsLoggingEnabled) {
      console.log(`[${note[0]} Hz, 1/${note[1]} note]`);
      if(notes.length == 0) console.log(`Tempo: ${bpm} BPM`);
    }
  } else {
    $("#btnPlayAudioTrack").html("PLAY TRACK");
    $("#btnPlayAudioTrack").removeClass("playStyleRunning");
    $("#btnPlayAudioTrack").addClass("playStyle");
    enableTrackButtons();
  }
}

$(document).ready(function() {
  updateTrackTitle();
  updateWaveformTitle();
  $("#btnPlayAudioTrack").click(function() {
    if(currentTrack == "ffPrelude") {
      notes = trackNotesFFPrelude;
      bpm = 160;
    } else if(currentTrack == "stIntro") {
      notes = trackNotesStrangerThings;
      bpm = 184;
    } else {
      notes = trackNotesImperialMarch;
      bpm = 103;
    }
    disableTrackButtons();
    notes.reverse();
    playMelody();
  });
});

function updateCurrentWaveform(newWave) {
  currentWaveform = newWave;
  $("#txtWaveformValue").html(newWave.toUpperCase());
  return(newWave);
}

function updateTrackTitle() {
  $("#btnPlayTrackFinalFantasy").click(function() {
    currentTrack = "ffPrelude";
    updateCurrentWaveform("triangle");
    $("#txtActiveTrackValue").html("Prelude (Final Fantasy)");
  });
  $("#btnPlayTrackStrangerThings").click(function() {
    currentTrack = "stIntro";
    updateCurrentWaveform("square");
    $("#txtActiveTrackValue").html("Stranger Things (Main Theme)");
  });
  $("#btnPlayTrackStarWars").click(function() {
    currentTrack = "swIntro";
    updateCurrentWaveform("sawtooth");
    $("#txtActiveTrackValue").html("Imperial March (Star Wars)");
  });
}

function updateWaveformTitle() {
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

// TODO: maybe track if a song has been played an disable it
// This would go at the end of playMelody()
/*    if(currentTrack == "ffPrelude") {
      $("#btnPlayTrackFinalFantasy").prop( "disabled", true );
      $("#btnPlayTrackFinalFantasy").addClass("disabledButton");
    } else if(currentTrack == "stIntro") {
      $("#btnPlayTrackStrangerThings").prop( "disabled", true );
      $("#btnPlayTrackStrangerThings").addClass("disabledButton");
    } else {
      $("#btnPlayTrackStarWars").prop( "disabled", true );
      $("#btnPlayTrackStarWars").addClass("disabledButton");
    } */
