// TODO: add keyboard support, organize notes in a more readable format (Hz are not intuitive),
// maybe add an offset to the array so that pianoKeyC[4] would be equal to C4 (offset = +2)

// Piano notes:   [Frequencies in Hz]                     Piano key reference chart
const pianoKeyC = [ 65,  130, 261, 523, 1046, 2093  ]; // [C2, C3, C4, C5, C6, C7]
const pianoKeyD = [ 73,  146, 293, 587, 1174, 2349  ]; // [D2, D3, D4, D5, D6, D7]
const pianoKeyE = [ 82,  164, 329, 659, 1318, 2637  ]; // [E2, E3, E4, E5, E6, E7]
const pianoKeyF = [ 87,  174, 349, 698, 1396, 2793  ]; // [F2, F3, F4, F5, F6, F7]
const pianoKeyG = [ 98,  196, 391, 783, 1568, 3136  ]; // [G2, G3, G4, G5, G6, G7]
const pianoKeyA = [ 110, 220, 440, 880, 1760, 3520  ]; // [A2, A3, A4, A5, A6, A7]
const pianoKeyB = [ 123, 246, 493, 987, 1975, 3951  ]; // [B2, B3, B4, B5, B6, B7]

// Final Fantasy Prelude: C Major (add9)
const trackNotesFFPrelude = [ [pianoKeyC[2], 8],
  [pianoKeyC[1], 8], [pianoKeyD[1], 8], [pianoKeyE[1], 8], [pianoKeyG[1], 8],
  [pianoKeyC[2], 8], [pianoKeyD[2], 8], [pianoKeyE[2], 8], [pianoKeyG[2], 8],
  [pianoKeyC[3], 8], [pianoKeyD[3], 8], [pianoKeyE[3], 8], [pianoKeyG[3], 8],
  [pianoKeyC[4], 8], [pianoKeyD[4], 8], [pianoKeyE[4], 8], [pianoKeyG[4], 8],
  // C(add9) Down
  [pianoKeyC[5], 8], [pianoKeyG[4], 8], [pianoKeyE[4], 8], [pianoKeyD[4], 8],
  [pianoKeyC[4], 8], [pianoKeyG[3], 8], [pianoKeyE[3], 8], [pianoKeyD[3], 8],
  [pianoKeyC[3], 8], [pianoKeyG[2], 8], [pianoKeyE[2], 8], [pianoKeyD[2], 8],
  [pianoKeyC[2], 8], [pianoKeyG[1], 8], [pianoKeyE[1], 8], [pianoKeyD[1], 8],
  [pianoKeyC[1], 8],
  // Am(add9) Up
  [pianoKeyA[1], 8], [pianoKeyB[1], 8], [pianoKeyC[2], 8], [pianoKeyE[2], 8],
  [pianoKeyA[2], 8], [pianoKeyB[2], 8], [pianoKeyC[3], 8], [pianoKeyE[3], 8],
  [pianoKeyA[3], 8], [pianoKeyB[3], 8], [pianoKeyC[4], 8], [pianoKeyE[4], 8],
  [pianoKeyA[4], 8], [pianoKeyB[4], 8], [pianoKeyC[5], 8], [pianoKeyE[5], 8],
  // Am(add9) Down
  [pianoKeyA[5], 8], [pianoKeyE[5], 8], [pianoKeyC[5], 8], [pianoKeyB[4], 8],
  [pianoKeyA[4], 8], [pianoKeyE[4], 8], [pianoKeyC[4], 8], [pianoKeyB[3], 8],
  [pianoKeyA[3], 8], [pianoKeyE[3], 8], [pianoKeyC[3], 8], [pianoKeyB[2], 8],
  [pianoKeyA[2], 8], [pianoKeyE[2], 8], [pianoKeyC[2], 8], [pianoKeyB[1], 8],
  // C(add9) Up (repeat)
  [pianoKeyC[1], 8], [pianoKeyD[1], 8], [pianoKeyE[1], 8], [pianoKeyG[1], 8],
  [pianoKeyC[2], 8], [pianoKeyD[2], 8], [pianoKeyE[2], 8], [pianoKeyG[2], 8],
  [pianoKeyC[3], 8], [pianoKeyD[3], 8], [pianoKeyE[3], 8], [pianoKeyG[3], 8],
  [pianoKeyC[4], 8], [pianoKeyD[4], 8], [pianoKeyE[4], 8], [pianoKeyG[4], 8],
  // C(add9) Down
  [pianoKeyC[5], 8], [pianoKeyG[4], 8], [pianoKeyE[4], 8], [pianoKeyD[4], 8],
  [pianoKeyC[4], 8], [pianoKeyG[3], 8], [pianoKeyE[3], 8], [pianoKeyD[3], 8],
  [pianoKeyC[3], 8], [pianoKeyG[2], 8], [pianoKeyE[2], 8], [pianoKeyD[2], 8],
  [pianoKeyC[2], 8], [pianoKeyG[1], 8], [pianoKeyE[1], 8], [pianoKeyD[1], 8],
  [pianoKeyC[1], 8],
  // Am(add9) Up (repeat)
  [pianoKeyA[1], 8], [pianoKeyB[1], 8], [pianoKeyC[2], 8], [pianoKeyE[2], 8],
  [pianoKeyA[2], 8], [pianoKeyB[2], 8], [pianoKeyC[3], 8], [pianoKeyE[3], 8],
  [pianoKeyA[3], 8], [pianoKeyB[3], 8], [pianoKeyC[4], 8], [pianoKeyE[4], 8],
  [pianoKeyA[4], 8], [pianoKeyB[4], 8], [pianoKeyC[5], 8], [pianoKeyE[5], 8],
  // Am(add9) Down
  [pianoKeyA[5], 8], [pianoKeyE[5], 8], [pianoKeyC[5], 8], [pianoKeyB[4], 8],
  [pianoKeyA[4], 8], [pianoKeyE[4], 8], [pianoKeyC[4], 8], [pianoKeyB[3], 8],
  [pianoKeyA[3], 8], [pianoKeyE[3], 8], [pianoKeyC[3], 8], [pianoKeyB[2], 8],
  [pianoKeyA[2], 8], [pianoKeyE[2], 8], [pianoKeyC[2], 8], [pianoKeyB[1], 8],
  // Fm(add9) - G(add9)
  [pianoKeyF[1], 8], [pianoKeyG[1], 8], [pianoKeyA[1], 8], [pianoKeyC[2], 8],
  [pianoKeyF[2], 8], [pianoKeyG[2], 8], [pianoKeyA[2], 8], [pianoKeyC[3], 8],
  [pianoKeyG[1], 8], [pianoKeyA[1], 8], [pianoKeyB[1], 8], [pianoKeyD[2], 8],
  [pianoKeyG[2], 8], [pianoKeyA[2], 8], [pianoKeyB[2], 8], [pianoKeyD[3], 8],
  // Coda: C(add9) - 8va
  [pianoKeyC[1], 8], [pianoKeyD[1], 8], [pianoKeyE[1], 8], [pianoKeyG[1], 8],
  [pianoKeyC[2], 8], [pianoKeyD[2], 8], [pianoKeyE[2], 8], [pianoKeyG[2], 8],
  [pianoKeyC[3], 2], [0, 16] ];

// Stranger Things theme
const trackNotesStrangerThings = [
  [pianoKeyC[0], 8], [pianoKeyE[0], 8], [pianoKeyG[0], 8], [pianoKeyB[0], 8],
  [pianoKeyC[1], 8], [pianoKeyB[0], 8], [pianoKeyG[0], 8], [pianoKeyE[0], 8],
  [pianoKeyC[0], 8], [pianoKeyE[0], 8], [pianoKeyG[0], 8], [pianoKeyB[0], 8],
  [pianoKeyC[1], 8], [pianoKeyB[0], 8], [pianoKeyG[0], 8], [pianoKeyE[0], 8],
  // Repeat
  [pianoKeyC[0], 8], [pianoKeyE[0], 8], [pianoKeyG[0], 8], [pianoKeyB[0], 8],
  [pianoKeyC[1], 8], [pianoKeyB[0], 8], [pianoKeyG[0], 8], [pianoKeyE[0], 8],
  [pianoKeyC[0], 8], [pianoKeyE[0], 8], [pianoKeyG[0], 8], [pianoKeyB[0], 8],
  [pianoKeyC[1], 8], [pianoKeyB[0], 8], [pianoKeyG[0], 8], [pianoKeyE[0], 8],  
  [pianoKeyC[0], 8], [0, 16] ];

// Imperial March (source: StackOverflow)
const trackNotesImperialMarch = [
  [pianoKeyE[2], 4],
  [pianoKeyE[2], 4],
  [pianoKeyE[2], 4],
  [pianoKeyC[2], 8],
  [0, 16],
  [pianoKeyG[2],16],
  [pianoKeyE[2], 4],
  [pianoKeyC[2], 8],
  [0,   16],
  [pianoKeyG[2],16],
  [pianoKeyE[2], 4],
  [0,    4],
  [pianoKeyB[2], 4],
  [pianoKeyB[2], 4],
  [pianoKeyB[2], 4],
  [pianoKeyC[3], 8],
  [0,   16],
  [pianoKeyG[2], 16],
  [310,  4],  // Eb4
  [pianoKeyC[2],  8],
  [0,   16],
  [pianoKeyG[2], 16],
  [pianoKeyE[2],  4],
  [0, 16] ];
