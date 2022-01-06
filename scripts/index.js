let likeBtn = document.querySelectorAll('.element__like-btn');

for (let i=0; i<likeBtn.length; i++){
    if (likeBtn[i].addEventListener('click', function(){
        likeBtn[i].classList.toggle('element__like-btn_active');
    }));
};

const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const saveBtn = formElement.querySelector('.popup__save-btn');
const closeBtn = document.querySelector('.popup__close-btn');

let nameInput = formElement.querySelector('.popup__input-fld_type_name');
let jobInput = formElement.querySelector('.popup__input-fld_type_job');

function openPopup(){
    popup.classList.add('popup_open');
    document.body.style.overflow = 'hidden';
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__job').textContent;
}

function closePopup(){
    popup.classList.remove('popup_open');
    document.body.style.overflow = '';
}

if (editBtn.addEventListener('click', function(){
    openPopup();
}));

if (closeBtn.addEventListener('click',function(){
    closePopup();
}));

if (saveBtn.addEventListener('click', function(){
    closePopup();
}));

if (popup.addEventListener('click',function(event){
    if (event.target === popup) {
    closePopup();
  }
}));

if (document.addEventListener('keydown', function(event){
    if (event.code == 'Escape') {
        closePopup();
    }
}));

function formSubmitHandler (evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__job').textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);