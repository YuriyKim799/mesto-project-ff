import './js/cards.js';
import './index.css';
<<<<<<< HEAD
import {initialCards} from './js/cards.js'

=======
import { initialCards } from './cards.js';
>>>>>>> 1cdba9137169918b4b7ea081ae31c5f78d15df3c

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = (card, removeCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

// @todo: Функция удаления карточки
const removeCard = (event) => {
  event.target.parentNode.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});









// // функция показа поп апа редактирования 
const popupProfileEditEl = document.querySelector('.popup_type_edit');
// const btnEditProfileEl = document.querySelector('.profile__edit-button');
// btnEditProfileEl.addEventListener('click', () => {
//   popupProfileEditEl.style.display = 'flex';
// })


// // функция показа поп апа создания новой карточки 
const popupAddCardEl = document.querySelector('.popup_type_new-card');
// const btnAddCardEl = document.querySelector('.profile__add-button');

// btnAddCardEl.addEventListener('click', ()=> {
//   popupAddCardEl.style.display = 'flex';
// })


document.querySelector('.profile').addEventListener('click', (event) => {
  if(event.target.classList.contains('profile__add-button')) {
    popupAddCardEl.style.display = 'flex';
  } else if (event.target.classList.contains('profile__edit-button')) {
    popupProfileEditEl.style.display = 'flex';
  } 
  return;
})

document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', (event) => {
    console.dir(event.target.closest('.popup').style.display = 'none')
  })
})