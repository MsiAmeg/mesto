import {openPopup} from './index.js';

export class Card {
  constructor(name, link, TemplateSelector){
    this._name = name;
    this._link = link;
    this._TemplateSelector = TemplateSelector;
  }



  _getTemplate = () => {
    const cardEl = document.querySelector(this._TemplateSelector).content.querySelector('.card').cloneNode(true);
    return cardEl;
  }

  _setEventListeners = () => {
    const popupImage = document.querySelector('.popup_large-image');
    const likeBtn = this._element.querySelector('.card__like');
    const trashBtn = this._element.querySelector('.card__trash');

    const _setImageToPopup = (name, link) => {
      const popup_image = popupImage.querySelector('.popup__image');
      const popup_caption = popupImage.querySelector('.popup__caption');

      popup_image.src = link;
      popup_image.alt = name;
      popup_caption.textContent = name;
    }

    this._element.querySelector('.card__image').addEventListener('click', () => {
      _setImageToPopup(this._name, this._link);
      openPopup(popupImage);
    });

    likeBtn.addEventListener('click', () => likeBtn.classList.toggle('card__like_active'));
    trashBtn.addEventListener('click', () => trashBtn.closest('.card').remove());
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');

    cardImage.alt = this._name;
    cardImage.src = this._link;
    cardTitle.textContent = this._name;


    return this._element;
  }
}


export function disableSubmitBtn(submitBtn, disableClass) {
  submitBtn.classList.add(disableClass);
  submitBtn.setAttribute("disabled", "");
};
