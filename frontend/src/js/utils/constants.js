export const DIFFICULTIES = {
  easy: { label: 'Fácil', seconds: 20, size: 3, speed: 1 },
  normal: { label: 'Normal', seconds: 15, size: 4, speed: 1.3 },
  hard: { label: 'Difícil', seconds: 11, size: 5, speed: 1.65 },
  extreme: { label: 'Extremo', seconds: 8, size: 6, speed: 2.1 },
};
export const MODES = { letters: 'Letras', emojis: 'Emojis', mix: 'Mezcla' };
export const AVATARS = ['🧑‍🚀', '🦸', '🧙', '🐱', '🦊', '🐼', '🦁', '🐸', '🤖', '👽', '🦄', '🐧'];
export const THEMES = {
  blue: 'Azul',
  purple: 'Morado',
  green: 'Verde',
  orange: 'Naranja',
  dark: 'Oscuro',
};
export const RULES = {
  initialLives: 3,
  initialHints: 3,
  initialLevel: 1,
  hitsPerLevel: 3,
  maximumGrid: 8,
  levelsPerGrid: 2,
  minimumSeconds: 4,
  secondsPerLevel: 0.65,
  raceFinish: 100,
  progressPerHit: 3,
  prismPerSecond: 2.8,
  prismLevelFactor: 0.18,
  prismLevelAcceleration: 0.035,
  prismProgressFactor: 0.25,
  prismRelief: 4,
  prismReliefDecay: 0.35,
  prismNear: 55,
  prismUrgent: 80,
  recoveryPrism: 35,
  recoveryLives: 1,
  recoveryAttempts: 2,
  quizSeconds: 12,
  feedbackSeconds: 0.65,
  hintSeconds: 1.3,
  millisecondsPerSecond: 1000,
  nameMinimum: 2,
  nameMaximum: 20,
};
export const POINTS = {
  base: 100,
  speedMaximum: 50,
  streakStep: 10,
  streakMaximum: 150,
  wrong: 25,
  timeout: 40,
  hint: 50,
};
export const UI = {
  toastMilliseconds: 2400,
  effectMilliseconds: 1400,
  audioSeconds: 0.14,
  audioVolume: 0.04,
  audioFloor: 0.001,
  frequencies: { correct: 720, wrong: 170, timeout: 120, hint: 440, level: 940 },
  confettiCount: 24,
  httpTimeout: 8000,
};
