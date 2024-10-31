import './index.css';
import { enableValidation,clearValidation } from './js/validation.js';
import { createCard, likeCard, removeCard } from './js/card.js';
import { closeModal, openModal } from './js/modal.js';
import { getUser,getCards, changeAvatar, editProfileForm, sendCardToServer
 } from './js/api.js';
//Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
//DOM узлы
export const pageEl = document.querySelector('.page');
const imagePopupEl = document.querySelector('.popup_type_image');
const imageEl = imagePopupEl.querySelector('.popup__image');
const imageDesc = imagePopupEl.querySelector('.popup__caption');
export const popupProfileImageEditEl = document.querySelector('.popup_type_edit-image-profile');
export const popupProfileEditEl = document.querySelector('.popup_type_edit');
export const popupAddCardEl = document.querySelector('.popup_type_new-card');
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
export const imageEditInput = formImageProfile.querySelector('.popup__input_type_url')
// Находим поля формы(профиля) в DOM
export const nameInput = formProfile.querySelector('.popup__input_type_name');
export const jobInput = formProfile.querySelector('.popup__input_type_description');
// Находим поля формы(карточки) в DOM
export const cardNameEl = cardsFormElement.querySelector('.popup__input_type_card-name');
export const cardImgUrlEl = cardsFormElement.querySelector('.popup__input_type_url');
// Нашли элементы описания профиля
const profileNameEl = document.querySelector('.profile__title');
const profileJobEl = document.querySelector('.profile__description');
const profileImgEl = document.querySelector('.profile__image');
//Находим данные попапа для закрытия
const popupEls = document.querySelectorAll('.popup');
const popupCloseEls = document.querySelectorAll('.popup__close');

export const profileSaveBtn = popupProfileEditEl.querySelector('.popup__button');
export const avatarSaveBtn = popupProfileImageEditEl.querySelector('.popup__button');
export const cardsSaveBtn = popupAddCardEl.querySelector('.popup__button');

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

function insertUserData(user) {
  profileNameEl.textContent = user.name;
  profileJobEl.textContent = user.about;
  profileImgEl.style.backgroundImage = `url(${user.avatar})`;
};

function addNewCard(card) {
  placesList.prepend(createCard(card, 
  removeCard, likeCard, showImage, card.owner));
};

function renderCards(initialCards, showImage, accOwner) {
  initialCards.forEach((card) => {
    placesList.append(createCard(card, removeCard, 
      likeCard, showImage, accOwner));
  });
};
  //Функция показа изображения карточки
const showImage = (event) => {
  openModal(imagePopupEl);
  imageEl.src = event.target.src;
  imageEl.alt = event.target.alt;
  imageDesc.textContent = event.target.alt;
};

function changeBtnText(btn) {
  btn.textContent = 'Сохранение...';
}

// Прикрепляем обработчик к форме редактирования профиля:
// он будет следить за событием “submit” - «отправка»
formImageProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  changeBtnText(avatarSaveBtn);
  changeAvatar({
    avatar: imageEditInput.value,
  })
  .then(res => insertUserData(res))
  .catch(err=> {
    console.log(`Ошибка: ${err}`);
    }).finally(()=> closeModal(popupProfileImageEditEl));
  });

formProfile.addEventListener('submit',(event) => {
  event.preventDefault();
  changeBtnText(profileSaveBtn);
  editProfileForm({
    name: nameInput.value,
    about: jobInput.value
  })
  .then(res => insertUserData(res))
  .catch(err=> {
    console.log(`Ошибка: ${err}`);
    }).finally(()=> closeModal(popupProfileEditEl));
}); 

cardsFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  changeBtnText(cardsSaveBtn);
  sendCardToServer({
    name: cardNameEl.value,
    link: cardImgUrlEl.value,
  })
  .then(res => addNewCard(res))
  .catch(err=> {
    console.log(`Ошибка: ${err}`);
  }).finally(()=> closeModal(popupAddCardEl));
});

const accountOwner = getUser();
const initialCards = getCards();

Promise.all([accountOwner,initialCards]).then((resp) => {
  const [accOwner, initialCards] = resp;
  insertUserData(accOwner);
  renderCards(initialCards, showImage, accOwner);
});

enableValidation(validationConfig); 