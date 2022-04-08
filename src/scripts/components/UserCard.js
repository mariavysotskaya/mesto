import { Card } from '../components/Card.js';
export class UserCard extends Card {
 constructor(currentUserID, api, item, templateSelector, { handleCardClick }, { handleDeleteCardClick }) {
   super(currentUserID, api, item, templateSelector, { handleCardClick });
   this._handleDeleteCardClick = handleDeleteCardClick;
 }

 _setEventListeners() {
   super._setEventListeners();
   const delBtn = this._element.querySelector('.card__delete-btn');
   delBtn.addEventListener('click', () => this._handleDeleteCardClick(this._cardID, this._element));
 }
}