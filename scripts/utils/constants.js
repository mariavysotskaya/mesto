const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const cardsWrapper = document.querySelector('.cards');
const cardTemplateSelector = '#card-template';

const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_profile');
const nameInput = editProfilePopup.querySelector('.popup__input-fld_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input-fld_type_job');

const addCardPopup = document.querySelector('.popup_type_card-adding');
const cardNameInput = addCardPopup.querySelector('[name="image-name"]');
const cardLinkInput = addCardPopup.querySelector('[name="image-link"]');

const fullviewImagePopup = document.querySelector('.popup_type_fullview-image');
const fullviewImage = fullviewImagePopup.querySelector('.popup__image');
const fullviewImageName = fullviewImagePopup.querySelector('.popup__image-name');

export {
  profileName, profileJob, editBtn, addBtn,
  cardsWrapper, cardTemplateSelector,
  popups,
  editProfilePopup, nameInput, jobInput,
  addCardPopup, cardNameInput, cardLinkInput,
  fullviewImagePopup, fullviewImage, fullviewImageName
};