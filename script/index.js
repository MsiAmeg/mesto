import { initialCards } from "./cardsArray.js";
import { Card} from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const cardsContainer = document.querySelector('.cards-grid');
const popups = document.querySelectorAll('.popup');
const containerPopups = document.querySelectorAll('.popup__container');

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupFormEditProfile = document.forms["profile-form"];
const inputEditProfileName = popupEditProfile.querySelector('.popup__input_data_name');
const inputEditProfileJob = popupEditProfile.querySelector('.popup__input_data_job');

const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = document.forms["card-form"];
const inputAddCardName = popupAddCard.querySelector('.popup__input_data_card-title');
const inputAddCardImage = popupAddCard.querySelector('.popup__input_data_image');


const popupImage = document.querySelector('.popup_large-image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
}


function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = inputEditProfileName.value;
  profileDescription.textContent = inputEditProfileJob.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const imageName = inputAddCardName.value;
  const imageUrl = inputAddCardImage.value;
  const cardEl = createCard(imageName, imageUrl);

  cardsContainer.prepend(cardEl);
  closePopup(popupAddCard);

  event.target.reset();
}

function createCard(name, link) {
  const card = new Card(name, link, "#card", handleCardClick);
  const cardEl = card.generateCard();
  return cardEl;
}

function handleCardClick(name, link) {
    popupImagePic.src = link;
    popupImagePic.alt = name;
    popupCaption.textContent = name;
    openPopup(popupImage);
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

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}


editButton.addEventListener('click', () => {
  insertProfileInfo();
  profileValidation.resetValidation();
  profileValidation.disableSubmitBtn();
  openPopup(popupEditProfile);
});

const closeByEsc = (event) => {
    if (event.key === "Escape"){
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  };
};

popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);

btnAddCard.addEventListener('click', () => {
  addCardValidation.resetValidation();
  openPopup(popupAddCard);
});
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(element =>  {
  const cardEl = createCard(element.name, element.link);
  cardsContainer.prepend(cardEl);
});

  const profileValidation = new FormValidator(validationParams, popupFormEditProfile);

  profileValidation.enableValidation();

  const addCardValidation = new FormValidator(validationParams, popupAddCardForm);

  addCardValidation.enableValidation();

popups.forEach((item) => item.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')){
    closePopup(item);
  }
}));
