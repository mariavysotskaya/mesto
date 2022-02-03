const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const cardsWrapper = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template');

const popups = document.querySelectorAll('.popup');
const saveBtns = document.querySelectorAll('.popup__save-btn');
const closeBtns = document.querySelectorAll('.popup__close-btn');

const editProfilePopup = document.querySelector('.popup_type_profile');
let nameInput = editProfilePopup.querySelector('.popup__input-fld_type_name');
let jobInput = editProfilePopup.querySelector('.popup__input-fld_type_job');
const profileSaveBtn = editProfilePopup.querySelector('.popup__save-btn');
const profilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');

const addCardPopup = document.querySelector('.popup_type_card-adding');
let cardNameInput = addCardPopup.querySelector('[name="image-name"]');
let cardLinkInput = addCardPopup.querySelector('[name="image-link"]');
const cardSaveBtn = addCardPopup.querySelector('.popup__save-btn');
const cardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const fullviewImagePopup = document.querySelector('.popup_type_fullview-image');

function openPopup (popup) {
  popup.classList.add('popup_open');
};

function closePopup(popup){
  popup.classList.remove('popup_open');
};

function openEditProfilePopup(){
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function closeEditProfilePopup(){
  closePopup(profilePopupCloseBtn);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
};

function openAddImagePopup() {
  openPopup(addCardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
};

function getCardElement(item){
  const card = cardTemplate.content.cloneNode(true);
  let cardName = card.querySelector('.card__name');
  cardName.textContent = item.name !== '' ? item.name : 'Нет названия';

  let cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name !== '' ? item.name : 'Нет изображения';
  cardImage.addEventListener('click', handleFullviewImage);

  let likeBtn = card.querySelector('.card__like-btn');
  likeBtn.addEventListener('click', likeCard);

  let delBtn = card.querySelector('.card__delete-btn');
  delBtn.addEventListener('click', deleteCard);

  return card;
};

function renderCard(item, wrap, isAppend) {
  let card = getCardElement(item);
  if (isAppend) {
    wrap.append(card);
  } else {
    wrap.prepend(card);
  }
};

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  renderCard(card, cardsWrapper, false);
};

function likeCard(event){
  event.target.classList.toggle('card__like-btn_active');
};

function deleteCard(event){
  event.target.closest('.card').remove();
};

function handleFullviewImage(event){
  let image = event.target
  let imageUrl = image.src;
  let card = image.closest('.card');
  let imageName = card.querySelector('.card__name').textContent;
  fullviewImagePopup.querySelector('.popup__image').src = imageUrl;
  fullviewImagePopup.querySelector('.popup__image-name').textContent = imageName;
  openPopup(fullviewImagePopup);
};

editBtn.addEventListener('click', openEditProfilePopup);
editProfilePopup.addEventListener('submit', handleProfileFormSubmit);

addBtn.addEventListener('click', openAddImagePopup);
addCardPopup.addEventListener('submit', handleCardFormSubmit);

saveBtns.forEach( item => {
  let popup = item.closest('.popup');
  item.addEventListener('click', function(event){
    closePopup(popup);
  });
});

closeBtns.forEach ( item => {
  let popup = item.closest('.popup');
  item.addEventListener('click', function(event){
    closePopup(popup);
  });
});

document.addEventListener('click', function(event){
  popups.forEach( item => {
    if (event.target === item) {
      closePopup(item);
    };
  });
});

document.addEventListener('keydown', function(event){
  popups.forEach( item => {
    if (event.code == 'Escape') {
      closePopup(item);
    };
  });
});

initialCards.forEach(item => {
  renderCard(item, cardsWrapper, true);
});