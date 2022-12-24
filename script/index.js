import { initialCards } from "./cardsArray.js";
import { enableValidation } from "./validate.js";

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

const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = document.querySelector('.popup__container_add-card');
const inputAddCardName = popupAddCard.querySelector('.popup__input_data_card-title');
const inputAddCardImage = popupAddCard.querySelector('.popup__input_data_image');

const popupImage = document.querySelector('.popup_large-image');
const popup_image = popupImage.querySelector('.popup__image');
const popup_caption = popupImage.querySelector('.popup__caption');

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

  prependCard(imageName, imageUrl);
  closePopup(popupAddCard);
  inputAddCardName.value = "";
  inputAddCardImage.value = "";
}

function createCard(name, url) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeBtn = card.querySelector('.card__like');
  const trashBtn = card.querySelector('.card__trash');
  const cardImage = card.querySelector('.card__image');

  cardImage.alt = name;
  cardImage.src = url;
  cardImage.addEventListener('click', () => {
    setImageToPopup(name, url);
    openPopup(popupImage);
  });
  likeBtn.addEventListener('click', () => likeBtn.classList.toggle('card__like_active'));
  trashBtn.addEventListener('click', () => trashBtn.closest('.card').remove());
  card.querySelector('.card__title').textContent = name;

  return card;
}

function prependCard(name, url) {
  cardsContainer.prepend(createCard(name, url));
}

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
}

function insertProfileInfo() {
  const profileName = profileTitle.textContent;
  const profilejob = profileDescription.textContent;
  inputEditProfileName.value = profileName;
  inputEditProfileJob.value = profilejob;
}

function openPopup(item) {
  item.classList.add('popup_opened');
}

function setImageToPopup(name, url) {
  popup_image.src = url;
  popup_image.alt = name;
  popup_caption.textContent = name;
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
});

editButton.addEventListener('click', () => {
  insertProfileInfo();
  openPopup(popupEditProfile);
});

document.addEventListener('keydown', (event) => {
  if (event.key === "Escape"){
    popups.forEach((item) => {
      if (item.classList.contains('popup_opened')){
        closePopup(item);
      };
    });
  };
});

popupFormEditProfile.addEventListener('submit', handleFormSubmit);

btnAddCard.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardForm.addEventListener('submit', handleFormSubmitCard);

initialCards.forEach(element => prependCard(element.name, element.link));


popups.forEach((item) => item.addEventListener('click', () => closePopup(item)));
containerPopups.forEach(item => item.addEventListener('click', (event) => event.stopPropagation()));
closeBtns.forEach(item => item.addEventListener('click', () => closePopup(item)));
