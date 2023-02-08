export class Card {
  constructor(name, link, templateSelector, handleCardClick){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likeCard = this._likeCard.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  _getTemplate = () => {
    const cardEl = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardEl;
  }

  _likeCard() {
    this._likeBtn.classList.toggle('card__like_active')
  }

  _deleteCard(){
    this._element.remove();
  }

  _setEventListeners = () => {
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like');
    this._trashBtn = this._element.querySelector('.card__trash');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeBtn.addEventListener('click', this._likeCard);
    this._trashBtn.addEventListener('click', this._deleteCard);
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
