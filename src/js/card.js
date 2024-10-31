import {cardTemplate} from '../index.js';
import { getLikes, removeLikes, removeCardApi} from './api.js'

//Функция создания карточки
export const createCard = (card, removeCard, likeCard, showImage, accOwner) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardCountEl = cardElement.querySelector('.card__like-count');
  const btnLikeEl = cardElement.querySelector('.card__like-button');
  cardCountEl.textContent = card.likes.length;

  card.likes.forEach(like => {
  if(like._id === accOwner._id) {
      btnLikeEl.classList.add('card__like-button_is-active');
    }
  })

  if(card.owner._id === accOwner._id) {
    const btnRemoveEl =  document.createElement('BUTTON');
    btnRemoveEl.classList.add('card__delete-button');
    cardImgEl.insertAdjacentElement('afterend', btnRemoveEl);
    btnRemoveEl.addEventListener('click', ()=> {
      removeCard(cardElement, card);
    });
  }  

  cardElement.querySelector('.card__like-button')
  .addEventListener('click', (event) => {
    likeCard(event, card, cardCountEl);
  });
  cardImgEl.addEventListener('click', showImage);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  return cardElement;
}

// Функция лайка карточки 
export const likeCard = (event, targetCard, cardCountEl) => {
  if(!event.target.classList.contains('card__like-button_is-active')) {
    event.target.classList.add('card__like-button_is-active');
  getLikes(targetCard)
  .then(res => updateCardLikes(res, cardCountEl)).catch(err => {
    console.log(`Ошибка такая ${err}`)
  });
  } else {
    event.target.classList.remove('card__like-button_is-active');
    removeLikes(targetCard)
    .then(res => updateCardLikes(res, cardCountEl)).catch(err => {
      console.log(`Ошибка ${err}`)
    });
  }
}

function updateCardLikes(card, cardCountEl) {
  cardCountEl.textContent = card.likes.length;
}

//Функция удаления карточки
export const removeCard = (cardElement, card) => {
  cardElement.remove();
  removeCardApi(card)
  .then(res => console.log(res)).catch(err => {
  console.log(`Ошибка ${err}`)
  });
 }