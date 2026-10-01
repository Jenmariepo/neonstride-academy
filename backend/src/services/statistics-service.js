import { MODES, DIFFICULTIES } from '../../../frontend/src/js/utils/constants.js';
import {
  evaluateAchievements,
  ACHIEVEMENT_RULES,
} from '../../../frontend/src/js/modules/achievements.js';
export function summarizeGames(games) {
  const records = Object.fromEntries(
    [...Object.keys(MODES), ...Object.keys(DIFFICULTIES)].map((key) => [key, 0]),
  );
  const stats = {
    games: games.length,
    wins: 0,
    streak: 0,
    score: 0,
    level: 0,
    precise: false,
    extreme: false,
    modes: 0,
  };
  games.forEach((game) => collectGame(game, records, stats));
  stats.modes = new Set(games.map((game) => game.mode)).size;
  return { records, stats, achievements: evaluateAchievements(stats) };
}
function collectGame(game, records, stats) {
  records[game.mode] = Math.max(records[game.mode], game.score);
  records[game.difficulty] = Math.max(records[game.difficulty], game.score);
  stats.score = Math.max(stats.score, game.score);
  stats.streak = Math.max(stats.streak, game.best_streak);
  stats.level = Math.max(stats.level, game.level);
  stats.wins += Number(game.outcome === 'won');
  stats.extreme ||= game.outcome === 'won' && game.difficulty === 'extreme';
  stats.precise ||=
    game.accuracy >= ACHIEVEMENT_RULES.precision &&
    game.rounds >= ACHIEVEMENT_RULES.minimumAttempts;
}
