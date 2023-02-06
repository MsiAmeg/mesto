import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSumbit}){
    super(popupSelector);
    this._handleFormSumbit = handleFormSumbit;
    this._popupImagePic = this._popupElement.querySelector('.popup__image');
    this._popupCaption = this._popupElement.querySelector('.popup__caption');
    this._popupForm = this._popupElement.querySelector('form');
  }
  _getInputValues(){
    this._formInputs = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._inputValues = {};
    this._formInputs.forEach((inputEl) => {
      this._inputValues[inputEl.id] = inputEl.value;
    });
    return this._inputValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._handleFormSumbit);
  }

  close(){
    super.close();
    this._popupForm.reset();
  }
}
