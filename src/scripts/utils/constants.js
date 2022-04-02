const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const cardsWrapperSelector = '.cards';
const cardTemplateSelector = '#card-template';

const editProfilePopup = document.querySelector('.popup_type_profile');
const editProfilePopupSelector = '.popup_type_profile';
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfilePopup.querySelector('.popup__input-fld_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input-fld_type_job');

const addCardPopup = document.querySelector('.popup_type_card-adding');
const addCardPopupSelector = '.popup_type_card-adding';
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardPopup.querySelector('[name="image-name"]');
const cardLinkInput = addCardPopup.querySelector('[name="image-link"]');

const fullviewImagePopupSelector = '.popup_type_fullview-image';

export {
  profileNameSelector, profileJobSelector, editBtn, addBtn,
  cardsWrapperSelector, cardTemplateSelector,
  editProfilePopupSelector, editProfileForm, nameInput, jobInput,
  addCardPopupSelector, addCardForm, cardNameInput, cardLinkInput,
  fullviewImagePopupSelector,
};