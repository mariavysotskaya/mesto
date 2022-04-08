import { Popup } from '../components/Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleConfirm }) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm(this._targetCardID, this._element);
    });
  }

  open(targetCardID, cardElement) {
    super.open();
    this._targetCardID = targetCardID;
    this._element = cardElement;
  }
}