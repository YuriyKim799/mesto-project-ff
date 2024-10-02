// Функция лайка карточки 
export const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
}