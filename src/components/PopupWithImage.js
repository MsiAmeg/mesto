import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImagePic = this._popupElement.querySelector('.popup__image');
    this._popupCaption = this._popupElement.querySelector('.popup__caption')
  }

  open(name, link){
    this._popupImagePic.src = link;
    this._popupImagePic.alt = name;
    this._popupCaption.textContent = name;

    super.open();
  }
}
