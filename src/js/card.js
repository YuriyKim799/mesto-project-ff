import {cardTemplate} from '../index.js';

//Функция создания карточки
export const createCard = (card, removeCard, likeCard, showImage, btnRemoveEl) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');

  if(card.myOwnId === 'My card') {
  cardImgEl.insertAdjacentElement('afterend', btnRemoveEl);
    btnRemoveEl.addEventListener('click', ()=>{
      removeCard(cardElement);
    });
  }  

  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImgEl.addEventListener('click', showImage);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

// Функция лайка карточки 
export const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
}

//Функция удаления карточки
export const removeCard = (card) => {
   card.remove();
 }