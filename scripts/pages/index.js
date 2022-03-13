import {
  profileName, profileJob, editBtn, addBtn,
  cardsWrapper, cardTemplateSelector,
  editProfilePopup, nameInput, jobInput,
  addCardPopup, cardNameInput, cardLinkInput,
  } from '../utils/constants.js';
import { openPopup } from '../utils/popup.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

function setInitialStateForm(popup, config) {
  const form = popup.querySelector(config.formSelector);
  const formElement = new FormValidator(config, form);
  formElement.enableValidation();
}

function openEditProfilePopup() {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  setInitialStateForm(editProfilePopup, formValidationConfig);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
};

function openAddImagePopup() {
  openPopup(addCardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  setInitialStateForm(addCardPopup, formValidationConfig);
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  renderCard(card, cardsWrapper, false);
};
  
editBtn.addEventListener('click', openEditProfilePopup);
editProfilePopup.addEventListener('submit', handleProfileFormSubmit);
 
addBtn.addEventListener('click', openAddImagePopup);
addCardPopup.addEventListener('submit', handleCardFormSubmit);

function renderCard(item, wrap, isAppend) {
  const card = new Card(item, cardTemplateSelector);
  if (isAppend) {
    wrap.append(card.getCardElement());
  } else {
    wrap.prepend(card.getCardElement());
  }
};
  
initialCards.forEach(item => {
  renderCard(item, cardsWrapper, true);
});