export class Card {
  constructor(name, link, templateSelector, handleCardClick, cardOwnerId, userId, cardId, handleDeleteCard, likeCount, handleLikeClick){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likeCard = this._likeCard.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this._isOwner = cardOwnerId == userId ? true : false;
    this._userId = userId;
    this._cardId = cardId;
    this._handleDeleteCard = handleDeleteCard;
    this._likeCount = likeCount.length;
    this._likes = likeCount;
    console.log(this._likes);
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate = () => {
    const cardEl = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardEl;
  }

  _likeCard() {
    const isLiked = this._likeBtn.classList.contains('card__like_active');
    this._handleLikeClick(this._cardId, isLiked, this);
  }

  likeClick(likes) {
    this._likeBtn.classList.add('card__like_active');
    this._likeCountEl.textContent = likes;
  }

  unlikeClick(likes) {
      this._likeBtn.classList.remove('card__like_active');
      this._likeCountEl.textContent = likes;
  }

  _deleteCard(){
    this._handleDeleteCard(this._cardId, this._element);
  }

  _setEventListeners = () => {
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like');
    this._likeCountEl = this._element.querySelector('.card__like-count');
    this._trashBtn = this._element.querySelector('.card__trash');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeBtn.addEventListener('click', this._likeCard);
  }

  _ownerChecks() {
    if (this._isOwner){
      this._trashBtn.addEventListener('click', this._deleteCard);
    }
    else {
      this._trashBtn.remove();
    }
    this._likes.forEach(element => {
      if (element._id == this._userId){
        this._likeBtn.classList.add('card__like_active');
      }
    });
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._ownerChecks();

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    console.log(this._likeCount);
    this._likeCountEl.textContent = this._likeCount;

    return this._element;
  }
}
