import './index.css';
import { enableValidation } from './js/validation.js';
import { createCard, likeCard, removeCard } from './js/card.js';
import { initialCards } from './js/cards.js';
import { closeModal, openModal } from './js/modal.js';
//Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
//DOM узлы
export const pageEl = document.querySelector('.page');
export const imagePopupEl = document.querySelector('.popup_type_image');
export const imageEl = imagePopupEl.querySelector('.popup__image');
export const imageDesc = imagePopupEl.querySelector('.popup__caption');
const popupProfileEditEl = document.querySelector('.popup_type_edit');
const popupAddCardEl = document.querySelector('.popup_type_new-card');
const profileEditBtnEl = document.querySelector('.profile__edit-button');
const addCardBtnEl = document.querySelector('.profile__add-button');
// Находим форму изменения профиля в DOM
export const formElement = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileNameEl = document.querySelector('.profile__title');
const profileJobEl = document.querySelector('.profile__description');
//При открытии редактирования профиля в полях формы стоит имеющееся значение 
nameInput.value = profileNameEl.textContent;
jobInput.value = profileJobEl.textContent;
// Находим форму добавления карточки в DOM
const cardsFormElement = document.forms['new-place'];
// Находим поля формы в DOM
const cardNameEl = cardsFormElement.querySelector('.popup__input_type_card-name');
const cardImgUrlEl = cardsFormElement.querySelector('.popup__input_type_url');
//Находим данные попапа для закрытия
const popupEls = document.querySelectorAll('.popup');
const popupCloseEls = document.querySelectorAll('.popup__close');


profileEditBtnEl.addEventListener('click', ()=> {
  openModal(popupProfileEditEl);
});

addCardBtnEl.addEventListener('click', () => {
  openModal(popupAddCardEl)}
);

popupCloseEls.forEach(element => {
  element.addEventListener('click', (event)=> {
    closeModal(event.target.closest('.popup'));
  });
});

popupEls.forEach(modal => {
  modal.addEventListener('click', event => {
    if(!event.target.classList.contains('popup')) {
      return;
    };
    closeModal(modal);
  });
});

  //Функция показа изображения карточки
 const showImage = (event) => {
  openModal(imagePopupEl);
  imageEl.src = event.target.src;
  imageEl.alt = event.target.alt;
  imageDesc.textContent = event.target.alt;
}

//Выводим карточки на страницу
function renderCards(initialArr, showImage) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage));
  });
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editProfileForm(evt) {
    evt.preventDefault(); //Отменяем стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // Получаем значение полей jobInput и nameInput из свойства value
    // Выбираем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileNameEl.textContent = nameInput.value;
    profileJobEl.textContent = jobInput.value;
    closeModal(popupProfileEditEl);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', editProfileForm); 

function addNewCard(event) {
  event.preventDefault();//Отменяем стандартную отправку формы.
  placesList.prepend(createCard({name: cardNameEl.value,
    link: cardImgUrlEl.value,
  }, removeCard, likeCard, showImage));
//Очищаем поля инпутов
  cardNameEl.value = '';
  cardImgUrlEl.value = '';
  closeModal(popupAddCardEl);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardsFormElement.addEventListener('submit', addNewCard);

renderCards(initialCards,showImage);



// Вызовем функцию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 