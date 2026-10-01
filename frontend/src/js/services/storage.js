export function readStored(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(`neonstride:${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStored(key, value) {
  try {
    localStorage.setItem(`neonstride:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
