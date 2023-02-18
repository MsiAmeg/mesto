import { initialCards } from "../utils/cardsArray.js";
import { FormValidator } from "../components/FormValidator.js";
import Section  from "../components/Section.js";
import { Card } from "../components/Card.js";
import { Popup} from "../components/Popup.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {editButton,
  btnAddCard,
  popupFormEditProfile,
  inputEditProfileName,
  inputEditProfileJob,
  popupAddCardForm,
  inputAddCardName,
  inputAddCardImage,
  validationParams,
  editAvatarButton,
  popupEditAvatar} from '../utils/constants.js';
import './index.css';

const api = new Api({
  url: "https://mesto.nomoreparties.co/",
  authorization: "c0e56340-d4b4-40f3-996d-780e6ca9c44e",
  cohort: "cohort-60"
});
let userId;
let cardsList;



function createCard(name, link, cardOwnerId, userId, cardId, likeCount) {
  const card = new Card(name, link, "#card", handleCardClick, cardOwnerId, userId, cardId, handleDeleteCard, likeCount, handleLikeClick);
  const cardEl = card.generateCard();
  return cardEl;
}

function handleCardClick(name, link) {
  imageDefaultPopup.open(name, link);
}

function handleDeleteCard(cardId, cardEl) {
  deleteCardPopup.open(cardId, cardEl);
}

function handleLikeClick(cardId, isLiked, likeBtn, likeCountEl) {
  if (isLiked) {
    api.deleteLike(cardId)
    .then((element) =>{
      likeBtn.classList.remove('card__like_active');
      likeCountEl.textContent = element.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.setLike(cardId)
    .then((element) =>{
      likeBtn.classList.add('card__like_active');
      likeCountEl.textContent = element.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

function insertProfileInfo({nameInput, jobInput}) {
  inputEditProfileName.value = nameInput;
  inputEditProfileJob.value = jobInput;
}

api.getUserData()
.then(data => {
  userInfo.setUserAvatar(data);
  userInfo.setUserInfo(data);
  userId = data._id;
})
.catch((err) => {
  console.log(err);
});


api.getInitialCards()
.then(data => {
  console.log(data);
  cardsList = new Section({
    data: data,
    renderer: (element) => {
      const cardEl = createCard(element.name, element.link, element.owner._id, userId, element._id, element.likes);
      cardsList.setItem(cardEl);
    },
  }, '.cards-grid');
  cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
});




editButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  insertProfileInfo(data);
  profileValidation.resetValidation();
  profileValidation.disableSubmitBtn();
  profilePopup.open();
});

editAvatarButton.addEventListener('click', () => {
  addCardValidation.resetValidation();
  profileAvatarPopup.open();
});

btnAddCard.addEventListener('click', () => {
  addCardValidation.resetValidation();
  cardPopup.open();
});

const userInfo = new UserInfo({profileNameSelector: '.profile__title',
  profileInfoSelector: '.profile__description',
  profilePictureSelector: '.profile__picture'
});

const profileValidation = new FormValidator(validationParams, popupFormEditProfile);
profileValidation.enableValidation();

const addCardValidation = new FormValidator(validationParams, popupAddCardForm);
addCardValidation.enableValidation();

const avatarValidation = new FormValidator(validationParams, popupEditAvatar);
avatarValidation.enableValidation();


const profilePopup = new PopupWithForm('.popup_edit-profile', {handleFormSumbit: ({job, fullName}) => {
  api.setUserData({
    name: fullName,
    about: job
  })
  .then(() => {
    userInfo.setUserInfo({
      name: fullName,
      about: job
    });
    profilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
}});

const profileAvatarPopup = new PopupWithForm('.popup_edit-avatar', {handleFormSumbit: ({avatar}) => {
  api.setUserAvatar({avatar})
  .then(() => {
    userInfo.setUserAvatar({avatar});
    profileAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
}});

const cardPopup = new PopupWithForm('.popup_add-card', {handleFormSumbit: () => {
  const name = inputAddCardName.value;
  const link = inputAddCardImage.value;
  api.setCard({name, link})
  .then((element) => {
    const cardEl = createCard(element.name, element.link, element.owner._id, userId, element._id, element.likes);

    cardsList.setItem(cardEl);
    cardPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
}});

const deleteCardPopup = new PopupDelete('.popup_delete-card', {handleFormSumbit: (cardId, cardEl) => {
  api.deleteCard(cardId)
  .then(() => {
    deleteCardPopup.close();
    cardEl.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}});


const imageDefaultPopup = new PopupWithImage('.popup_large-image');
