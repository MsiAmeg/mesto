import {Popup} from "./Popup.js";
export class PopupDelete extends Popup {
  constructor(popupSelector, {handleFormSumbit}){
    super(popupSelector);
    this._handleFormSumbit = handleFormSumbit;
    this._formSubmit = this._formSubmit.bind(this);
  }

  open(cardId, cardEl){
    super.open();
    this._cardId = cardId;
    this._cardEl = cardEl;
  }

  _formSubmit(event){
    event.preventDefault();
    this._handleFormSumbit(this._cardId, this._cardEl);
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._formSubmit);
  }

  removeEventListeners(){
    super.removeEventListeners();
    this._popupElement.removeEventListener('submit', this._formSubmit);
  }
}
