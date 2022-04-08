import '../pages/index.css';
import {formValidationConfig} from '../scripts/utils/initials.js';
import {
  profileNameSelector, profileJobSelector, profileAvatar, editAvatarBtn, editBtn, addBtn,
  editAvatarPopupSelector, editAvatarForm, avatarLinkInput,
  cardsWrapperSelector, cardDefaultTemplateSelector, cardUserTemplateSelector,
  editProfilePopupSelector, editProfileForm, nameInput, jobInput,
  addCardPopupSelector, addCardForm, cardNameInput, cardLinkInput,
  fullviewImagePopupSelector,
  confirmPopupSelector
  } from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api';
import { UserCard } from '../scripts/components/UserCard';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation';

const editAvatarFormValidation = new FormValidator(formValidationConfig, editAvatarForm);
editAvatarFormValidation.enableValidation();
const editProfileFormValidation = new FormValidator(formValidationConfig, editProfileForm);
editProfileFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(formValidationConfig, addCardForm);
addCardFormValidation.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-38/', {
    'authorization': '3990e882-52f0-4b8e-b7e3-88a66c4f0ea7',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
});

let myID, cardsList;

const user = new UserInfo({ profileNameSelector, profileJobSelector, profileAvatar});

api.getUser().then(obj => {
  user.setUserInfo(obj);
  myID = obj._id;
});

const editProfilePopup = new PopupWithForm(editProfilePopupSelector,
  {
    handleFormSubmit: (formData) => {
      api.editUser(formData).then(obj => user.setUserInfo(obj));
      editProfilePopup.close();
    }
  }
);

editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, 
  {
    handleFormSubmit: (formData) => {
      api.editUserAvatar(formData).then(obj => user.setUserInfo(obj));
      editAvatarPopup.close();
    }
  }
);

editAvatarPopup.setEventListeners();

api.getCards().then(arr => {
  cardsList = new Section({ items: arr, renderer: (arr) => renderCard(arr, true, cardsList)}, cardsWrapperSelector);
  cardsList.renderItems();
});

const renderCard = (data, isAppend, list) => {
  const cardElement = createCardElement(data);
  list.addItem(cardElement, isAppend);
};

const addCardPopup = new PopupWithForm(addCardPopupSelector,
  {
    handleFormSubmit: (formData) => {
      const data = {
        name: formData['image-name'],
        link: formData['image-link']
      };
      api.addCard(data).then(obj => renderCard(obj, false, cardsList));
      addCardPopup.close();
    }
  }
);

addCardPopup.setEventListeners();

const fullviewImagePopup = new PopupWithImage(fullviewImagePopupSelector);

fullviewImagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation(confirmPopupSelector,
  {
    handleConfirm: (id, cardItem) => {
      api.deleteCard(id).then(() => {
        confirmDeletePopup.close();
        cardItem.remove();
      });
    }
  }
);

confirmDeletePopup.setEventListeners();

function createCardElement(data) {
  const cardOwner = data.owner._id;
  const card = (cardOwner !== myID)
    ? new Card(myID, api, data, cardDefaultTemplateSelector, { handleCardClick: (cardData) => fullviewImagePopup.open(cardData) })
    : new UserCard(myID, api, data, cardUserTemplateSelector, { handleCardClick: (cardData) => fullviewImagePopup.open(cardData) },
    {
      handleDeleteCardClick: (id, cardItem) => confirmDeletePopup.open(id, cardItem)
    });
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
  jobInput.value = userData.about;
  editProfileFormValidation.resetValidation();
  editProfilePopup.open();
};

function openEditAvatarPopup() {
  avatarLinkInput.value = '';
  editAvatarFormValidation.resetValidation();
  editAvatarPopup.open();
}

editBtn.addEventListener('click', openEditProfilePopup);

addBtn.addEventListener('click', openAddImagePopup);

editAvatarBtn.addEventListener('click', openEditAvatarPopup);