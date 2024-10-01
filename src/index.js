import './js/cards.js';
import './index.css';
import { initialCards } from './js/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = (card, removeCard, likeCard, showImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgEl =  cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', showImage);
  cardImgEl.src = card.link;
  cardImgEl.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

// @todo: Функция удаления карточки
const removeCard = (event) => {
  event.target.parentNode.remove();
}

// Функция лайка карточки 

const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
}

//Функция показа изображения карточки

const showImage = (event) => {
  const imagePopupEl = document.querySelector('.popup_type_image');
  const imageEl = imagePopupEl.querySelector('.popup__image');
  const imageDesc = imagePopupEl.querySelector('.popup__caption');
  imagePopupEl.style.display = 'flex';
  imageEl.src = event.target.src;
  imageDesc.textContent = event.target.alt;
  addCloseEvent(imagePopupEl);
}

// @todo: Вывести карточки на страницу

function renderCards(initialArr) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage));
  });
}

renderCards(initialCards)

// функция показа поп апа редактирования 
const popupProfileEditEl = document.querySelector('.popup_type_edit');

// функция показа поп апа создания новой карточки 
const popupAddCardEl = document.querySelector('.popup_type_new-card');

const pageEl = document.querySelector('.page');

document.querySelector('.profile').addEventListener('click', (event) => {
  if(event.target.classList.contains('profile__add-button')) {
    popupAddCardEl.style.display = 'flex';
    addCloseEvent(popupAddCardEl);
  } else if (event.target.classList.contains('profile__edit-button')) {
    popupProfileEditEl.style.display = 'flex';
    addCloseEvent(popupProfileEditEl);
  } 
})

function addCloseEvent(obj) {
  obj.addEventListener('click', closePopup);
  pageEl.addEventListener('keydown', closePopupByEsc);
}

function closePopup(event) {
    if(event.target.classList.contains('popup__close') 
      || event.target.classList.contains('popup') 
    || event.target.classList.contains('popup__button')) {
     event.target.closest('.popup').style.display = 'none';
    } 
}

function closePopupByEsc(event) {
   if (event.key === 'Escape') {
      document.querySelectorAll('.popup').forEach(el => {
        el.style.display = 'none';
      })
  }
  pageEl.removeEventListener('keydown', closePopupByEsc);
}

const profileNameEl = document.querySelector('.profile__title');
const profileJobEl = document.querySelector('.profile__description');

// Находим форму в DOM
const formElement = document.querySelector('.edit-profile');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
nameInput.value = profileNameEl.textContent;
jobInput.value = profileJobEl.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileNameEl.textContent = nameInput.value;
    profileJobEl.textContent = jobInput.value;
    // addCloseEvent(popupProfileEditEl);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

const cardsFormElement = document.querySelector('.new-place');

const cardNameEl = cardsFormElement.querySelector('.popup__input_type_card-name');
const cardImgUrlEl = cardsFormElement.querySelector('.popup__input_type_url');

function addNewCard(event) {
  event.preventDefault();

  placesList.querySelectorAll('.card').forEach( el=>{
      el.remove();
  });

  initialCards.unshift({
    name: cardNameEl.value,
    link: cardImgUrlEl.value,
  })
  cardNameEl.value = '';
  cardImgUrlEl.value = '';
 
  renderCards(initialCards)
}

cardsFormElement.addEventListener('submit', addNewCard);

