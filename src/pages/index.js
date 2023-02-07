import { initialCards } from "../utils/cardsArray.js";
import { FormValidator } from "../components/FormValidator.js";
import Section  from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {editButton,
  btnAddCard,
  popupFormEditProfile,
  inputEditProfileName,
  inputEditProfileJob,
  popupAddCardForm,
  inputAddCardName,
  inputAddCardImage,
  validationParams} from '../utils/constants.js';
import './index.css';


function createCard(name, link) {
  const card = new Card(name, link, "#card", handleCardClick);
  const cardEl = card.generateCard();
  return cardEl;
}

function handleCardClick(name, link) {
  imageDefaultPopup.open(name, link);
}

function insertProfileInfo({nameInput, jobInput}) {
  inputEditProfileName.value = nameInput;
  inputEditProfileJob.value = jobInput;
}



editButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  insertProfileInfo(data);
  profileValidation.resetValidation();
  profileValidation.disableSubmitBtn();
  profilePopup.open();
});

btnAddCard.addEventListener('click', () => {
  addCardValidation.resetValidation();
  cardPopup.open();
});

const cardsList = new Section({
  data: initialCards,
  renderer: (element) => {
    const cardEl = createCard(element.name, element.link);
    cardsList.setItem(cardEl);
  },
}, '.cards-grid');

cardsList.renderItems();

const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileInfoSelector: '.profile__description'});

const profileValidation = new FormValidator(validationParams, popupFormEditProfile);
profileValidation.enableValidation();

const addCardValidation = new FormValidator(validationParams, popupAddCardForm);
addCardValidation.enableValidation();


const profilePopup = new PopupWithForm('.popup_edit-profile', {handleFormSumbit: (event, {job, fullName}) => {
  event.preventDefault();
  userInfo.setUserInfo({
    name: fullName,
    job: job
  });

  profilePopup.close();
}});

const cardPopup = new PopupWithForm('.popup_add-card', {handleFormSumbit: (event) => {
  event.preventDefault();

  const imageName = inputAddCardName.value;
  const imageUrl = inputAddCardImage.value;
  const cardEl = createCard(imageName, imageUrl);

  cardsList.setItem(cardEl);
  cardPopup.close();

  event.target.reset();
}});

const imageDefaultPopup = new PopupWithImage('.popup_large-image');
