// Функция закрытия попапа при клике на крестик
import { pageEl } from '../index.js';
import { closePopupByEsc } from './closePopupByEsc.js';

export function closePopup(event) {
  if(event.target.classList.contains('popup__close') 
    || event.target.classList.contains('popup') 
  || event.target.classList.contains('popup__button')) {
   event.target.closest('.popup').classList.toggle('popup_is-opened');
   pageEl.removeEventListener('keydown', closePopupByEsc);
  } 
}