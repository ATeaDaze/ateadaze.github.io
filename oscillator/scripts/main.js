// TODO: add keyboard support, [DONE] add buttons for different songs
// Format = [ [frequencies in Hz...], [Piano key names...] ]
const noteListC = [ [65,  130, 261, 523, 1046, 2093 ], ["C2", "C3", "C4", "C5", "C6", "C7"] ];
const noteListD = [ [73,  146, 293, 587, 1174, 2349 ], ["D2", "D3", "D4", "D5", "D6", "D7"] ];
const noteListE = [ [82,  164, 329, 659, 1318, 2637 ], ["E2", "E3", "E4", "E5", "E6", "E7"] ];
const noteListF = [ [87,  174, 349, 698, 1396, 2793 ], ["F2", "F3", "F4", "F5", "F6", "F7"] ];
const noteListG = [ [98,  196, 391, 783, 1568, 3136 ], ["G2", "G3", "G4", "G5", "G6", "G7"] ];
const noteListA = [ [110, 220, 440, 880, 1760, 3520 ], ["A2", "A3", "A4", "A5", "A6", "A7"] ];
const noteListB = [ [123, 246, 493, 987, 1975, 3951 ], ["B2", "B3", "B4", "B5", "B6", "B7"] ];

// Final Fantasy Prelude // C(add9) Up
const trackNotesFFPrelude = [ [noteListC[0][2], 8],
  [noteListC[0][1], 8], [noteListD[0][1], 8], [noteListE[0][1], 8], [noteListG[0][1], 8],
  [noteListC[0][2], 8], [noteListD[0][2], 8], [noteListE[0][2], 8], [noteListG[0][2], 8],
  [noteListC[0][3], 8], [noteListD[0][3], 8], [noteListE[0][3], 8], [noteListG[0][3], 8],
  [noteListC[0][4], 8], [noteListD[0][4], 8], [noteListE[0][4], 8], [noteListG[0][4], 8],
  // C(add9) Down
  [noteListC[0][5], 8], [noteListG[0][4], 8], [noteListE[0][4], 8], [noteListD[0][4], 8],
  [noteListC[0][4], 8], [noteListG[0][3], 8], [noteListE[0][3], 8], [noteListD[0][3], 8],
  [noteListC[0][3], 8], [noteListG[0][2], 8], [noteListE[0][2], 8], [noteListD[0][2], 8],
  [noteListC[0][2], 8], [noteListG[0][1], 8], [noteListE[0][1], 8], [noteListD[0][1], 8],
  [noteListC[0][1], 8],
  // Am(add9) Up
  [noteListA[0][1], 8], [noteListB[0][1], 8], [noteListC[0][2], 8], [noteListE[0][2], 8],
  [noteListA[0][2], 8], [noteListB[0][2], 8], [noteListC[0][3], 8], [noteListE[0][3], 8],
  [noteListA[0][3], 8], [noteListB[0][3], 8], [noteListC[0][4], 8], [noteListE[0][4], 8],
  [noteListA[0][4], 8], [noteListB[0][4], 8], [noteListC[0][5], 8], [noteListE[0][5], 8],
  // Am(add9) Down
  [noteListA[0][5], 8], [noteListE[0][5], 8], [noteListC[0][5], 8], [noteListB[0][4], 8],
  [noteListA[0][4], 8], [noteListE[0][4], 8], [noteListC[0][4], 8], [noteListB[0][3], 8],
  [noteListA[0][3], 8], [noteListE[0][3], 8], [noteListC[0][3], 8], [noteListB[0][2], 8],
  [noteListA[0][2], 8], [noteListE[0][2], 8], [noteListC[0][2], 8], [noteListB[0][1], 8],
  // REPEAT
  [noteListC[0][1], 8], [noteListD[0][1], 8], [noteListE[0][1], 8], [noteListG[0][1], 8],
  [noteListC[0][2], 8], [noteListD[0][2], 8], [noteListE[0][2], 8], [noteListG[0][2], 8],
  [noteListC[0][3], 8], [noteListD[0][3], 8], [noteListE[0][3], 8], [noteListG[0][3], 8],
  [noteListC[0][4], 8], [noteListD[0][4], 8], [noteListE[0][4], 8], [noteListG[0][4], 8],
  // C(add9) Down
  [noteListC[0][5], 8], [noteListG[0][4], 8], [noteListE[0][4], 8], [noteListD[0][4], 8],
  [noteListC[0][4], 8], [noteListG[0][3], 8], [noteListE[0][3], 8], [noteListD[0][3], 8],
  [noteListC[0][3], 8], [noteListG[0][2], 8], [noteListE[0][2], 8], [noteListD[0][2], 8],
  [noteListC[0][2], 8], [noteListG[0][1], 8], [noteListE[0][1], 8], [noteListD[0][1], 8],
  [noteListC[0][1], 8],
  // Am(add9) Up
  [noteListA[0][1], 8], [noteListB[0][1], 8], [noteListC[0][2], 8], [noteListE[0][2], 8],
  [noteListA[0][2], 8], [noteListB[0][2], 8], [noteListC[0][3], 8], [noteListE[0][3], 8],
  [noteListA[0][3], 8], [noteListB[0][3], 8], [noteListC[0][4], 8], [noteListE[0][4], 8],
  [noteListA[0][4], 8], [noteListB[0][4], 8], [noteListC[0][5], 8], [noteListE[0][5], 8],
  // Am(add9) Down
  [noteListA[0][5], 8], [noteListE[0][5], 8], [noteListC[0][5], 8], [noteListB[0][4], 8],
  [noteListA[0][4], 8], [noteListE[0][4], 8], [noteListC[0][4], 8], [noteListB[0][3], 8],
  [noteListA[0][3], 8], [noteListE[0][3], 8], [noteListC[0][3], 8], [noteListB[0][2], 8],
  [noteListA[0][2], 8], [noteListE[0][2], 8], [noteListC[0][2], 8], [noteListB[0][1], 8],
  // Coda: Fm(add9) - G(add9)
  [noteListF[0][1], 8], [noteListG[0][1], 8], [noteListA[0][1], 8], [noteListC[0][2], 8],
  [noteListF[0][2], 8], [noteListG[0][2], 8], [noteListA[0][2], 8], [noteListC[0][3], 8],
  [noteListG[0][1], 8], [noteListA[0][1], 8], [noteListB[0][1], 8], [noteListD[0][2], 8],
  [noteListG[0][2], 8], [noteListA[0][2], 8], [noteListB[0][2], 8], [noteListD[0][3], 8],
  // Coda: C(add9) - 8va
  [noteListC[0][1], 8], [noteListD[0][1], 8], [noteListE[0][1], 8], [noteListG[0][1], 8],
  [noteListC[0][2], 8], [noteListD[0][2], 8], [noteListE[0][2], 8], [noteListG[0][2], 8],
  [noteListC[0][3], 2], [0, 16] ];

// Stranger Things theme
const trackNotesStrangerThings = [
  [noteListC[0][0], 8], [noteListE[0][0], 8], [noteListG[0][0], 8], [noteListB[0][0], 8],
  [noteListC[0][1], 8], [noteListB[0][0], 8], [noteListG[0][0], 8], [noteListE[0][0], 8],
  [noteListC[0][0], 8], [noteListE[0][0], 8], [noteListG[0][0], 8], [noteListB[0][0], 8],
  [noteListC[0][1], 8], [noteListB[0][0], 8], [noteListG[0][0], 8], [noteListE[0][0], 8],
  [noteListC[0][0], 8], [noteListE[0][0], 8], [noteListG[0][0], 8], [noteListB[0][0], 8],
  [noteListC[0][1], 8], [noteListB[0][0], 8], [noteListG[0][0], 8], [noteListE[0][0], 8],
  [noteListC[0][0], 8], [noteListE[0][0], 8], [noteListG[0][0], 8], [noteListB[0][0], 8],
  [noteListC[0][1], 8], [noteListB[0][0], 8], [noteListG[0][0], 8], [noteListE[0][0], 8],
  [noteListC[0][0], 8], [0, 16] ];

// Imperial March (source: StackOverflow)
const trackNotesImperialMarch = [
  [noteListE[0][1], 4],
  [noteListE[0][1], 4],
  [noteListE[0][1], 4],
  [noteListC[0][1], 8],
  [0, 16],
  [noteListG[0][1],16],
  [noteListE[0][1], 4],
  [noteListC[0][1], 8],
  [0,   16],
  [noteListG[0][1],16],
  [noteListE[0][1], 4],
  [0,    4],
  [noteListB[0][1], 4],
  [noteListB[0][1], 4],
  [noteListB[0][1], 4],
  [noteListC[0][2], 8],
  [0,   16],
  [noteListG[0][1], 16],
  [155,  4],
  [noteListC[0][1],  8],
  [0,   16],
  [noteListG[0][1], 16],
  [noteListE[0][1],  4],
  [0, 16] ];

let currentWaveform = "triangle";
let currentTrack = "ffPrelude";
let bIsLoggingEnabled = false;
let notes = new Array();

//loopThroughNoteList();

if(bIsLoggingEnabled) {
  printNoteListTable(noteListC);
  printNoteListTable(noteListD);
  printNoteListTable(noteListE);
  printNoteListTable(noteListF);
  printNoteListTable(noteListG);
  printNoteListTable(noteListA);
  printNoteListTable(noteListB);
}

// create web audio api context
let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
//create the volume node;
let volume = audioCtx.createGain();
volume.connect(audioCtx.destination);
volume.gain.value = 0.1;

// play individual notes
function playNote(frequency, duration) {
  let x = document.getElementById("txtFrequencyValue");
  x.innerHTML = note[0] + " Hz";
  //connect the oscillator to the nodes
  osc = audioCtx.createOscillator();
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
  let x = document.getElementById("btnPlayAudioTrack");
  if (notes.length > 0) {
    $("#btnPlayAudioTrack").html("▶️ PLAYING");
    note = notes.pop();
//    console.log(`note = ${note}`);
    playNote(note[0], 1000 * 256 / (note[1] * tempo));
    x.style = "color: #FF7F50; border-color: #FF7F50; letter-spacing: 13px";
  } else {
    $("#btnPlayAudioTrack").html("PLAY TRACK");
    x.style = "color: #ffffff";
  }
}

// Play audio when button is clicked
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
  $("#btnPlayAudioTrack").click(function() {

  if(currentTrack == "ffPrelude") {
    notes = trackNotesFFPrelude;
    tempo = 160;
    currentWaveform = "triangle";
  } else if(currentTrack == "stIntro") {
    notes = trackNotesStrangerThings;
    tempo = 184;
    currentWaveform = "square";
  } else {
    notes = trackNotesImperialMarch;
    tempo = 103;
    currentWaveform = "sawtooth";
  }
  notes.reverse();
  playMelody();
  });

});

//notes.reverse();

function setCurrentWaveform(newWave) {
  currentWaveform = newWave;
  let x = document.getElementById("txtWaveformValue");
  x.innerHTML = newWave.toUpperCase();
}

function loopThroughNoteList() {
  let i = 0;
  let j = 0;
  let elementsPrinted = 0;
  while(elementsPrinted < 8) {
    if(elementsPrinted % 2 == 0) {
      i = 0;
    } else {
      i = 1
    }
    if((elementsPrinted % 2 == 0)&&(elementsPrinted != 0)) j++;
    if(bIsLoggingEnabled) {
      dumpNoteArrayContents(noteListC, i, j, elementsPrinted);
    }
  elementsPrinted++;
  }
}

function dumpNoteArrayContents(note, k, l, n) {
  console.log(`array[${k}][${l}] = ${note[k][l]}, elementsPrinted = ${n}`);
}

function printNoteListTable(list) {
  console.table(list)
}
