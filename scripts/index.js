// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
const cardCreate = card => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  placesList.append(cardElement);
  removeCard(cardElement);
}

// @todo: Функция удаления карточки
const removeCard = card => {
  card.querySelector('.card__delete-button').addEventListener('click', event => {
   event.target.parentNode.remove();
  })
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  cardCreate(card);
});
