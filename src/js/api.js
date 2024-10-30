import {
  imageEditInput, 
  nameInput,jobInput
 } from '../index.js';

export const urlConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: '56a37d53-5082-4948-be21-caf728509b19',
    'Content-Type': 'application/json',
  }
} ;


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
  }).catch(error => {
    console.log(error);
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
  }).catch(error => {
    console.log(error);
  });
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function changeAvatar() {
return fetch(`${urlConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: urlConfig.headers,
    body: JSON.stringify({
      avatar: imageEditInput.value,
    })
  }).then(getResponseData);
};

export function editProfileForm() {
return fetch(`${urlConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: urlConfig.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  }).then(getResponseData);
};

export const sendCardToServer = (cardInfo) => {

return fetch(`${urlConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: urlConfig.headers,
    body: JSON.stringify(cardInfo),
  }).then(getResponseData);
};