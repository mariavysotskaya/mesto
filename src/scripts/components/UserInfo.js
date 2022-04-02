export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return this._user;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}