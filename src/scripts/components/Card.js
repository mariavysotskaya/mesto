export class Card {
  static selectors = {
    cardName: '.card__name',
    cardImage: '.card__image',
    likeBtn: '.card__like-btn',
    likeCounter: '.card__like-counter',
    delBtn: '.card__delete-btn',
  };
  
  constructor(currentUserID, api, item, templateSelector, { handleCardClick }, { handleDeleteCardClick }) {
    this._userID = currentUserID;
    this._name = item.name;
    this._link = item.link;
    this._likesArr = item.likes;
    this._likes = this._likesArr.length;
    this._cardID = item._id;
    this._api = api;
    this._owner = item.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
  };

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.cardImage).addEventListener('click', () => this._handleCardClick(this));
    this._element.querySelector(Card.selectors.likeBtn).addEventListener('click', () => this._likeCard());
    this._element.querySelector(Card.selectors.delBtn).addEventListener('click', () => this._handleDeleteCardClick(this._cardID, this._element));
  }

  _hasCardMyLike() {
    return this._likesArr.some((item) => item._id === this._userID);
  }

  _likeCard() {
    const likeBtn = this._element.querySelector(Card.selectors.likeBtn);
    const hasCardMyLike = this._hasCardMyLike();

    if (hasCardMyLike) {
      this._api.deleteLike(this._cardID)
      .then(obj => {
        this._element.querySelector(Card.selectors.likeCounter).textContent = obj.likes.length !== 0 ? obj.likes.length : '';
        likeBtn.classList.remove('card__like-btn_active');
        this._likesArr = obj.likes;
      })
      .catch(err => console.log('Не удалось выполнить действие'));
    } else {
      this._api.putLike(this._cardID)
      .then(obj => {
        likeBtn.classList.add('card__like-btn_active');
        this._element.querySelector(Card.selectors.likeCounter).textContent = obj.likes.length !== 0 ? obj.likes.length : '';
        this._likesArr = obj.likes;
      })
      .catch(err => console.log('Не удалось выполнить действие'));
    };
  };

  _fillCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    if (this._owner !== this._userID) {
      this._element.querySelector(Card.selectors.delBtn).remove();
    }
    
    this._element.querySelector(Card.selectors.cardName).textContent = this._name !== '' ? this._name : 'Нет названия';
    this._element.querySelector(Card.selectors.cardImage).src = this._link;
    this._element.querySelector(Card.selectors.cardImage).alt = this._name !== '' ? this._name : 'Нет изображения';
    this._element.querySelector(Card.selectors.likeCounter).textContent = this._likes !== 0 ? this._likes : '';

    const hasCardMyLike = this._hasCardMyLike();
    
    if (hasCardMyLike) {
      this._element.querySelector(Card.selectors.likeBtn).classList.add('card__like-btn_active');
    };
  };

  getCardElement() {
    this._fillCard();
    return this._element;
  };
};