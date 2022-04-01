import {
  profileNameSelector, profileJobSelector, editBtn, addBtn,
  cardsWrapperSelector, cardTemplateSelector,
  editProfilePopupSelector, editProfileForm, nameInput, jobInput,
  addCardPopupSelector, addCardForm, cardNameInput, cardLinkInput,
  fullviewImagePopupSelector,
  } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

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

const cardsList = new Section({ items: initialCards, renderer: renderCard}, cardsWrapperSelector);

const addCardPopup = new PopupWithForm(addCardPopupSelector, {
  handleFormSubmit: (formData) => {
    const data = {
      name: formData['image-name'],
      link: formData['image-link'],
    }
    renderCard(data, true);
    addCardPopup.close();
  }
});

addCardPopup.setEventListeners();

function createCardElement(data) {
  const card = new Card(data, cardTemplateSelector,
    {
      handleCardClick: (cardData) => {
        const fullViewPopup = new PopupWithImage(fullviewImagePopupSelector, cardData);
        fullViewPopup.open();
      }
    });
  const cardElement = card.getCardElement();
  return cardElement;
};

function openAddImagePopup() {
  addCardPopup.open();
  cardNameInput.value = '';
  cardLinkInput.value = '';
  addCardFormValidation.resetValidation();
};

function openEditProfilePopup() {
  editProfilePopup.open();
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editProfileFormValidation.resetValidation();
};

editBtn.addEventListener('click', openEditProfilePopup);

addBtn.addEventListener('click', openAddImagePopup);

cardsList.renderItems();