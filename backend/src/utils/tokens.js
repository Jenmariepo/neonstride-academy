import { randomBytes, createHash } from 'node:crypto';
import { LIMITS } from '../config/constants.js';
export function createToken() {
  return randomBytes(LIMITS.tokenBytes).toString('hex');
}
export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}
