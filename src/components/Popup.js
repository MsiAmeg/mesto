export class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  open(){
    this._popupElement.classList.add('popup_opened');
  }

  close(){
    this._popupElement.classList.remove('popup_opened');
  }

  _handleXClose(event){
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')){
      this.classList.remove('popup_opened');
    }
  }


  _handleEscClose(event){
    if (event.key === "Escape"){
      this.classList.remove('popup_opened');
    };
  }

  setEventListeners(){
    document.addEventListener('keydown', this._handleEscClose.bind(this._popupElement));
    this._popupElement.addEventListener('mousedown', this._handleXClose.bind(this._popupElement));
  }
}
