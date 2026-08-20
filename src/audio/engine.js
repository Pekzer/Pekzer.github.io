// Tiny 8-bit audio engine built on the Web Audio API.
// No external assets.

/* ============================================================
   STATE
   ============================================================ */

let audioCtx = null;

let musicOn = false;
let sfxOn = true;

let schedulerId = null;
let musicRunId = 0;

let noteIndex = 0;
let musicGain = null;

const DEFAULT_STEP = 125;
let stepMs = DEFAULT_STEP;


/* ============================================================
   SONG STRUCTURE
   ============================================================

   4 sections × 8 bars × 4 steps = 128 steps

   A:
   Cmaj7 - G - Am7 - Fmaj7
   C     - G - Am7 - Fmaj7

   A':
   Cmaj7 - G7 - Am7 - Fmaj7
   C     - G - Fmaj7 - G7

   B:
   Am7 - Fmaj7 - Cmaj7 - G7
   Am7 - F     - C      - G7

   A'':
   Fmaj7 - G7 - Cmaj7 - C
   Fmaj7 - G7 - Cmaj7 - C
   ============================================================ */

const CHORDS = [

  // ==========================================================
  // A
  // ==========================================================

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00, 493.88], // Cmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66], // G
  },

  {
    bass: 110.00,
    notes: [220.00, 261.63, 329.63, 392.00], // Am7
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00], // C
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66], // G
  },

  {
    bass: 110.00,
    notes: [220.00, 261.63, 329.63, 392.00], // Am7
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },


  // ==========================================================
  // A'
  // ==========================================================

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00, 493.88], // Cmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66, 349.23], // G7
  },

  {
    bass: 110.00,
    notes: [220.00, 261.63, 329.63, 392.00], // Am7
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00], // C
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66], // G
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66, 349.23], // G7
  },


  // ==========================================================
  // B
  // ==========================================================

  {
    bass: 110.00,
    notes: [220.00, 261.63, 329.63, 392.00], // Am7
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00, 493.88], // Cmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66, 349.23], // G7
  },

  {
    bass: 110.00,
    notes: [220.00, 261.63, 329.63, 392.00], // Am7
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63], // F
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00, 493.88], // Cmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66, 349.23], // G7
  },


  // ==========================================================
  // A''
  // ==========================================================

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66, 349.23], // G7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00, 493.88], // Cmaj7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00], // C
  },

  {
    bass: 87.31,
    notes: [174.61, 220.00, 261.63, 329.63], // Fmaj7
  },

  {
    bass: 98.00,
    notes: [196.00, 246.94, 293.66, 349.23], // G7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00, 493.88], // Cmaj7
  },

  {
    bass: 65.41,
    notes: [261.63, 329.63, 392.00], // C
  },
];


const MELODY = [

  // ==========================================================
  // A — MAIN THEME
  // ==========================================================

  329.63, 392.00, 523.25, 392.00,
  293.66, 392.00, 493.88, 392.00,
  329.63, 440.00, 523.25, 440.00,
  261.63, 349.23, 440.00, 349.23,

  329.63, 392.00, 523.25, 587.33,
  493.88, 440.00, 392.00, 293.66,
  329.63, 440.00, 523.25, 659.25,
  587.33, 523.25, 440.00, 0,


  // ==========================================================
  // A' — VARIATION
  // ==========================================================

  329.63, 392.00, 523.25, 587.33,
  587.33, 493.88, 392.00, 293.66,
  329.63, 440.00, 523.25, 659.25,
  698.46, 659.25, 523.25, 440.00,

  523.25, 587.33, 659.25, 523.25,
  493.88, 440.00, 392.00, 493.88,
  440.00, 523.25, 587.33, 523.25,
  493.88, 587.33, 493.88, 0,


  // ==========================================================
  // B — BRIDGE
  // ==========================================================

  440.00, 523.25, 659.25, 523.25,
  440.00, 523.25, 698.46, 523.25,
  392.00, 523.25, 659.25, 523.25,
  392.00, 493.88, 587.33, 493.88,

  440.00, 523.25, 659.25, 783.99,
  698.46, 659.25, 523.25, 440.00,
  392.00, 523.25, 659.25, 783.99,
  783.99, 659.25, 587.33, 0,


  // ==========================================================
  // A'' — RETURN
  // ==========================================================

  440.00, 523.25, 698.46, 523.25,
  493.88, 587.33, 783.99, 587.33,
  523.25, 659.25, 783.99, 659.25,
  587.33, 523.25, 392.00, 0,

  440.00, 523.25, 698.46, 783.99,
  783.99, 698.46, 587.33, 493.88,
  523.25, 659.25, 783.99, 1046.50,
  783.99, 659.25, 523.25, 0,
];


const TOTAL_STEPS =
  CHORDS.length * 4;


/* ============================================================
   AUDIO CONTEXT
   ============================================================ */

const ensureCtx = () => {

  if (!audioCtx) {

    const AC =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AC) return null;

    audioCtx = new AC();


    const resume = () => {

      if (
        audioCtx &&
        audioCtx.state === 'suspended'
      ) {
        audioCtx.resume();
      }

    };


    window.addEventListener(
      'pointerdown',
      resume
    );

    window.addEventListener(
      'keydown',
      resume
    );
  }


  if (
    audioCtx.state === 'suspended'
  ) {
    audioCtx.resume();
  }


  return audioCtx;
};


/* ============================================================
   BASIC TONE
   ============================================================ */

const tone = (
  freq,
  dur,
  type = 'square',
  vol = 0.1,
  when = 0,
  dest = null
) => {

  if (
    !audioCtx ||
    !Number.isFinite(freq)
  ) return;


  const t =
    audioCtx.currentTime + when;


  const osc =
    audioCtx.createOscillator();

  const gain =
    audioCtx.createGain();


  osc.type = type;


  osc.frequency.setValueAtTime(
    freq,
    t
  );


  gain.gain.setValueAtTime(
    0.0001,
    t
  );


  gain.gain.linearRampToValueAtTime(
    vol,
    t + 0.005
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    t + dur
  );


  osc.connect(gain);

  gain.connect(
    dest || audioCtx.destination
  );


  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };


  osc.start(t);

  osc.stop(
    t + dur + 0.02
  );
};


/* ============================================================
   SUSTAINED BASS
   ============================================================ */

const bassTone = (
  freq,
  dur,
  vol = 0.065,
  when = 0,
  dest = null
) => {

  if (
    !audioCtx ||
    !Number.isFinite(freq)
  ) return;


  const t =
    audioCtx.currentTime + when;


  const osc =
    audioCtx.createOscillator();

  const gain =
    audioCtx.createGain();


  osc.type =
    'triangle';


  osc.frequency.setValueAtTime(
    freq,
    t
  );


  // Soft attack
  gain.gain.setValueAtTime(
    0.0001,
    t
  );


  gain.gain.linearRampToValueAtTime(
    vol,
    t + 0.025
  );


  // Sustain
  gain.gain.setValueAtTime(
    vol * 0.9,
    t + dur * 0.65
  );


  // Release
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    t + dur
  );


  osc.connect(gain);

  gain.connect(
    dest || audioCtx.destination
  );


  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };


  osc.start(t);

  osc.stop(
    t + dur + 0.02
  );
};


/* ============================================================
   MUSIC GAIN
   ============================================================ */

const ensureMusicGain = () => {

  if (!musicGain) {

    musicGain =
      audioCtx.createGain();

    musicGain.gain.value =
      0;

    musicGain.connect(
      audioCtx.destination
    );
  }

  return musicGain;
};


/* ============================================================
   ARPEGGIO
   ============================================================

   The arpeggio now has several patterns.

   Instead of:

       .   X   .   X

   it can use:

       X . X X
       . X X .
       X . . X
       X X . X

   This creates movement without competing with the melody.
   ============================================================ */

const getArpNote = (
  chord,
  bar,
  stepInBar
) => {

  const notes =
    chord.notes;


  const patterns = [

    // Cmaj7 / Am7 / Fmaj7 style
    [0, 2, 1, 3],

    // Ascending / descending
    [0, 1, 2, 1],

    // More open
    [0, 2, 3, 1],

    // Return pattern
    [2, 1, 3, 0],
  ];


  const pattern =
    patterns[
      bar % patterns.length
    ];


  // Clamp the pattern index to the chord size so 3-note
  // chords (C, G, F) never resolve to `undefined`.
  const idx =
    pattern[stepInBar] %
    notes.length;


  return notes[idx];
};


/* ============================================================
   PLAY STEP
   ============================================================ */

const playStep = (runId) => {
  // Abort if music was stopped or this scheduler is obsolete.
  if (
    !musicOn ||
    !audioCtx ||
    runId !== musicRunId
  ) {
    schedulerId = null;
    return;
  }

  try {
    // Explicitly loop the complete song.
    const step = noteIndex % TOTAL_STEPS;

    const bar = Math.floor(step / 4);
    const stepInBar = step % 4;

    const chord = CHORDS[bar];
    const lead = MELODY[step];

    const stepSeconds = stepMs / 1000;

    /* ========================================================
       BASS

       One sustained root per bar.
       ======================================================== */

    if (stepInBar === 0) {
      bassTone(
        chord.bass,
        stepSeconds * 3.8,
        0.065,
        0,
        musicGain
      );
    }


    /* ========================================================
       SECTION

       0 = A
       1 = A'
       2 = B
       3 = A''
       ======================================================== */

    const section = Math.floor(bar / 8);


    /* ========================================================
       ARPEGGIO
       ======================================================== */

    let playArp = false;

    if (section === 0) {

      // Intro / main theme
      playArp =
        stepInBar === 1 ||
        stepInBar === 3;

    } else if (section === 1) {

      // More active variation
      playArp =
        stepInBar !== 2;

    } else if (section === 2) {

      // Bridge
      playArp =
        stepInBar !== 0;

    } else {

      // Final section
      playArp = true;
    }


    if (playArp) {

      const arpNote =
        getArpNote(
          chord,
          bar,
          stepInBar
        );


      const octave =
        section >= 2
          ? 1
          : 0.5;


      const arpVol =
        section === 3
          ? 0.045
          : 0.035;


      tone(
        arpNote * octave,
        stepSeconds * 0.38,
        'triangle',
        arpVol,
        0,
        musicGain
      );
    }


    /* ========================================================
       HARMONIC COLOR
       ======================================================== */

    if (
      chord.notes.length === 4 &&
      stepInBar === 3
    ) {

      const seventh =
        chord.notes[3];

      tone(
        seventh,
        stepSeconds * 0.28,
        'triangle',
        0.022,
        0,
        musicGain
      );
    }


    /* ========================================================
       FINAL SECTION DETAIL
       ======================================================== */

    if (
      section === 3 &&
      bar === 30 &&
      stepInBar === 3
    ) {

      tone(
        493.88,
        stepSeconds * 0.25,
        'triangle',
        0.035,
        0,
        musicGain
      );
    }


    /* ========================================================
       MELODY
       ======================================================== */

    if (
      typeof lead === 'number' &&
      lead > 0
    ) {

      tone(
        lead,
        stepSeconds * 0.52,
        'triangle',
        0.10,
        0,
        musicGain
      );
    }


    /* ========================================================
       ADVANCE

       The modulo makes the song loop forever:

       0 → 1 → ... → 127 → 0 → 1 → ...
       ======================================================== */

    noteIndex =
      (noteIndex + 1) % TOTAL_STEPS;


    /* ========================================================
       SCHEDULE NEXT STEP
       ======================================================== */

    schedulerId = setTimeout(
      () => {
        playStep(runId);
      },
      stepMs
    );

  } catch (error) {

    // Prevent the music from silently dying because
    // of an unexpected Web Audio error.
    console.error(
      'Music scheduler error:',
      error
    );

    schedulerId = null;

    // Try to recover while music is still enabled.
    if (
      musicOn &&
      runId === musicRunId
    ) {

      schedulerId = setTimeout(
        () => {
          playStep(runId);
        },
        stepMs
      );
    }
  }
};


/* ============================================================
   START MUSIC
   ============================================================ */

const startMusic = () => {

  const ctx =
    ensureCtx();


  if (!ctx) return;


  // Invalidate previous scheduler.
  musicRunId += 1;

  const runId =
    musicRunId;


  if (
    schedulerId !== null
  ) {

    clearTimeout(
      schedulerId
    );

    schedulerId = null;
  }


  const mg =
    ensureMusicGain();


  mg.gain.cancelScheduledValues(
    ctx.currentTime
  );


  mg.gain.setValueAtTime(
    0,
    ctx.currentTime
  );


  mg.gain.linearRampToValueAtTime(
    1,
    ctx.currentTime + 0.05
  );


  noteIndex = 0;


  schedulerId =
    setTimeout(
      () => {
        playStep(runId);
      },
      80
    );
};


/* ============================================================
   STOP MUSIC
   ============================================================ */

const stopMusic = () => {

  musicRunId += 1;


  if (
    schedulerId !== null
  ) {

    clearTimeout(
      schedulerId
    );

    schedulerId = null;
  }


  if (
    musicGain &&
    audioCtx
  ) {

    const now =
      audioCtx.currentTime;


    musicGain.gain.cancelScheduledValues(
      now
    );


    musicGain.gain.setValueAtTime(
      0,
      now
    );
  }
};


/* ============================================================
   MUSIC API
   ============================================================ */

export const setMusicEnabled = (on) => {

  musicOn = on;

  if (on) {
    startMusic();
  } else {
    stopMusic();
  }
};


export const setSfxEnabled = (on) => {
  sfxOn = on;
};


export const setMusicTempo = (tickMs) => {

  if (
    !tickMs ||
    tickMs <= 0
  ) {

    stepMs =
      DEFAULT_STEP;

    return;
  }


  for (
    let k = 1;
    k <= 16;
    k += 1
  ) {

    const s =
      (k * tickMs) / 4;


    if (
      s >= 90 &&
      s <= 180
    ) {

      stepMs =
        s;

      return;
    }
  }


  stepMs =
    DEFAULT_STEP;
};


export const isMusicEnabled = () => {
  return musicOn;
};


export const isSfxEnabled = () => {
  return sfxOn;
};


/* ============================================================
   SOUND EFFECTS
   ============================================================ */

export const playSfx = (name) => {

  if (!sfxOn) return;


  ensureCtx();


  const seq = (
    freqs,
    dur,
    type = 'square',
    gap = 60
  ) => {

    freqs.forEach(
      (f, i) => {

        setTimeout(
          () => {

            tone(
              f,
              dur,
              type,
              0.1
            );

          },
          i * gap
        );
      }
    );
  };


  switch (name) {

    case 'click':

      tone(
        880,
        0.05,
        'square',
        0.09
      );

      break;


    case 'move':

      tone(
        440,
        0.04,
        'square',
        0.07
      );

      break;


    case 'rotate':

      tone(
        520,
        0.05,
        'square',
        0.07
      );

      break;


    case 'dot':

      tone(
        523,
        0.03,
        'square',
        0.05
      );

      break;


    case 'eat':

      seq(
        [660, 880],
        0.06
      );

      break;


    case 'flag':

      tone(
        620,
        0.05,
        'triangle',
        0.12
      );

      break;


    case 'lock':

      tone(
        160,
        0.09,
        'square',
        0.12
      );

      break;


    case 'clear':

      seq(
        [523, 659, 784, 1047],
        0.08
      );

      break;


    case 'power':

      seq(
        [392, 523, 659, 784],
        0.08,
        'square',
        50
      );

      break;


    case 'ghost':

      seq(
        [784, 659, 523],
        0.08,
        'square',
        50
      );

      break;


    case 'win':

      seq(
        [
          523,
          659,
          784,
          1047,
          1319
        ],
        0.1,
        'square',
        80
      );

      break;


    case 'gameOver':

      seq(
        [
          392,
          330,
          262,
          196
        ],
        0.16,
        'sawtooth',
        120
      );

      break;


    default:
      break;
  }
};