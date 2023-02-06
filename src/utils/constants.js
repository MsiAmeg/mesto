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


const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
}

export {
  editButton,
  btnAddCard,
  popupFormEditProfile,
  inputEditProfileName,
  inputEditProfileJob,
  popupAddCardForm,
  inputAddCardName,
  inputAddCardImage,
  validationParams
};
