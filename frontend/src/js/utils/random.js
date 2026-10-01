export function randomIndex(length, random = Math.random) {
  return Math.floor(random() * length);
}
export function pick(items, random = Math.random) {
  return items[randomIndex(items.length, random)];
}
