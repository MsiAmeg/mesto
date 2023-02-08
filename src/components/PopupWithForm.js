import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSumbit}){
    super(popupSelector);
    this._formSubmit = this._formSubmit.bind(this);
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

  _formSubmit(event){
    event.preventDefault();
    this._handleFormSumbit(this._getInputValues());
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._formSubmit);
  }


  removeEventListeners(){
    super.removeEventListeners();
    this._popupElement.removeEventListener('submit', this._formSubmit);
  }

  close(){
    super.close();
    this._popupForm.reset();
  }
}
