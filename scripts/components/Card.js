import { fullviewImagePopup, fullviewImage, fullviewImageName } from '../utils/constants.js';
import { openPopup } from '../utils/popup.js';

export class Card {
  static selectors = {
    cardName: '.card__name',
    cardImage: '.card__image',
    likeBtn: '.card__like-btn',
    delBtn: '.card__delete-btn',
  };
  
  constructor(item, templateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.cardImage).addEventListener('click', () => {
      fullviewImage.src = this._link; 
      fullviewImage.alt = this._name;
      fullviewImageName.textContent = this._name;
      openPopup(fullviewImagePopup);
    });
    this._element.querySelector(Card.selectors.likeBtn).addEventListener('click', this._likeCard);
    this._element.querySelector(Card.selectors.delBtn).addEventListener('click', () => this._element.remove());
  }

  _likeCard() {
    this.classList.toggle('card__like-btn_active');
  };

  _fillCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector(Card.selectors.cardName).textContent = this._name !== '' ? this._name : 'Нет названия';
    this._element.querySelector(Card.selectors.cardImage).src = this._link;
    this._element.querySelector(Card.selectors.cardImage).alt = this._name !== '' ? this._name : 'Нет изображения';
  }

  getCardElement() {
    this._fillCard();
    return this._element;
  };
};