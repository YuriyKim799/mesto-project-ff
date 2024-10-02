//Функция удаления карточки
import { initialCards } from './cards.js';

export const removeCard = (event) => {
  initialCards.forEach((el,idx)=> {
  if (event.target.parentNode.querySelector('.card__image').alt === el.name) {
   initialCards.splice(idx,1);
  }
 })
   event.target.parentNode.remove();
 }