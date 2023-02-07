export class UserInfo {
  constructor({profileNameSelector, profileInfoSelector}){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);;
  }
  getUserInfo(){
    const profileInfo = {nameInput: this._profileName.textContent,
    jobInput: this._profileInfo.textContent};
    return profileInfo;
  }
  setUserInfo({name, job}){
    console.log(name);
    this._profileName.textContent = name;
    this._profileInfo.textContent = job;
  }
}
