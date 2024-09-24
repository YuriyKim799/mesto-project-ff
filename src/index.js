import './cards.js';
import './index.css';

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
