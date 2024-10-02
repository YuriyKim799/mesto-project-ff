
import {imagePopupEl, imageEl,imageDesc,placesList,cardTemplate} from '../index.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
//Функция создания карточки
 const createCard = (card, removeCard, likeCard, showImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImgEl.addEventListener('click', showImage);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

//Функция показа изображения карточки
const showImage = (event) => {
  imagePopupEl.classList.toggle('popup_is-opened');
  imageEl.src = event.target.src;
  imageDesc.textContent = event.target.alt;
}

// Функция лайка карточки 
 const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
}

//Функция удаления карточки
 const removeCard = (event) => {
  initialCards.forEach((el,idx)=> {
  if (event.target.parentNode.querySelector('.card__image').alt === el.name) {
   initialCards.splice(idx,1);
  }
 })
   event.target.parentNode.remove();
 }

//Выводим карточки на страницу
export function renderCards(initialArr) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage));
  });
}