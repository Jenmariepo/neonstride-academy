import { AVATARS, RULES } from './constants.js';
export function validateProfile(profile) {
  if (typeof profile?.name !== 'string') return 'Escribe tu nombre.';
  const name = profile.name.trim();
  if (name.length < RULES.nameMinimum || name.length > RULES.nameMaximum)
    return 'El nombre debe tener entre 2 y 20 caracteres.';
  if (!/^[\p{L}\p{N} _-]+$/u.test(name))
    return 'Usa letras, números, espacios, guiones o guion bajo.';
  if (!AVATARS.includes(profile.avatar)) return 'Selecciona un avatar válido.';
  return '';
}
