import { AVATARS } from '../utils/constants.js';
import { byId, element, text } from './dom.js';
import { showDialog, closeDialog } from './dialogs.js';
export class ProfileView {
  open(profile) {
    this.avatar = profile?.avatar || AVATARS[0];
    byId('profile-name').value = profile?.name || '';
    byId('cancel-profile').hidden = !profile?.name;
    text('profile-error', '');
    this.renderAvatars();
    showDialog('profile-dialog');
    byId('profile-name').focus();
  }
  renderAvatars() {
    byId('avatars').replaceChildren(
      ...AVATARS.map((avatar) => {
        const button = element('button', 'avatar', avatar);
        button.type = 'button';
        button.dataset.action = 'avatar';
        button.dataset.value = avatar;
        button.setAttribute('aria-pressed', String(avatar === this.avatar));
        button.setAttribute('aria-label', `Avatar ${avatar}`);
        return button;
      }),
    );
  }
  select(avatar) {
    this.avatar = avatar;
    this.renderAvatars();
  }
  read() {
    return { name: byId('profile-name').value.trim(), avatar: this.avatar };
  }
  close() {
    closeDialog('profile-dialog');
  }
}
