import { popupAddCardEl,popupProfileEditEl,pageEl } from '../index.js';

export function openModal(event){
  // функция показа поп апа создания новой карточки 
  if(event.target.classList.contains('profile__add-button')) {
    popupAddCardEl.classList.toggle('popup_is-opened');
  } else if (event.target.classList.contains('profile__edit-button')) {
    // функция показа поп апа редактирования профиля
     popupProfileEditEl.classList.toggle('popup_is-opened');
  }
  pageEl.addEventListener('keydown', closeModalByEsc);
}
// Функция закрытия попапа при клике на крестик или в любое другое место
export function closeModal(event) {
  if(event.target.classList.contains('popup__close') 
    || event.target.classList.contains('popup') 
  || event.target.classList.contains('popup__button')) {
   event.target.closest('.popup').classList.toggle('popup_is-opened');
  } 
}

export function closeModalByEsc(event) {
  const closeElEsc = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') {
    closeElEsc?.classList.toggle('popup_is-opened');
    pageEl.removeEventListener('keydown', closeModalByEsc);
  }
 
}