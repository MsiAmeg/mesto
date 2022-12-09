const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const CardsContainer = document.querySelector('.cards-grid');

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

let editProfileCloseBtn = document.querySelector('.popup__close-button_edit-profile');
let editProfilePopup = document.querySelector('.popup_edit-profile');
let editProfilePopupForm = document.querySelector('.popup__container_edit-form');
let editProfileNameInput = editProfilePopup.querySelector('.popup__input_data_name');
let editProfileJobInput = editProfilePopup.querySelector('.popup__input_data_job');

let addCardCloseBtn = document.querySelector('.popup__close-button_add-card');
let addCardPopup = document.querySelector('.popup_add-card');
let addCardPopupForm = document.querySelector('.popup__container_add-card');
let AddCardNameInput = addCardPopup.querySelector('.popup__input_data_card-title');
let AddCarImageInput = addCardPopup.querySelector('.popup__input_data_image');

function handleFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileJobInput.value;
  closePopup();
}

function handleFormSubmitCard(event) {
  event.preventDefault();

  let imageName = AddCardNameInput.value;
  let imageUrl = AddCarImageInput.value;

  createCard(imageName, imageUrl);
  AddCardNameInput.value = "";
  AddCarImageInput.value = "";
}

function createCard(name, url){
  const CardTemplate = document.querySelector('#card').content;
  let card = CardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = url;

  CardsContainer.prepend(card);
}

function closePopup() {
  editProfilePopup.classList.remove('popup_opened');
}

function openPopup() {
  let profileName = profileTitle.textContent;
  let profilejob = profileDescription.textContent;

  editProfileNameInput.value = profileName;
  editProfileJobInput.value = profilejob;
  editProfilePopup.classList.add('popup_opened');
}

function openCardAddPopup() {
  addCardPopup.classList.add('popup_opened');
}

function closeCardAddPopup() {
  addCardPopup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
editProfileCloseBtn.addEventListener('click', closePopup);
editProfilePopupForm.addEventListener('submit', handleFormSubmit);

addCardBtn.addEventListener('click', openCardAddPopup);
addCardCloseBtn.addEventListener('click', closeCardAddPopup);
addCardPopupForm.addEventListener('submit', handleFormSubmitCard);
