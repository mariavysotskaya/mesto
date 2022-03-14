import {
  profileName, profileJob, editBtn, addBtn,
  cardsWrapper, cardTemplateSelector,
  editProfilePopup, nameInput, jobInput,
  addCardPopup, cardNameInput, cardLinkInput,
  } from '../utils/constants.js';
import { openPopup, closePopup } from '../utils/popup.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

function openEditProfilePopup() {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const form = editProfilePopup.querySelector(formValidationConfig.formSelector);
  const formElement = new FormValidator(formValidationConfig, form);
  formElement.resetValidation();
  formElement.enableValidation();
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

function openAddImagePopup() {
  openPopup(addCardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  const form = addCardPopup.querySelector(formValidationConfig.formSelector);
  const formElement = new FormValidator(formValidationConfig, form);
  formElement.resetValidation();
  formElement.enableValidation();
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  renderCard(card, cardsWrapper, false);
  closePopup(addCardPopup);
};

function renderCard(item, wrap, isAppend) {
  const card = new Card(item, cardTemplateSelector);
  if (isAppend) {
    wrap.append(card.getCardElement());
  } else {
    wrap.prepend(card.getCardElement());
  }
};
  
editBtn.addEventListener('click', openEditProfilePopup);
editProfilePopup.addEventListener('submit', handleProfileFormSubmit);
 
addBtn.addEventListener('click', openAddImagePopup);
addCardPopup.addEventListener('submit', handleCardFormSubmit);
  
initialCards.forEach(item => {
  renderCard(item, cardsWrapper, true);
});