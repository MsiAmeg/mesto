import { initialCards } from "../components/cardsArray.js";
import { FormValidator } from "../components/FormValidator.js";
import Section  from "../components/Section.js";
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
  validationParams} from '../utils/constants.js'
import {
  createCard,
  insertProfileInfo} from '../utils/utils.js';
import './index.css';


editButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  insertProfileInfo({data});
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

const userInfo = new UserInfo({profileName: '.profile__title', profileInfo: '.profile__description'});

const profileValidation = new FormValidator(validationParams, popupFormEditProfile);
profileValidation.enableValidation();

const addCardValidation = new FormValidator(validationParams, popupAddCardForm);
addCardValidation.enableValidation();


const profilePopup = new PopupWithForm('.popup_edit-profile', {handleFormSumbit: (event) => {
  event.preventDefault();
  userInfo.setUserInfo({
    name: inputEditProfileName.value,
    job: inputEditProfileJob.value
  });

  profilePopup.close();
}});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_add-card', {handleFormSumbit: (event) => {
  event.preventDefault();

  const imageName = inputAddCardName.value;
  const imageUrl = inputAddCardImage.value;
  const cardEl = createCard(imageName, imageUrl);

  cardsList.setItem(cardEl);
  cardPopup.close();

  event.target.reset();
}});
cardPopup.setEventListeners();

export const imageDefaultPopup = new PopupWithImage('.popup_large-image');
imageDefaultPopup.setEventListeners();
