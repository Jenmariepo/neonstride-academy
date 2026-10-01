import { showDialog, closeDialog } from '../ui/dialogs.js';
export function renderPause(paused) {
  if (paused) showDialog('pause-dialog');
  else closeDialog('pause-dialog');
}
