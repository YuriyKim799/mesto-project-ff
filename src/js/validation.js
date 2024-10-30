

const regexp = /^[a-zA-Zа-яА-ЯЁё \-]+$/;
const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

export const enableValidation = (optionsConfig) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(optionsConfig.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, optionsConfig);
  });
};

const setEventListeners = (formElement, optionsConfig) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(optionsConfig.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(optionsConfig.submitButtonSelector);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, optionsConfig);
      toggleButtonState(inputList, buttonElement,optionsConfig);
      
    });
  });
  toggleButtonState(inputList, buttonElement, optionsConfig);
}; 

// function checkTextInput(formElement, inputElement) {
//         if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage);
//       } else if (!regexp.test(inputElement.value)) {
//         showInputError(formElement, inputElement, inputElement.dataset.error);
//       } else {
//         hideInputError(formElement, inputElement);
//       }
// }

// function checkUrlInput(formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else if (!urlPattern.test(inputElement.value)) {
//     showInputError(formElement, inputElement, inputElement.dataset.error);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// }

// const isValid = (formElement, inputElement) => {

//   if(inputElement.type === 'text') {
//     checkTextInput(formElement, inputElement)
//   } else if (inputElement.name === 'link') {
//     checkUrlInput(formElement, inputElement)
//   }

// }; 

const isValid = (formElement, inputElement) => {
    let time;
      if (inputElement.name === 'link') {
        checkInputUrlValue(formElement, inputElement)
      } 
      if (inputElement.name === 'image-edit') {
        clearTimeout(time);
        time = setTimeout(checkInputlink(formElement,inputElement), 5000)
      } else {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, optionsConfig);
      } else if (!regexp.test(inputElement.value)) {
        showInputError(formElement, inputElement, inputElement.dataset.error, optionsConfig);
      } else {
        hideInputError(formElement, inputElement, optionsConfig);
      }

}; 


function checkInputlink(formElement,inputElement) {
  fetch(inputElement.value, {
        method: 'HEAD',
        // mode: 'no-cors'
      })
      .then(res => res.headers.get('content-type'))
      .then(res => checkMimeType(res,formElement,inputElement))
      .catch(err => console.log("заебал этот CORS", err));
}

function checkMimeType(res,formElement,inputElement) {
  console.log(res.contains('image/'));
  // if(res ==='image/') {
  //   showInputError(formElement, inputElement, inputElement.dataset.error);
  // }
}

function checkInputUrlValue(formElement, inputElement) {
  if (!urlPattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, inputElement.dataset.error);
  } 
   if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const showInputError = (formElement, inputElement, errorMessage, optionsConfig) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-${optionsConfig.errorClass}`);
  inputElement.classList.add(optionsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, optionsConfig) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-${optionsConfig.errorClass}`);
  inputElement.classList.remove(optionsConfig.inputErrorClass);
  errorElement.textContent = '';
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, optionsConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add(optionsConfig.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(optionsConfig.inactiveButtonClass);
  }
}; 

// // Функция принимает массив полей
const hasInvalidInput = (inputList) => {
      // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция
// hasInvalidInput вернёт true
return !inputElement.validity.valid || !regexp.test(inputElement.value) && !urlPattern.test(inputElement.value);
})
}; 

export function clearValidation(formElement,validationConfig) {
  const btnEl = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  btnEl.textContent = 'Сохранить';
  btnEl.disabled = true;
  btnEl.classList.add(validationConfig.inactiveButtonClass);
  inputList.forEach(inputEl => {
    inputEl.value = "";
    if (!inputEl.validity.valid || !urlPattern.test(inputEl.value)) {
      hideInputError(formElement, inputEl, validationConfig);
    }
  });
  
}