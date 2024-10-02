//Функция показа изображения карточки
import {imagePopupEl, imageEl,imageDesc} from '../index.js';
import { addCloseEvent } from './addCloseEvent.js';

export const showImage = (event) => {
  imagePopupEl.classList.toggle('popup_is-opened');
  imageEl.src = event.target.src;
  imageDesc.textContent = event.target.alt;
  addCloseEvent(imagePopupEl);
}