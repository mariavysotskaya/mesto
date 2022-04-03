import '../pages/index.css';
import {initialCards, formValidationConfig} from '../scripts/utils/initials.js';
import {
  profileNameSelector, profileJobSelector, editBtn, addBtn,
  cardsWrapperSelector, cardTemplateSelector,
  editProfilePopupSelector, editProfileForm, nameInput, jobInput,
  addCardPopupSelector, addCardForm, cardNameInput, cardLinkInput,
  fullviewImagePopupSelector,
  } from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

const editProfileFormValidation = new FormValidator(formValidationConfig, editProfileForm);
editProfileFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(formValidationConfig, addCardForm);
addCardFormValidation.enableValidation();

const user = new UserInfo({ profileNameSelector, profileJobSelector});

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, {
  handleFormSubmit: (formData) => {
    user.setUserInfo(formData);
    editProfilePopup.close();
  }
});

editProfilePopup.setEventListeners();

const renderCard = (data, isAppend) => {
  const cardElement = createCardElement(data);
  cardsList.addItem(cardElement, isAppend);
};

const cardsList = new Section({ items: initialCards, renderer: (initialCards) => renderCard(initialCards, true)}, cardsWrapperSelector);

const addCardPopup = new PopupWithForm(addCardPopupSelector, {
  handleFormSubmit: (formData) => {
    const data = {
      name: formData['image-name'],
      link: formData['image-link'],
    }
    renderCard(data, false);
    addCardPopup.close();
  }
});

addCardPopup.setEventListeners();

const fullviewImagePopup = new PopupWithImage(fullviewImagePopupSelector);
fullviewImagePopup.setEventListeners();

function createCardElement(data) {
  const card = new Card(data, cardTemplateSelector, { handleCardClick: (cardData) => fullviewImagePopup.open(cardData) });
  const cardElement = card.getCardElement();
  return cardElement;
};

function openAddImagePopup() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  addCardFormValidation.resetValidation();
  addCardPopup.open();
};

function openEditProfilePopup() {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editProfileFormValidation.resetValidation();
  editProfilePopup.open();
};

editBtn.addEventListener('click', openEditProfilePopup);

addBtn.addEventListener('click', openAddImagePopup);

cardsList.renderItems();