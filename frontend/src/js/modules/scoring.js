import { POINTS, RULES } from '../utils/constants.js';
export function hitPoints(remaining, duration, streak) {
  return (
    POINTS.base +
    Math.round((POINTS.speedMaximum * remaining) / duration) +
    Math.min(POINTS.streakMaximum, streak * POINTS.streakStep)
  );
}
export function accuracyFor(hits, misses) {
  return hits + misses ? Math.round((hits / (hits + misses)) * RULES.raceFinish) : 0;
}
export function penalize(score, kind) {
  return Math.max(0, score - POINTS[kind]);
}
