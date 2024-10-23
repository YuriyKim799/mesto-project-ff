import './index.css';
import { enableValidation,clearValidation } from './js/validation.js';
import { createCard, likeCard, removeCard } from './js/card.js';
// import { initialCards } from './js/cards.js';
import { closeModal, openModal } from './js/modal.js';
//Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
//DOM узлы
export const pageEl = document.querySelector('.page');
export const imagePopupEl = document.querySelector('.popup_type_image');
export const imageEl = imagePopupEl.querySelector('.popup__image');
export const imageDesc = imagePopupEl.querySelector('.popup__caption');
const popupProfileEditEl = document.querySelector('.popup_type_edit');
const popupAddCardEl = document.querySelector('.popup_type_new-card');
const profileEditBtnEl = document.querySelector('.profile__edit-button');
const addCardBtnEl = document.querySelector('.profile__add-button');
// Находим форму изменения профиля в DOM
const formProfile = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileNameEl = document.querySelector('.profile__title');
const profileJobEl = document.querySelector('.profile__description');
const profileImgEl = document.querySelector('.profile__image');
//При открытии редактирования профиля в полях формы стоит имеющееся значение 
nameInput.value = profileNameEl.textContent;
jobInput.value = profileJobEl.textContent;
// Находим форму добавления карточки в DOM
const cardsFormElement = document.forms['new-place'];
// Находим поля формы в DOM
const cardNameEl = cardsFormElement.querySelector('.popup__input_type_card-name');
const cardImgUrlEl = cardsFormElement.querySelector('.popup__input_type_url');
//Находим данные попапа для закрытия
const popupEls = document.querySelectorAll('.popup');
const popupCloseEls = document.querySelectorAll('.popup__close');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

profileEditBtnEl.addEventListener('click', ()=> {
  openModal(popupProfileEditEl);
  clearValidation(formProfile, validationConfig);
});

addCardBtnEl.addEventListener('click', () => {
  openModal(popupAddCardEl);
  clearValidation(cardsFormElement, validationConfig);
});

popupCloseEls.forEach(element => {
  element.addEventListener('click', (event)=> {
    closeModal(event.target.closest('.popup'));
  });
});

popupEls.forEach(modal => {
  modal.addEventListener('click', event => {
    if(!event.target.classList.contains('popup')) {
      return;
    };
    closeModal(modal);
  });
});

  //Функция показа изображения карточки
 const showImage = (event) => {
  openModal(imagePopupEl);
  imageEl.src = event.target.src;
  imageEl.alt = event.target.alt;
  imageDesc.textContent = event.target.alt;
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editProfileForm(evt) {
    evt.preventDefault(); //Отменяем стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // Делаем запрос к серверу  
    fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '56a37d53-5082-4948-be21-caf728509b19',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    }).then(res => insertUserData(res)).catch(error => {
      insertUserData({
        name: 'Юрий',
        about: 'Сотрудник года',
      }), console.log(`Ошибка такая ${error}, вставили значения по умолчанию`)
    }); // получили ответ и полученный 
    // ответ передали в колбэк функцию рендеринга профиля на странице
    closeModal(popupProfileEditEl);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit',editProfileForm); 

function addNewCard(cardObj) {
  placesList.prepend(createCard(cardObj, 
  removeCard, likeCard, showImage));
  clearValidation(cardsFormElement, validationConfig);
}

const sendCardToServer = (evt) => {
  evt.preventDefault();
  let cardInfo = {
    name: cardNameEl.value,
    link: cardImgUrlEl.value,
  }
   fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    method: 'POST',
    headers: {
      authorization: '56a37d53-5082-4948-be21-caf728509b19',
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardInfo),
  }).then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }).then(res => {addNewCard(res)}).catch(err => {console.log(`Ошибка такая ${err}`)});

  closeModal(popupAddCardEl);
}

cardsFormElement.addEventListener('submit', sendCardToServer);
// Вызовем функцию
enableValidation(validationConfig); 

const getCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    headers: {
      authorization: '56a37d53-5082-4948-be21-caf728509b19'
    }
  });
}

// console.log(getCards());
function renderCards(initialArr, showImage) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage));
  });
}

const getUser = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
    method: 'GET',
    headers: {
      authorization: '56a37d53-5082-4948-be21-caf728509b19',
    }
  });
}

function sendRequestData () {
  Promise.all([getUser(),getCards()]).then((resp) => {
    const [user, cards] = resp;
    user.json().then(userData => {
     insertUserData(userData);
      });
    cards.json().then(cardsData => {
     renderCards(cardsData, showImage)
      })
    });
}

sendRequestData();

function insertUserData(user) {
  profileNameEl.textContent = user.name;
  profileJobEl.textContent = user.about;
  profileImgEl.style.backgroundImage = `url(${user.avatar})`
}