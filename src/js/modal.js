export function openModal(element){
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
}

export function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}