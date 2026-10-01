import { UI } from '../utils/constants.js';
export async function request(path, { method = 'GET', body, token } = {}) {
  const base = document.querySelector('meta[name="api-base"]').content.replace(/\/$/, '');
  const response = await fetch(`${base}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(UI.httpTimeout),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success)
    throw new Error(payload.message || 'No se pudo conectar al servidor.');
  return payload.data;
}
