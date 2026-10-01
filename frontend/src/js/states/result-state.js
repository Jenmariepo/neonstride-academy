import { text, byId, metric } from '../ui/dom.js';
export function renderResult(result, profile) {
  text(
    'result-title',
    result.outcome === 'won'
      ? '¡Misión completada!'
      : result.practice
        ? 'Entrenamiento completado'
        : 'Cada detalle cuenta',
  );
  text('result-profile', `${profile.avatar} ${profile.name}`);
  text('result-score', result.score);
  const metrics = {
    Nivel: result.level,
    Intentos: result.rounds,
    Aciertos: result.hits,
    Errores: result.misses,
    Precisión: `${result.accuracy}%`,
    'Mejor racha': result.best_streak,
  };
  byId('result-metrics').replaceChildren(
    ...Object.entries(metrics).map(([label, value]) => metric(label, value)),
  );
  text(
    'save-status',
    result.practice ? 'Práctica: no modifica récords ni logros.' : 'Guardando resultado…',
  );
}
