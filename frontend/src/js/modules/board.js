import { LETTERS, EMOJIS } from '../data/symbols.js';
import { pick, randomIndex } from '../utils/random.js';
export function createBoard(mode, size, random = Math.random) {
  const bank =
    mode === 'mix' ? pick([LETTERS, EMOJIS], random) : mode === 'letters' ? LETTERS : EMOJIS;
  const [normal, different] = pick(bank, random);
  const targetIndex = randomIndex(size * size, random);
  const cells = Array.from({ length: size * size }, (_, index) =>
    index === targetIndex ? different : normal,
  );
  return { size, cells, targetIndex };
}
