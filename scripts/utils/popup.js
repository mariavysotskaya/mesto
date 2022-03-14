import { popups } from '../utils/constants.js';

export function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupByEsc);
};
  
export function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupByEsc);
};
  
function closePopupByEsc(event) {
  if (event.code == 'Escape') {
    const popup = document.querySelector('.popup_open');
    closePopup(popup);
  };
};

popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-btn') || event.target === popup) {
      closePopup(popup);
    };
  });
});