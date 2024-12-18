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

const isValid = (formElement, inputElement, optionsConfig) => {
      if (inputElement.validity.patternMismatch) {
        showInputError(formElement, inputElement, inputElement.dataset.error, optionsConfig);
      } else if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, optionsConfig);
      } else {
        hideInputError(formElement, inputElement, optionsConfig);
      }
    };


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
return !inputElement.validity.valid || inputElement.value === '';
  })
}; 

export function clearValidation(formElement,validationConfig) {
  const btnEl = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  btnEl.disabled = true;
  btnEl.classList.add(validationConfig.inactiveButtonClass);
  inputList.forEach(inputEl => {
    inputEl.value = "";
    hideInputError(formElement, inputEl, validationConfig);
  });
  
}