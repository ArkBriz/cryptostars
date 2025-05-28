import { currentStatus, getUsers } from "./sorting.js";
import { isEscKey } from "./util.js";
import { setUserData } from "./payment-data.js";

const usersList = document.querySelector('.users-list__table-body');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const modalDescription = modal.querySelector('.modal__description');
const closeModalBtn = modal.querySelector('.close-btn');
const overlay = modal.querySelector('.modal__overlay');
const walletNumberBlock = modal.querySelector('#wallet-number');
const body = document.body;

usersList.addEventListener('click', (evt) => {
  const exchangeBtn = evt.target.closest('.btn');

  if (!exchangeBtn) {
    return;
  };

  const userId = exchangeBtn.dataset.userId;
  const selectedUser = getUsers().find((user) => user.id === userId);

  if (currentStatus === 'buyer') {
    modalDescription.textContent = 'Продажа криптовалюты';
    walletNumberBlock.style.order = '-1';
  } else if (currentStatus === 'seller') {
    modalDescription.textContent = 'Покупка криптовалюты';
    walletNumberBlock.style.order = '0';
  };

  setUserData(selectedUser);
  openModal();
});

const openModal = () => {
  modal.style.display = '';
  body.classList.add('scroll-lock');
  document.addEventListener('keydown', onEscKeydown);
}

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

export { openModal };
