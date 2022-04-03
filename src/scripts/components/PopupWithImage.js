import { Popup } from '../components/Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullviewImage = this._popup.querySelector('.popup__image');
    this._fullviewImageName = this._popup.querySelector('.popup__image-name');
  }
  
  open(data) {
    super.open();
    this._fullviewImage.src = data._link; 
    this._fullviewImage.alt = data._name;
    this._fullviewImageName.textContent = data._name;
  }
}