export class UserInfo {
  constructor({profileNameSelector, profileInfoSelector, profilePictureSelector}){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
    this._profilePicture = document.querySelector(profilePictureSelector);
  }
  getUserInfo(){
    const profileInfo = {nameInput: this._profileName.textContent,
    jobInput: this._profileInfo.textContent};
    return profileInfo;
  }
  setUserInfo({name, about}){
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
  }

  setUserAvatar({avatar}){
    this._profilePicture.src = avatar;
  }
}
