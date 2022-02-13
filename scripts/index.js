const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const cardsWrapper = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template');

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

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', (event) => closeEscPopup(popup, event));
};

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', (event) => closeEscPopup(popup, event));
};

function closeEscPopup(popup, event) {
  if (event.code == 'Escape') {
    closePopup(popup);
  };
};

function openEditProfilePopup() {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  enableValidation(formValidationConfig);
};

function closeEditProfilePopup() {
  closePopup(profilePopupCloseBtn);
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
  enableValidation(formValidationConfig);
};

function getCardElement(item) {
  const card = cardTemplate.content.cloneNode(true);
  const cardName = card.querySelector('.card__name');
  const cardImage = card.querySelector('.card__image');
  const likeBtn = card.querySelector('.card__like-btn');
  const delBtn = card.querySelector('.card__delete-btn');

  cardName.textContent = item.name !== '' ? item.name : 'Нет названия';
  cardImage.src = item.link;
  cardImage.alt = item.name !== '' ? item.name : 'Нет изображения';
  cardImage.addEventListener('click', handleFullviewImage);
  likeBtn.addEventListener('click', likeCard);
  delBtn.addEventListener('click', deleteCard);

  return card;
};

function renderCard(item, wrap, isAppend) {
  const card = getCardElement(item);
  if (isAppend) {
    wrap.append(card);
  } else {
    wrap.prepend(card);
  }
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  renderCard(card, cardsWrapper, false);
};

function likeCard(event) {
  event.target.classList.toggle('card__like-btn_active');
};

function deleteCard(event) {
  event.target.closest('.card').remove();
};

function handleFullviewImage(event) {
  const image = event.target;
  const imageUrl = image.src;
  const card = image.closest('.card');
  const imageName = card.querySelector('.card__name').textContent;
  fullviewImage.src = imageUrl;
  fullviewImage.alt = imageName;
  fullviewImageName.textContent = imageName;
  openPopup(fullviewImagePopup);
};

editBtn.addEventListener('click', openEditProfilePopup);
editProfilePopup.addEventListener('submit', handleProfileFormSubmit);

addBtn.addEventListener('click', openAddImagePopup);
addCardPopup.addEventListener('submit', handleCardFormSubmit);

popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__save-btn')) {
      closePopup(popup);
    };
    if (event.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    };
    if (event.target === popup) {
      closePopup(popup);
    };
  });
});

initialCards.forEach(item => {
  renderCard(item, cardsWrapper, true);
});