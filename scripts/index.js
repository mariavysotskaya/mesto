let likeBtn = document.querySelectorAll('.card__like-btn');

const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const saveBtn = formElement.querySelector('.popup__save-btn');
const closeBtn = document.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = formElement.querySelector('.popup__input-fld_type_name');
let jobInput = formElement.querySelector('.popup__input-fld_type_job');

function openPopup(){
    popup.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup(){
    popup.classList.remove('popup_open');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

editBtn.addEventListener('click', openPopup);

closeBtn.addEventListener('click', closePopup);

saveBtn.addEventListener('click', closePopup);

popup.addEventListener('click',function(event){
    if (event.target === popup) {
        closePopup();
  }
});

document.addEventListener('keydown', function(event){
    if (event.code == 'Escape') {
        closePopup();
    }
});

formElement.addEventListener('submit', formSubmitHandler);