import './index.css';
import { enableValidation,clearValidation } from './js/validation.js';
import { createCard, likeCard, removeCard } from './js/card.js';
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

const profileSaveBtn = popupProfileEditEl.querySelector('.popup__button');
const avatarSaveBtn = popupProfileImageEditEl.querySelector('.popup__button');
const cardsSaveBtn = popupAddCardEl.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const urlConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: '56a37d53-5082-4948-be21-caf728509b19',
    'Content-Type': 'application/json',
  }
} ;

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

function changeAvatar(evt) {
  evt.preventDefault(); //Отменяем стандартную отправку формы.
  avatarSaveBtn.textContent = 'Сохранение...';
  fetch(`${urlConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: urlConfig.headers,
    body: JSON.stringify({
      avatar: imageEditInput.value,
    })
  }).then(res => {
    if(res.ok) {
      closeModal(popupProfileImageEditEl);
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }).then(res => handleChangeAvatar(res)).catch(error => {
   console.log(`Ошибка ${error}`)
  }); 
};

function handleChangeAvatar(url) {
  profileImgEl.style.backgroundImage = `url(${url.avatar})`
}

function editProfileForm(evt) {
    evt.preventDefault(); //Отменяем стандартную отправку формы.
    // Делаем запрос к серверу  
    profileSaveBtn.textContent = 'Сохранение...';
    fetch(`${urlConfig.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: urlConfig.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    }).then(res => {
      if(res.ok) {
        closeModal(popupProfileEditEl);
        return res.json();
      } else {
        return Promise.reject(res.status);
      } // получили ответ и полученный 
      // ответ передали в колбэк функцию рендеринга профиля на странице
    }).then(res => insertUserData(res)).catch(error => {
      insertUserData({
        name: 'Юрий',
        about: 'Исследователь океана',
      }), console.log(`Ошибка ${error}, вставили значения по умолчанию`)
    });
};

function insertUserData(user) {
  profileNameEl.textContent = user.name;
  profileJobEl.textContent = user.about;
  profileImgEl.style.backgroundImage = `url(${user.avatar})`
};

const sendCardToServer = (evt) => {
  evt.preventDefault();
  cardsSaveBtn.textContent = 'Сохранение...';
  let cardInfo = {
    name: cardNameEl.value,
    link: cardImgUrlEl.value,
  }
   fetch(`${urlConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: urlConfig.headers,
    body: JSON.stringify(cardInfo),
  }).then(res => {
    if(res.ok) {
      closeModal(popupAddCardEl);
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }).then(res => addNewCard(res)).catch(err => console.log(`Ошибка такая ${err}`));
};

function addNewCard(cardObj) {
  placesList.prepend(createCard(cardObj, 
  removeCard, likeCard, showImage));
};

function renderCards(initialArr, showImage, accOwner) {
  initialArr.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showImage, accOwner));
  });
};

  //Функция показа изображения карточки
  const showImage = (event) => {
    openModal(imagePopupEl);
    imageEl.src = event.target.src;
    imageEl.alt = event.target.alt;
    imageDesc.textContent = event.target.alt;
  };

// Прикрепляем обработчик к форме редактирования профиля:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit',editProfileForm); 
formImageProfile.addEventListener('submit', changeAvatar);
cardsFormElement.addEventListener('submit', sendCardToServer);
enableValidation(validationConfig); 

const getUser = () => {
  return fetch(`${urlConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: urlConfig.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(user => {
    // insertUserData(user);
    return user;
  });
};

const getCards = () => {
  return fetch(`${urlConfig.baseUrl}/cards`, {
    headers: urlConfig.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(cards => {
    // renderCards(cards, showImage)
    return cards;
  });
};

const accountOwner = getUser();
const mainCards = getCards();


Promise.all([accountOwner,mainCards]).then((resp) => {
    const [user, cards] = resp;
     console.log(user);
      console.log(cards);
    });