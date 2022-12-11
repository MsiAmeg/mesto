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
const closeBtns = document.querySelectorAll('.popup__close-button');

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfilePopupForm = document.querySelector('.popup__container_edit-form');
const editProfileNameInput = editProfilePopup.querySelector('.popup__input_data_name');
const editProfileJobInput = editProfilePopup.querySelector('.popup__input_data_job');

const addCardPopup = document.querySelector('.popup_add-card');
const addCardPopupForm = document.querySelector('.popup__container_add-card');
const AddCardNameInput = addCardPopup.querySelector('.popup__input_data_card-title');
const AddCarImageInput = addCardPopup.querySelector('.popup__input_data_image');

const imagePopup = document.querySelector('.popup_large-image');
const popup_image = imagePopup.querySelector('.popup__image');
const popup_caption = imagePopup.querySelector('.popup__caption');

function handleFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileJobInput.value;
  closePopup(editProfilePopup);
}

function handleFormSubmitCard(event) {
  event.preventDefault();

  const imageName = AddCardNameInput.value;
  const imageUrl = AddCarImageInput.value;

  prependCard(imageName, imageUrl);
  AddCardNameInput.value = "";
  AddCarImageInput.value = "";
}

function createCard(name, url) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeBtn = card.querySelector('.card__like');
  const trashBtn = card.querySelector('.card__trash');
  const cardImage = card.querySelector('.card__image');

  cardImage.alt = name;
  cardImage.src = url;
  cardImage.addEventListener('click', () => openImagePopup(name, url));
  likeBtn.addEventListener('click', () => likeBtn.classList.toggle('card__like_active'));
  trashBtn.addEventListener('click', () => trashBtn.closest('.card').remove());
  card.querySelector('.card__title').textContent = name;

  return card;
}

function prependCard(name, url) {
  CardsContainer.prepend(createCard(name, url));
}

initialCards.forEach(element => prependCard(element.name, element.link));


closeBtns.forEach(item => item.addEventListener('click', () => closePopup(item)));

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
}

function openPopup() {
  const profileName = profileTitle.textContent;
  const profilejob = profileDescription.textContent;

  editProfileNameInput.value = profileName;
  editProfileJobInput.value = profilejob;
  editProfilePopup.classList.add('popup_opened');
}

function openCardAddPopup() {
  addCardPopup.classList.add('popup_opened');
}

function setImageToPopup(name, url) {
  popup_image.src = url;
  popup_image.alt = name;
  popup_caption.textContent = name;
}

function openImagePopup(name, url) {
  setImageToPopup(name, url);
  imagePopup.classList.add('popup_opened')
}

function closeCardAddPopup() {
  addCardPopup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
editProfilePopupForm.addEventListener('submit', handleFormSubmit);

addCardBtn.addEventListener('click', openCardAddPopup);
addCardPopupForm.addEventListener('submit', handleFormSubmitCard);
