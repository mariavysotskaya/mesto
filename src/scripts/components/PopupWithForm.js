import { Popup } from '../components/Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input-fld'));
    this._saveBtn = this._popup.querySelector('.popup__save-btn');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._saveBtn.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues(), this._saveBtn);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}