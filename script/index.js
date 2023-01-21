import { initialCards } from "./cardsArray.js";
import { Card, disableSubmitBtn} from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const cardsContainer = document.querySelector('.cards-grid');
const popups = document.querySelectorAll('.popup');
const containerPopups = document.querySelectorAll('.popup__container');

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const closeBtns = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupFormEditProfile = document.querySelector('.popup__container_edit-form');
const inputEditProfileName = popupEditProfile.querySelector('.popup__input_data_name');
const inputEditProfileJob = popupEditProfile.querySelector('.popup__input_data_job');
const popupEditProfileSubmitBtn = popupEditProfile.querySelector('.popup__submit-button');

const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = document.querySelector('.popup__container_add-card');
const inputAddCardName = popupAddCard.querySelector('.popup__input_data_card-title');
const inputAddCardImage = popupAddCard.querySelector('.popup__input_data_image');
const popupAddCardSubmitBtn = popupAddCard.querySelector('.popup__submit-button');


function handleFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = inputEditProfileName.value;
  profileDescription.textContent = inputEditProfileJob.value;
  closePopup(popupEditProfile);
}

function handleFormSubmitCard(event) {
  event.preventDefault();

  const imageName = inputAddCardName.value;
  const imageUrl = inputAddCardImage.value;
  const card = new Card(imageName, imageUrl, "#card");
  const cardEl = card.generateCard();

  cardsContainer.prepend(cardEl);
  closePopup(popupAddCard);

  inputAddCardName.value = "";
  inputAddCardImage.value = "";
}

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function insertProfileInfo() {
  const profileName = profileTitle.textContent;
  const profilejob = profileDescription.textContent;
  inputEditProfileName.value = profileName;
  inputEditProfileJob.value = profilejob;
}

export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}


editButton.addEventListener('click', () => {
  insertProfileInfo();
  disableSubmitBtn(popupEditProfileSubmitBtn, "popup__button_disabled");
  openPopup(popupEditProfile);
});

const closeByEsc = (event) => {
    if (event.key === "Escape"){
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  };
};

popupFormEditProfile.addEventListener('submit', handleFormSubmit);

btnAddCard.addEventListener('click', () => {
  disableSubmitBtn(popupAddCardSubmitBtn, "popup__button_disabled");
  openPopup(popupAddCard);
});
popupAddCardForm.addEventListener('submit', handleFormSubmitCard);

//initialCards.forEach(element => prependCard(element.name, element.link));


initialCards.forEach(element =>  {
  const card = new Card(element.name, element.link, "#card");
  const cardEl = card.generateCard();

  cardsContainer.prepend(cardEl);
});

  const profileValidation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible'
  }, '.popup__form_edit-profile');

  profileValidation.enableValidation();

  const addCardValidation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible'
  }, '.popup__form_add-card');

  addCardValidation.enableValidation();

popups.forEach((item) => item.addEventListener('click', () => closePopup(item)));
containerPopups.forEach(item => item.addEventListener('click', (event) => event.stopPropagation()));
closeBtns.forEach(item => item.addEventListener('click', () => closePopup(item)));
