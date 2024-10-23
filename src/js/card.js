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
    likeCard(e, card, card.owner);
  });

  cardImgEl.addEventListener('click', showImage);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

// Функция лайка карточки 
export const likeCard = (event, card, cardOwner) => {
  event.target.classList.toggle('card__like-button_is-active');

  // console.log(card);

  fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/`, {
    // method: 'PATCH',
    headers: {
      authorization: '56a37d53-5082-4948-be21-caf728509b19',
      "Content-type": "application/json; charset=utf-8"
    },
    // body: JSON.stringify({
    //   likes:[card.owner]
    // })
  }).then( res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(res => pushLike(res,card,cardOwner)).catch(err => {
    console.log(`Ошибка такая ${err}`)
  });
}

function pushLike(arrCards,mainCard,cardOwner) {
  console.log(mainCard);
  console.log(Array.from(arrCards).forEach(card => {
    if(card._id === mainCard._id) {
      card.likes.push(cardOwner);
      console.log(card);
    }
  }));
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
  }).then( res => {
       if(res.ok) {
         return res.json();
       } else {
         return Promise.reject(res.status);
       }
     })
     .then(res => console.log(res)).catch(err => {
       console.log(`Ошибка такая ${err}`)
     });
 }



 // в лайк карточки в массив должен прилетать я а именно результат запроса getUser 