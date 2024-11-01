export const urlConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: '56a37d53-5082-4948-be21-caf728509b19',
    'Content-Type': 'application/json',
  }
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUser = () => {
  return fetch(`${urlConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: urlConfig.headers
  }).then(getResponseData);
};

export const getCards = () => {
  return fetch(`${urlConfig.baseUrl}/cards`, {
    headers: urlConfig.headers
  }).then(getResponseData);
};

export function changeAvatar(objValue) {
return fetch(`${urlConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: urlConfig.headers,
    body: JSON.stringify(objValue)
  }).then(getResponseData);
};

export function editProfileForm(objValue) {
return fetch(`${urlConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: urlConfig.headers,
    body: JSON.stringify(objValue)
  }).then(getResponseData);
};

export const sendCardToServer = (cardInfo) => {
return fetch(`${urlConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: urlConfig.headers,
    body: JSON.stringify(cardInfo),
  }).then(getResponseData);
};

export const getLikes = (targetCard) => {
  return fetch(`${urlConfig.baseUrl}/cards/likes/${targetCard._id}`, {
    method: 'PUT',
    headers: urlConfig.headers,
  }).then(getResponseData);
};

export const removeLikes = (targetCard) => {
  return fetch(`${urlConfig.baseUrl}/cards/likes/${targetCard._id}`, {
    method: 'DELETE',
    headers: urlConfig.headers,
  }).then(getResponseData);
};

export const removeCardApi = (card) => {
 return fetch(`${urlConfig.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: urlConfig.headers,
  }).then(getResponseData);
}