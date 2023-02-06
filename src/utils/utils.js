import { Card } from "../components/Card.js";
import {imageDefaultPopup} from '../pages/index.js';
import {inputEditProfileName, inputEditProfileJob} from './constants.js';

function createCard(name, link) {
  const card = new Card(name, link, "#card", handleCardClick);
  const cardEl = card.generateCard();
  return cardEl;
}

function handleCardClick(name, link) {
  imageDefaultPopup.open(name, link);
}

function insertProfileInfo({data}) {
  inputEditProfileName.value = data['name-input'];
  inputEditProfileJob.value = data['job-input'];
}

export {
  createCard,
  insertProfileInfo
};
