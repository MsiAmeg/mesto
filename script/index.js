let profileInfo = document.querySelector('.profile__info');
let profileTitle = profileInfo.querySelector('.profile__title');
let profileDescription = profileInfo.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__input_data_name');
let jobInput = popup.querySelector('.popup__input_data_job');

function handleFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  let profileName = profileTitle.textContent;
  let profilejob = profileDescription.textContent;

  nameInput.value = profileName;
  jobInput.value = profilejob;
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
