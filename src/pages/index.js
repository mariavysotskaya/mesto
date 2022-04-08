import '../pages/index.css';
import {formValidationConfig} from '../scripts/utils/initials.js';
import {
  profileNameSelector, profileJobSelector, profileAvatar, editAvatarBtn, editBtn, addBtn,
  editAvatarPopupSelector, editAvatarForm, avatarLinkInput,
  cardsWrapperSelector, cardTemplateSelector,
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

Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    user.setUserInfo(userData);
    myID = userData._id;
    cardsList = new Section({ items: cardsData, renderer: (cardsData) => renderCard(cardsData, true, cardsList)}, cardsWrapperSelector);
    cardsList.renderItems();
  })
  .catch((err) => alert('Не удалось получить данные'));

const renderCard = (data, isAppend, list) => {
  const cardElement = createCardElement(data);
  list.addItem(cardElement, isAppend);
};

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, 
  {
    handleFormSubmit: (formData, saveBtn) => {
      api.editUserAvatar(formData)
      .then(obj => {
        setTimeout( () => {
          editAvatarPopup.close();
          user.setUserInfo(obj);
        }, 1000);
      })
      .catch(err => console.log('Не удалось сохранить изменения'))
      .finally(() => setTimeout( () => saveBtn.textContent = 'Сохранить', 1000));
    }
  }
);

editAvatarPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(editProfilePopupSelector,
  {
    handleFormSubmit: (formData, saveBtn) => {
      api.editUser(formData)
      .then(obj => {
        setTimeout( () => {
          editProfilePopup.close();
          user.setUserInfo(obj)
        }, 1000);
      })
      .catch(err => console.log('Не удалось сохранить изменения'))
      .finally(() => setTimeout( () => saveBtn.textContent = 'Сохранить', 1000));
    }
  }
);

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addCardPopupSelector,
  {
    handleFormSubmit: (formData, saveBtn) => {
      const data = {
        name: formData['image-name'],
        link: formData['image-link']
      };
      api.addCard(data)
      .then(obj => {
        setTimeout( () => {
          addCardPopup.close();
          renderCard(obj, false, cardsList);
        }, 1000)
      })
      .catch(err => console.log('Не удалось сохранить изменения'))
      .finally(() => setTimeout( () => saveBtn.textContent = 'Создать', 1000));
    }
  }
);

addCardPopup.setEventListeners();

const fullviewImagePopup = new PopupWithImage(fullviewImagePopupSelector);

fullviewImagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation(confirmPopupSelector,
  {
    handleConfirm: (id, cardItem) => {
      api.deleteCard(id)
      .then(() => {
        confirmDeletePopup.close();
        cardItem.remove();
      })
      .catch(err => console.log('Удаление не удалось'));
    }
  }
);

confirmDeletePopup.setEventListeners();

function createCardElement(data) {
  const card = new Card(myID, api, data, cardTemplateSelector,
    {
      handleCardClick: (cardData) => fullviewImagePopup.open(cardData)
    },
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

editAvatarBtn.addEventListener('click', openEditAvatarPopup);

editBtn.addEventListener('click', openEditProfilePopup);

addBtn.addEventListener('click', openAddImagePopup);