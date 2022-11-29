let profileInfo = document.querySelector('.profile__info');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');
let nameInput = popup.querySelectorAll('.popup__input')[0];
let jobInput = popup.querySelectorAll('.popup__input')[1];
let popupButton = popup.querySelector('.popup__button');

function handleFormSubmit (event) {
    event.preventDefault(); 
    
    let nameInput = popup.querySelectorAll('.popup__input')[0].value;
    let jobInput = popup.querySelectorAll('.popup__input')[1].value;
    
    profileInfo.querySelector('.profile__title').textContent = nameInput;
    profileInfo.querySelector('.profile__description').textContent = jobInput;
    closePopup();
}

function closePopup(){
    popup.classList.remove('popup_opened');
}

function openPopup(){
    let profileName = profileInfo.querySelector('.profile__title').textContent;
    let profilejob = profileInfo.querySelector('.profile__description').textContent;

    nameInput.value = profileName;
    jobInput.value = profilejob;
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
popup.addEventListener('click', closePopup);
popupForm.addEventListener('click', function(event){
    event.stopPropagation();
});