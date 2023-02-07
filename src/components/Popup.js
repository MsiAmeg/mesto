export class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleXClose = this._handleXClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(){
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close(){
    this.removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }

  _handleXClose(event){
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')){
      this.close();
    }
  }


  _handleEscClose(event){
    if (event.key === "Escape"){
      this.close();
    };
  }

  setEventListeners(){
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._handleXClose);
  }

  removeEventListeners(){
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('mousedown', this._handleXClose);
  }
}
