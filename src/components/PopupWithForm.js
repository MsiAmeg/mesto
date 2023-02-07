import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSumbit}){
    super(popupSelector);
    this._handleFormSumbit = handleFormSumbit;
    this._popupForm = this._popupElement.querySelector('form');
    this._formInputs = Array.from(this._popupElement.querySelectorAll('.popup__input'));
  }
  _getInputValues(){
    const _inputValues = {};
    this._formInputs.forEach((inputEl) => {
      _inputValues[inputEl.name] = inputEl.value;
    });
    return _inputValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (event) => {this._handleFormSumbit(event, this._getInputValues())});
  }

  close(){
    super.close();
    this._popupForm.reset();
  }
}
