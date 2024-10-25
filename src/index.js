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
const imagePopupEl = document.querySelector('.popup_type_image');
const imageEl = imagePopupEl.querySelector('.popup__image');
const imageDesc = imagePopupEl.querySelector('.popup__caption');
const popupProfileImageEditEl = document.querySelector('.popup_type_edit-image-profile');
const popupProfileEditEl = document.querySelector('.popup_type_edit');
const popupAddCardEl = document.querySelector('.popup_type_new-card');
const profileEditBtnEl = document.querySelector('.profile__edit-button');
const addCardBtnEl = document.querySelector('.profile__add-button');
const profileImageEditBtnEl = document.querySelector('.profile__image-edit');
// Находим форму изменения фото профиля в DOM
const formImageProfile = document.forms['edit-image'];
// Находим форму изменения профиля в DOM
const formProfile = document.forms['edit-profile'];
// Находим форму добавления карточки в DOM
const cardsFormElement = document.forms['new-place'];
// Находим поле формы(редактирования аватара)
const imageEditInput = formImageProfile.querySelector('.popup__input_type_url')
// Находим поля формы(профиля) в DOM
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
// Находим поля формы(карточки) в DOM
const cardNameEl = cardsFormElement.querySelector('.popup__input_type_card-name');
const cardImgUrlEl = cardsFormElement.querySelector('.popup__input_type_url');
// Нашли элементы описания профиля
const profileNameEl = document.querySelector('.profile__title');
const profileJobEl = document.querySelector('.profile__description');
const profileImgEl = document.querySelector('.profile__image');
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

profileImageEditBtnEl.addEventListener('click', ()=> {
  openModal(popupProfileImageEditEl);
  clearValidation(formImageProfile,validationConfig);
})

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

function changeAvatar(evt) {
  evt.preventDefault(); //Отменяем стандартную отправку формы.

  fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '56a37d53-5082-4948-be21-caf728509b19',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: imageEditInput.value,
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
  imageEditInput.value = '';
  closeModal(popupProfileImageEditEl);
} 

formImageProfile.addEventListener('submit', changeAvatar)

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editProfileForm(evt) {
    evt.preventDefault(); //Отменяем стандартную отправку формы.
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
// Прикрепляем обработчик к форме редактирования профиля:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit',editProfileForm); 

function addNewCard(cardObj) {
  placesList.prepend(createCard(cardObj, 
  removeCard, likeCard, showImage));
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
  }).then(res => addNewCard(res)).catch(err => {console.log(`Ошибка такая ${err}`)});
  cardNameEl.value = '',
  cardImgUrlEl.value = '',
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

function renderCards(initialArr, showImage, accOwner) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage, accOwner));
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

// function sendRequestData () {
  Promise.all([getUser(),getCards()]).then((resp) => {
    const [user, cards] = resp;
    
    user.json().then(userData => {
     insertUserData(userData);
      });
    cards.json().then(cardsData => {
      console.log(cardsData);
    renderCards(cardsData, showImage)
      });
    });
// }

// sendRequestData();

function insertUserData(user) {
  profileNameEl.textContent = user.name;
  profileJobEl.textContent = user.about;
  profileImgEl.style.backgroundImage = `url(${user.avatar})`
}

// let time;
// imageEditInput.addEventListener('input', (event) => {
//   clearTimeout(time);
//   time = setTimeout(checkInputlink, 1300)
// })

// function checkInputlink() {
//   fetch(imageEditInput.value, {
//         method: 'HEAD',
//       }).then(res => console.log(res.headers.get('content-type')));
// }