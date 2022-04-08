export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatar }) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return this._user;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}