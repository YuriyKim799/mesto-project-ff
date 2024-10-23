import {cardTemplate} from '../index.js';

//Функция создания карточки
export const createCard = (card, removeCard, likeCard, showImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');
 

  if(card.owner._id === '9c5792162f858ad5a9ed5cfb') {
    const btnRemoveEl =  document.createElement('BUTTON');
    btnRemoveEl.classList.add('card__delete-button');
    cardImgEl.insertAdjacentElement('afterend', btnRemoveEl);
    btnRemoveEl.addEventListener('click', ()=> {
      removeCard(cardElement, card);
    });
  }  

  cardElement.querySelector('.card__like-button').addEventListener('click', (e) => {
    likeCard(e, card);
  });

  cardImgEl.addEventListener('click', showImage);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

// Функция лайка карточки 
export const likeCard = (event, card) => {
  event.target.classList.toggle('card__like-button_is-active');

  console.log(card);

  // fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/${card._id}`, {
  //   method: 'DELETE',
  //   headers: {
  //     authorization: '56a37d53-5082-4948-be21-caf728509b19',
  //     "Content-type": "application/json; charset=utf-8"
  //   }
  // }).then( res => res.json()).then(res => console.log(res));

  

}

//Функция удаления карточки
export const removeCard = (cardElement, card) => {
  cardElement.remove();
  fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '56a37d53-5082-4948-be21-caf728509b19',
      "Content-type": "application/json; charset=utf-8"
    }
  });
 }