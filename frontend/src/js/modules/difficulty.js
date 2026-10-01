import { DIFFICULTIES, RULES } from '../utils/constants.js';
export function difficultyFor(difficulty, level) {
  const config = DIFFICULTIES[difficulty];
  const growth = level - RULES.initialLevel;
  const pressure =
    1 + growth * RULES.prismLevelFactor + growth * growth * RULES.prismLevelAcceleration;
  return {
    ...config,
    size: Math.min(RULES.maximumGrid, config.size + Math.floor(growth / RULES.levelsPerGrid)),
    seconds: Math.max(
      RULES.minimumSeconds,
      config.seconds - growth * RULES.secondsPerLevel * config.speed,
    ),
    prismSpeed: RULES.prismPerSecond * config.speed * pressure,
    prismRelief: RULES.prismRelief / (config.speed * (1 + growth * RULES.prismReliefDecay)),
  };
}
export function levelFor(hits) {
  return RULES.initialLevel + Math.floor(hits / RULES.hitsPerLevel);
}
