let currentWaveform = "triangle";
let currentTrack = "ffPrelude";
let bIsLoggingEnabled = true;

// Create new audio API instance
let ctx = new(window.AudioContext || window.webkitAudioContext)();
// Create volume node to reduce gain and connect to audio
let volume = ctx.createGain();
volume.connect(ctx.destination);
// Set volume to 10% (100% default is way too loud)
volume.gain.value = 0.1;

// Plays each note in the song track
function playNote(frequency, duration) {
  let x = document.getElementById("txtFrequencyValue");
  x.innerHTML = note[0] + " Hz";
  // Create an oscillator and connect it to audio nodes
  osc = ctx.createOscillator();
  // Set oscillator wave (options: sawtooth, sine, square, sine, triangle)
  osc.type = currentWaveform;
  // Set frequency for oscillator in Hz
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
  let x = document.getElementById("btnPlayAudioTrack");
  // Continue playing until the end of the note list
  if (notes.length > 0) {
    // Remove each note from array as it's played
    note = notes.pop();
    // Each note is played with an array of values (frequency, duration)
    playNote(note[0], 1000 * 256 / (note[1] * bpm));
    $("#btnPlayAudioTrack").html("PLAYING");
    x.style = "color: #FF7F50; border-color: #FF7F50; letter-spacing: 10px";
    // Print each note in Hz and its duration to console
    if(bIsLoggingEnabled) {
      console.log(`[${note[0]} Hz, 1/${note[1]} note]`);
      // Print tempo to console if the track has ended
      if(notes.length == 0) console.log(`Tempo: ${bpm} BPM`);
    }
  } else {
    $("#btnPlayAudioTrack").html("PLAY TRACK");
    x.style = "color: #dddddd";
  }
}

// Set audio track when a button is clicked
$(document).ready(function() {
  $("#btnPlayTrackFinalFantasy").click(function() {
    currentTrack = "ffPrelude";
  });
  $("#btnPlayTrackStarWars").click(function() {
    currentTrack = "swIntro";
  });
  $("#btnPlayTrackStrangerThings").click(function() {
    currentTrack = "stIntro";
  });
  // Set note list, BPM, and default waveform for each track
  $("#btnPlayAudioTrack").click(function() {
    if(currentTrack == "ffPrelude") {
      notes = trackNotesFFPrelude;
      bpm = 160;
      currentWaveform = "triangle";
    } else if(currentTrack == "stIntro") {
      notes = trackNotesStrangerThings;
      bpm = 184;
      currentWaveform = "square";
    } else {
      notes = trackNotesImperialMarch;
      bpm = 103;
      currentWaveform = "sawtooth";
    }
    // Reverse list of notes and play the track
    notes.reverse();
    playMelody();
  });
});

// Update and display the active waveform when it's changed
function setCurrentWaveform(newWave) {
  currentWaveform = newWave;
  let x = document.getElementById("txtWaveformValue");
  x.innerHTML = newWave.toUpperCase();
}
