import { Popup } from '../components/Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._link = data._link;
    this._name = data._name;
  }
  
  open() {
    super.open();
    this._fullviewImage = this._popup.querySelector('.popup__image');
    this._fullviewImageName = this._popup.querySelector('.popup__image-name');
    this._fullviewImage.src = this._link; 
    this._fullviewImage.alt = this._name;
    this._fullviewImageName.textContent = this._name;
  }
}