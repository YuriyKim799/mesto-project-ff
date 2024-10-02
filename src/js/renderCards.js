//Выводим карточки на страницу
import { removeCard } from './removeCard.js';
import { likeCard } from './likeCard.js';
import { placesList } from '../index.js';
import { createCard } from './createCard.js';
import { showImage } from './showImageCard.js';

export function renderCards(initialArr) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage));
  });
}

