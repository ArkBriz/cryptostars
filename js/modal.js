import { getCurrentStatus, getUsers } from './sorting.js';
import { isEscKey } from './util.js';
import { setUserData } from './payment-data.js';
import { resetFormValidation } from './form-validation.js';

const usersList = document.querySelector('.users-list__table-body');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const modalDescription = modal.querySelector('.modal__description');
const closeModalBtn = modal.querySelector('.close-btn');
const overlay = modal.querySelector('.modal__overlay');
const walletNumberBlock = modal.querySelector('#wallet-number');
const body = document.body;

const modalSettings = {
  buyer: {
    description: 'Продажа криптовалюты',
    order: '-1',
  },
  seller: {
    description: 'Покупка криптовалюты',
    order: '0',
  }
};

const setModalDescription = (mode) => {
  const settings = modalSettings[mode];

  modalDescription.textContent = settings.description;
  walletNumberBlock.style.order = settings.order;
};

const openModal = () => {
  modal.style.display = '';
  body.classList.add('scroll-lock');

  closeModalBtn.addEventListener('click', onCloseBtnClick);
  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscKeydown);
};

const closeModal = () => {
  modal.style.display = 'none';
  body.classList.remove('scroll-lock');
  modalForm.reset();
  resetFormValidation();

  closeModalBtn.removeEventListener('click', onCloseBtnClick);
  overlay.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscKeydown);
};

usersList.addEventListener('click', (evt) => {
  const exchangeBtn = evt.target.closest('.btn');

  if (!exchangeBtn) {
    return;
  }

  const userId = exchangeBtn.dataset.userId;
  const selectedUser = getUsers().find((user) => user.id === userId);

  const currentStatus = getCurrentStatus();
  setModalDescription(currentStatus);

  setUserData(selectedUser);
  openModal();
});

function onEscKeydown (evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function onCloseBtnClick () {
  closeModal();
}

function onOverlayClick () {
  closeModal();
}

export { openModal };
