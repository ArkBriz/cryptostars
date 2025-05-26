import { currentStatus } from "./sorting.js";
import { isEscKey } from "./util.js";

const usersList = document.querySelector('.users-list__table-body');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const closeModalBtn = modal.querySelector('.close-btn');
const overlay = modal.querySelector('.modal__overlay');
const body = document.body;

usersList.addEventListener('click', (evt) => {
  const exchangeBtn = evt.target.closest('.btn');

  if (!exchangeBtn) {
    return;
  };

  modal.style.display = '';

  if (currentStatus === 'buyer') {
    modal.querySelector('.modal__description').textContent = 'Продажа криптовалюты';
    modal.querySelector('#wallet-number').style.order = '-1';
  };

  body.classList.add('scroll-lock');
  document.addEventListener('keydown', onEscKeydown);
});

const closeModal = () => {
  modal.style.display = 'none';
  body.classList.remove('scroll-lock');

  modalForm.reset();
  // pristine.reset();

  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseBtnClick = () => closeModal();
const onOverlayClick = () => closeModal();

closeModalBtn.addEventListener('click', onCloseBtnClick);
overlay.addEventListener('click', onOverlayClick);
