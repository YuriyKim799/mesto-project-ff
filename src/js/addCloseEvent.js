//Функция добавления события закрыть на крестик и на esc на попапе 

import { pageEl } from '../index.js';
import { closePopup } from './closePopup.js';
import { closePopupByEsc } from './closePopupByEsc.js';


export function addCloseEvent(obj) {
  obj.addEventListener('click', closePopup);
  pageEl.addEventListener('keydown', closePopupByEsc);
}

