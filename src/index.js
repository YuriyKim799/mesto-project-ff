import './index.css';
import { renderCards,initialCards } from './js/cards.js';
import { closeModal, openModal } from './js/modal.js';
//Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
//DOM узлы
export const pageEl = document.querySelector('.page');
export const imagePopupEl = document.querySelector('.popup_type_image');
export const imageEl = imagePopupEl.querySelector('.popup__image');
export const imageDesc = imagePopupEl.querySelector('.popup__caption');
export const popupProfileEditEl = document.querySelector('.popup_type_edit');
export const popupAddCardEl = document.querySelector('.popup_type_new-card');
// Находим форму изменения профиля в DOM
const formElement = document.querySelector('.edit-profile');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileNameEl = document.querySelector('.profile__title');
const profileJobEl = document.querySelector('.profile__description');
//При открытии редактирования профиля в полях формы стоит имеющееся значение 
nameInput.value = profileNameEl.textContent;
jobInput.value = profileJobEl.textContent;
// Находим форму добавления карточки в DOM
const cardsFormElement = document.querySelector('.new-place');
// Находим поля формы в DOM
const cardNameEl = cardsFormElement.querySelector('.popup__input_type_card-name');
const cardImgUrlEl = cardsFormElement.querySelector('.popup__input_type_url');

renderCards(initialCards)

pageEl.addEventListener('click', openModal)
pageEl.addEventListener('click', closeModal);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); //Отменяем стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // Получаем значение полей jobInput и nameInput из свойства value
    // Выбираем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileNameEl.textContent = nameInput.value;
    profileJobEl.textContent = jobInput.value;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

function addNewCard(event) {
  event.preventDefault();//Отменяем стандартную отправку формы.
//Чтобы не дублировались карточки при добавлении, каждый раз удаляем их перед новым рендерингом
  placesList.querySelectorAll('.card').forEach( el=>{
      el.remove();
  });
//Вставляем новый созданный объект в начало массива карточек
  initialCards.unshift({
    name: cardNameEl.value,
    link: cardImgUrlEl.value,
  })
//Очищаем поля инпутов
  cardNameEl.value = '';
  cardImgUrlEl.value = '';
//Отображаем новый массив с добавленной карточкой в HTML
  renderCards(initialCards)
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardsFormElement.addEventListener('submit', addNewCard);

