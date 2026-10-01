import { ApiError } from '../utils/api-error.js';
import { HTTP, LIMITS } from '../config/constants.js';
import { MODES, DIFFICULTIES, POINTS, RULES } from '../../../frontend/src/js/utils/constants.js';
import { validateProfile } from '../../../frontend/src/js/utils/validators.js';
import { levelFor } from '../../../frontend/src/js/modules/difficulty.js';
import { accuracyFor } from '../../../frontend/src/js/modules/scoring.js';

export function requireValid(condition, message) {
  if (!condition) throw new ApiError(HTTP.badRequest, message);
}
export function integer(value, maximum = LIMITS.maximumRounds) {
  return Number.isSafeInteger(value) && value >= 0 && value <= maximum;
}
function isChoice(choices, value) {
  return typeof value === 'string' && Object.hasOwn(choices, value);
}
export function validatePlayer(body) {
  const error = validateProfile(body);
  requireValid(!error, error);
  return { name: body.name.trim(), avatar: body.avatar };
}
export function validateGame(body) {
  requireValid(body && typeof body === 'object', 'Envía una partida válida.');
  requireValid(isChoice(MODES, body.mode), 'Modo no válido.');
  requireValid(isChoice(DIFFICULTIES, body.difficulty), 'Dificultad no válida.');
  requireValid(typeof body.practice === 'boolean', 'Práctica debe ser un booleano.');
  requireValid(['won', 'lost', 'abandoned'].includes(body.outcome), 'Resultado no válido.');
  requireValid(integer(body.score, LIMITS.maximumScore), 'Puntuación no válida.');
  validateStatistics(body);
  requireValid(
    typeof body.submission_id === 'string' &&
      /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(body.submission_id),
    'Identificador de envío no válido.',
  );
  return { ...body, accuracy: accuracyFor(body.hits, body.misses) };
}
function validateStatistics(body) {
  requireValid(
    ['rounds', 'hits', 'misses', 'best_streak', 'level'].every((key) => integer(body[key])),
    'Estadísticas no válidas.',
  );
  requireValid(
    body.rounds === body.hits + body.misses,
    'Las rondas no coinciden con los intentos.',
  );
  requireValid(body.level === levelFor(body.hits), 'El nivel no coincide con los aciertos.');
  requireValid(body.best_streak <= body.hits, 'Racha no válida.');
  const maximum = body.hits * (POINTS.base + POINTS.speedMaximum + POINTS.streakMaximum);
  requireValid(body.score <= maximum, 'La puntuación supera el máximo posible.');
  requireValid(!body.practice || body.score === 0, 'La práctica no genera puntos competitivos.');
  requireValid(
    body.outcome !== 'won' ||
      (!body.practice && body.hits * RULES.progressPerHit >= RULES.raceFinish),
    'La victoria requiere completar la carrera.',
  );
}
export function validateId(value) {
  const id = Number(value);
  requireValid(Number.isSafeInteger(id) && id > 0, 'Identificador no válido.');
  return id;
}
export function validateFilters(query) {
  const mode = query.mode || null;
  const difficulty = query.difficulty || null;
  requireValid(mode === null || isChoice(MODES, mode), 'Modo no válido.');
  requireValid(difficulty === null || isChoice(DIFFICULTIES, difficulty), 'Dificultad no válida.');
  return { mode, difficulty };
}
