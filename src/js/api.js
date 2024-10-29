import { urlConfig, handleChangeAvatar,
  profileSaveBtn,avatarSaveBtn,cardsSaveBtn,imageEditInput, 
  popupProfileEditEl,popupProfileImageEditEl, 
  nameInput,jobInput,insertUserData,cardNameEl,cardImgUrlEl, popupAddCardEl,
  addNewCard
 } from '../index.js';

import { closeModal } from './modal.js';  

export const getUser = () => {
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
    return user;
  });
};

export const getCards = () => {
  return fetch(`${urlConfig.baseUrl}/cards`, {
    headers: urlConfig.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(cards => {
    return cards;
  });
};

export function changeAvatar(evt) {
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

export function editProfileForm(evt) {
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

export const sendCardToServer = (evt) => {
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