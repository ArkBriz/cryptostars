import { currentStatus, getUsers } from "./sorting.js";
import { isEscKey, formatNumber } from "./util.js";
import { getProfileData } from "./user.js";

const usersList = document.querySelector('.users-list__table-body');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const modalDescription = modal.querySelector('.modal__description');
const closeModalBtn = modal.querySelector('.close-btn');
const overlay = modal.querySelector('.modal__overlay');
const body = document.body;

const verifiedMark = modal.querySelector('.verified-mark');
const contractorName = modal.querySelector('#contractor-name');
const userExchangeRate = modal.querySelector('#exchange-rate');
const minCashLimit = modal.querySelector('#min-cash-limit');
const maxCashLimit = modal.querySelector('#max-cash-limit');
const walletNumberBlock = modal.querySelector('#wallet-number');
const walletNumberInput = walletNumberBlock.querySelector('input');
const paymentMethodSelect = modal.querySelector('#paymentMethod');
const cardNumberInput = modal.querySelector('#card-number');

let currentSellerPaymentMethods = [];

const createPaymentMethods = (methods) => {
  methods.forEach((method) => {
    const option = document.createElement('option');
    option.value = method.provider;
    option.textContent = method.provider;
    paymentMethodSelect.appendChild(option);
  })
};

const setCurrencyUnits = (sent, got) => {
  modalForm.querySelector('.custom-input__unit--sent').textContent = sent;
  modalForm.querySelector('.custom-input__unit--got').textContent = got;
};

const setUserData = (user) => {
  const { id, status, userName, exchangeRate, minAmount, balance, isVerified } = user;
  const profileData = getProfileData();

  const isBuying = currentStatus === 'seller';

  contractorName.textContent = userName;
  userExchangeRate.textContent = `${formatNumber(exchangeRate)} ₽`;

  modalForm.querySelector('[name="contractorId"]').value = id;
  modalForm.querySelector('[name="exchangeRate"]').value = exchangeRate;
  modalForm.querySelector('[name="type"]').value = isBuying ? 'BUY' : 'SELL';
  modalForm.querySelector('[name="sendingCurrency"]').value = isBuying ? 'RUB' : 'KEKS';
  modalForm.querySelector('[name="receivingCurrency"]').value = isBuying ? 'KEKS' : 'RUB';
  setCurrencyUnits(isBuying ? '₽' : 'KEKS', isBuying ? 'KEKS' : '₽');


  if (status === 'seller') {
    minCashLimit.textContent = `${formatNumber(minAmount * exchangeRate)}\u00A0₽\u00A0-`;
    maxCashLimit.textContent = `\u00A0${formatNumber(balance.amount * exchangeRate)}\u00A0₽`;
  } else {
    minCashLimit.textContent = `${formatNumber(minAmount)}\u00A0₽\u00A0-`;
    maxCashLimit.textContent = `\u00A0${formatNumber(balance.amount)}\u00A0₽`;
  };

  verifiedMark.style.display = !isVerified ? 'none' : '';

  paymentMethodSelect.innerHTML = `<option selected disabled>Выберите платёжную систему</option>`;

  const methods = isBuying ? user.paymentMethods : profileData.paymentMethods;
  createPaymentMethods(methods);
  currentSellerPaymentMethods = methods;

  walletNumberInput.value = isBuying ? profileData.wallet.address : user.wallet.address;
};

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

paymentMethodSelect.addEventListener('change', () => {
  const selectedProvider = paymentMethodSelect.value;

  const selectedMethodObject = currentSellerPaymentMethods.find((method) => method.provider === selectedProvider);

  if (selectedMethodObject.accountNumber) {
    cardNumberInput.value = selectedMethodObject.accountNumber;
  } else {
    cardNumberInput.value = '';
  }
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
