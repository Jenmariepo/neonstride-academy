import { byId } from './dom.js';
export function showDialog(id) {
  const dialog = byId(id);
  if (!dialog.open) dialog.showModal();
}
export function closeDialog(id) {
  byId(id).close();
}
