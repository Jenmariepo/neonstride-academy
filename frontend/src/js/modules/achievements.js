const TARGETS = {
  firstStreak: 3,
  streakFive: 5,
  streakTen: 10,
  scoreFive: 500,
  scoreThousand: 1000,
  gamesFive: 5,
  gamesTen: 10,
  levelFive: 5,
  levelTen: 10,
  allModes: 3,
};
const definitions = [
  ['first-game', '🎮', 'Primer paso', 'Termina una partida.', (s) => s.games >= 1],
  ['first-win', '🥇', 'Primera victoria', 'Completa la carrera.', (s) => s.wins >= 1],
  [
    'first-streak',
    '✨',
    'Enlazando',
    'Consigue una racha de 3.',
    (s) => s.streak >= TARGETS.firstStreak,
  ],
  [
    'streak-five',
    '🔥',
    'En llamas',
    'Consigue una racha de 5.',
    (s) => s.streak >= TARGETS.streakFive,
  ],
  [
    'streak-ten',
    '⚡',
    'Eléctrico',
    'Consigue una racha de 10.',
    (s) => s.streak >= TARGETS.streakTen,
  ],
  ['score-five', '⭐', 'Despegue', 'Consigue 500 puntos.', (s) => s.score >= TARGETS.scoreFive],
  [
    'score-thousand',
    '💎',
    'Mil detalles',
    'Consigue 1.000 puntos.',
    (s) => s.score >= TARGETS.scoreThousand,
  ],
  ['games-five', '🛰️', 'Habitual', 'Juega 5 partidas.', (s) => s.games >= TARGETS.gamesFive],
  ['games-ten', '🏕️', 'Veterano', 'Juega 10 partidas.', (s) => s.games >= TARGETS.gamesTen],
  ['level-five', '📈', 'En ascenso', 'Alcanza el nivel 5.', (s) => s.level >= TARGETS.levelFive],
  ['level-ten', '🚀', 'Estratosférico', 'Alcanza el nivel 10.', (s) => s.level >= TARGETS.levelTen],
  ['accuracy', '🎯', 'Ojo de halcón', '90 % de precisión con 10 intentos.', (s) => s.precise],
  ['extreme', '🟣', 'Sin límites', 'Gana en Extremo.', (s) => s.extreme],
  ['explorer', '🧭', 'Explorador', 'Juega los tres modos.', (s) => s.modes >= TARGETS.allModes],
];
export const ACHIEVEMENT_RULES = { precision: 90, minimumAttempts: 10 };
export function evaluateAchievements(stats) {
  return definitions.map(([id, icon, name, description, test]) => ({
    id,
    icon,
    name,
    description,
    unlocked: test(stats),
  }));
}
