import { getProfileData } from './user.js';
import { formatNumber } from './util.js';
import { setExchangeData } from './exchange-fields.js';

const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const verifiedMark = modal.querySelector('.verified-mark');
const contractorName = modal.querySelector('#contractor-name');
const userExchangeRate = modal.querySelector('#exchange-rate');
const minCashLimit = modal.querySelector('#min-cash-limit');
const maxCashLimit = modal.querySelector('#max-cash-limit');
const walletNumberBlock = modal.querySelector('#wallet-number');
const walletNumberInput = walletNumberBlock.querySelector('input');
const paymentMethodSelect = modal.querySelector('#paymentMethod');
const cardNumberInput = modal.querySelector('#card-number');

let selectedUser;
let currentSellerPaymentMethods = [];
let isBuying;

const setCurrencyUnits = (sent, got) => {
  modalForm.querySelector('.custom-input__unit--sent').textContent = sent;
  modalForm.querySelector('.custom-input__unit--got').textContent = got;
};

const createPaymentMethods = (methods) => {
  methods.forEach((method) => {
    const option = document.createElement('option');
    option.value = method.provider;
    option.textContent = method.provider;
    paymentMethodSelect.appendChild(option);
  });
};

const setUserData = (user) => {
  const { id, status, userName, exchangeRate, minAmount, balance, isVerified } = user;
  const profileData = getProfileData();
  selectedUser = user;

  isBuying = status === 'seller';

  contractorName.textContent = userName;
  userExchangeRate.textContent = `${formatNumber(exchangeRate)} ₽`;

  modalForm.querySelector('[name="contractorId"]').value = id;
  modalForm.querySelector('[name="exchangeRate"]').value = exchangeRate;
  modalForm.querySelector('[name="type"]').value = isBuying ? 'BUY' : 'SELL';
  modalForm.querySelector('[name="sendingCurrency"]').value = isBuying ? 'RUB' : 'KEKS';
  modalForm.querySelector('[name="receivingCurrency"]').value = isBuying ? 'KEKS' : 'RUB';
  setCurrencyUnits(isBuying ? '₽' : 'KEKS', isBuying ? 'KEKS' : '₽');


  if (isBuying) {
    minCashLimit.textContent = `${formatNumber(minAmount * exchangeRate)}\u00A0₽\u00A0-`;
    maxCashLimit.textContent = `\u00A0${formatNumber(balance.amount * exchangeRate)}\u00A0₽`;
  } else {
    minCashLimit.textContent = `${formatNumber(minAmount)}\u00A0₽\u00A0-`;
    maxCashLimit.textContent = `\u00A0${formatNumber(balance.amount)}\u00A0₽`;
  }

  verifiedMark.style.display = !isVerified ? 'none' : '';

  paymentMethodSelect.innerHTML = '<option selected disabled>Выберите платёжную систему</option>';

  const methods = user.paymentMethods || profileData.paymentMethods || [];
  createPaymentMethods(methods);
  currentSellerPaymentMethods = methods;

  walletNumberInput.value = (user.wallet && user.wallet.address) || profileData.wallet.address || '';

  const contractorBalance = balance.amount;
  const rate = exchangeRate;
  setExchangeData({ rate, contractorBalance });
};

paymentMethodSelect.addEventListener('change', () => {
  const selectedProvider = paymentMethodSelect.value;

  const selectedMethodObject = currentSellerPaymentMethods.find((method) => method.provider === selectedProvider);

  if (selectedMethodObject.accountNumber) {
    cardNumberInput.value = selectedMethodObject.accountNumber;
  } else {
    cardNumberInput.value = '';
  }
});

export { setUserData, isBuying, selectedUser };
