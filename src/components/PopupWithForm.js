import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSumbit}){
    super(popupSelector);
    this._formSubmit = this._formSubmit.bind(this);
    this._handleFormSumbit = handleFormSumbit;
    this._popupForm = this._popupElement.querySelector('form');
    this._formInputs = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._submitBtn = this._popupElement.querySelector('.popup__button');
  }
  _getInputValues(){
    const _inputValues = {};
    this._formInputs.forEach((inputEl) => {
      _inputValues[inputEl.name] = inputEl.value;
    });
    return _inputValues;
  }

  _submitBtnText(text){
    this._submitBtn.textContent = text;
  }

  _formSubmit(event){
    this._submitBtnText('Сохранение...');
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
    this._submitBtnText('Сохранить');
  }
}
