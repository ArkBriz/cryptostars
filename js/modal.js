import { currentStatus, getUsers } from "./sorting.js";
import { isEscKey, formatNumber } from "./util.js";

const usersList = document.querySelector('.users-list__table-body');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const modalDescription = modal.querySelector('.modal__description');
const verifiedMark = modal.querySelector('.verified-mark');
const contractorName = modal.querySelector('#contractor-name');
const userExchangeRate = modal.querySelector('#exchange-rate');
const minCashLimit = modal.querySelector('#min-cash-limit');
const maxCashLimit = modal.querySelector('#max-cash-limit');
const walletNumberField = modal.querySelector('#wallet-number');
const closeModalBtn = modal.querySelector('.close-btn');
const overlay = modal.querySelector('.modal__overlay');
const body = document.body;

const setUserData = (user) => {
  const {status, userName, exchangeRate, minAmount, balance, isVerified} = user;

  contractorName.textContent = userName;
  userExchangeRate.textContent = `${formatNumber(exchangeRate)} ₽`;
  minCashLimit.textContent = `${formatNumber(minAmount * exchangeRate)}\u00A0₽\u00A0-`;
  maxCashLimit.textContent = `\u00A0${formatNumber(balance.amount * exchangeRate)}\u00A0₽`;

  if (status === 'buyer') {
    minCashLimit.textContent = `${formatNumber(minAmount)}\u00A0₽\u00A0-`;
    maxCashLimit.textContent = `\u00A0${formatNumber(balance.amount)}\u00A0₽`;
  };

  if (!isVerified) {
    verifiedMark.style.display = 'none';
  } else {
    verifiedMark.style.display = '';
  }
};

usersList.addEventListener('click', (evt) => {
  const exchangeBtn = evt.target.closest('.btn');
  const userId = exchangeBtn.dataset.userId;
  const selectedUser = getUsers().find((user) => user.id === userId);

  if (!exchangeBtn) {
    return;
  };

  if (currentStatus === 'buyer') {
    modalDescription.textContent = 'Продажа криптовалюты';
    walletNumberField.style.order = '-1';
  } else if (currentStatus === 'seller') {
    modalDescription.textContent = 'Покупка криптовалюты';
    walletNumberField.style.order = '0';
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
