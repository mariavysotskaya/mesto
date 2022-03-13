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
    return document.querySelector(this._templateSelector).content.children[0].cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.cardImage).addEventListener('click', this._handleFullviewImage);
    this._element.querySelector(Card.selectors.likeBtn).addEventListener('click', this._likeCard);
    this._element.querySelector(Card.selectors.delBtn).addEventListener('click', this._deleteCard);
  }

  _likeCard(event) {
    event.target.classList.toggle('card__like-btn_active');
  };
  
  _deleteCard(event) {
    event.target.closest('.card').remove();
  };

  _handleFullviewImage(event) {
    const image = event.target;
    const imageUrl = image.src;
    const card = image.closest('.card');
    const imageName = card.querySelector(Card.selectors.cardName).textContent;
    fullviewImage.src = imageUrl;
    fullviewImage.alt = imageName;
    fullviewImageName.textContent = imageName;
    openPopup(fullviewImagePopup);
  };

  _fillCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(Card.selectors.cardName).textContent = this._name !== '' ? this._name : 'Нет названия';
    this._element.querySelector(Card.selectors.cardImage).src = this._link;
    this._element.querySelector(Card.selectors.cardImage).alt = this._name !== '' ? this._name : 'Нет изображения';
    
    return this._element;
  }

  getCardElement() {
    this._element = this._fillCard();
    return this._element;
  };
};