export class UserInfo {
  constructor({profileName, profileInfo}){
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);;
  }
  getUserInfo(){
    const profileInfo = {'name-input': this._profileName.textContent,
    'job-input': this._profileInfo.textContent};
    return profileInfo;
  }
  setUserInfo({name, job}){
    this._profileName.textContent = name;
    this._profileInfo.textContent = job;
  }
}
