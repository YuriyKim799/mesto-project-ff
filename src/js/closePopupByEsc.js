// Функция закрытия попапа при нажатии клавиши esc
import { pageEl } from '../index.js';

export function closePopupByEsc(event) {
  const closeElEsc = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') {
    closeElEsc.classList.toggle('popup_is-opened')
    pageEl.removeEventListener('keydown', closePopupByEsc);
 }
}
