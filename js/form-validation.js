import { getProfileData } from './user.js';
import { isBuyingMode, getSelectedUser } from './payment-data.js';
import { parseNumber, floorToHundredths } from './util.js';
import { sendData } from './api.js';

const modalForm = document.querySelector('.modal-buy');
const sendingField = modalForm.querySelector('[name="sendingAmount"]');
const receivingField = modalForm.querySelector('[name="receivingAmount"]');
const paymentMethodSelect = modalForm.querySelector('[name="paymentMethod"]');
const passwordField = modalForm.querySelector('[name="paymentPassword"]');
const exchangeBtn = modalForm.querySelector('.modal__submit');
const errorMessage = modalForm.querySelector('.modal__validation-message--error');
const successMessage = modalForm.querySelector('.modal__validation-message--success');

const pristine = new Pristine(modalForm, {
  classTo: 'custom-input',
  errorTextParent: 'custom-input',
  errorTextTag: 'div',
  errorTextClass: 'custom-input__error'
});

const getExchangeLimits = (type) => {
  const { minAmount, exchangeRate, balance } = getSelectedUser();
  let contractorMinLimit, contractorMaxLimit, userLimit, currency;

  if (type === 'sending') {
    contractorMinLimit = isBuyingMode() ? minAmount * exchangeRate : minAmount / exchangeRate ;
    contractorMaxLimit = isBuyingMode() ? balance.amount * exchangeRate : balance.amount / exchangeRate;
    userLimit = isBuyingMode() ? getProfileData().balances[0].amount : getProfileData().balances[1].amount;
    currency = isBuyingMode() ? '₽' : 'KEKS';
  } else {
    contractorMinLimit = isBuyingMode() ? minAmount / exchangeRate : minAmount;
    contractorMaxLimit = isBuyingMode() ? balance.amount : balance.amount * exchangeRate;
    userLimit = isBuyingMode() ? getProfileData().balances[0].amount / exchangeRate : getProfileData().balances[1].amount * exchangeRate;
    currency = isBuyingMode() ? 'KEKS' : '₽';
  }

  return {
    contractorMinLimit,
    contractorMaxLimit,
    userLimit,
    currency
  };
};

const getAmountErrorMessage = (amount, limits) => {
  const { contractorMinLimit, contractorMaxLimit, userLimit, currency } = limits;

  if (amount > userLimit) {
    return 'Недостаточно средств на счете';
  } else if (amount < contractorMinLimit) {
    return `Минимальная сумма - ${floorToHundredths(contractorMinLimit)} ${currency}`;
  } else if (amount > contractorMaxLimit) {
    return `Максимальная сумма - ${floorToHundredths(contractorMaxLimit)} ${currency}`;
  }

  return '';
};

const validateSendingField = (value) => {
  const amount = parseNumber(value);
  const limits = getExchangeLimits('sending');
  const { contractorMinLimit, contractorMaxLimit, userLimit } = limits;

  if (isNaN(amount) || amount <= 0) {
    return false;
  }

  return amount >= contractorMinLimit && amount <= contractorMaxLimit && amount <= userLimit;
};

const getSendingErrorMessage = (value) => {
  const amount = parseNumber(value);
  const limits = getExchangeLimits('sending');

  if (isNaN(amount) || amount <= 0) {
    return `Минимальная сумма - ${floorToHundredths(limits.contractorMinLimit)} ${limits.currency}`;
  }

  return getAmountErrorMessage(amount, limits);
};

pristine.addValidator(
  sendingField,
  validateSendingField,
  getSendingErrorMessage
);

const validateReceivingField = (value) => {
  const amount = parseNumber(value);
  const limits = getExchangeLimits('receiving');
  const { contractorMinLimit, contractorMaxLimit, userLimit } = limits;

  if (isNaN(amount) || amount <= 0) {
    return false;
  }

  return amount >= contractorMinLimit && amount <= contractorMaxLimit && amount <= userLimit;
};

const getReceivingErrorMessage = (value) => {
  const amount = parseNumber(value);
  const limits = getExchangeLimits('receiving');
  return getAmountErrorMessage(amount, limits);
};

pristine.addValidator(
  receivingField,
  validateReceivingField,
  getReceivingErrorMessage
);

const validateSelect = () => paymentMethodSelect.selectedIndex > 0;

pristine.addValidator(
  paymentMethodSelect,
  validateSelect,
  'Выберите платежную систему'
);

const validatePassword = (value) => value.trim() !== '';

pristine.addValidator(
  passwordField,
  validatePassword,
  'Введите пароль'
);

const showSubmitError = () => {
  errorMessage.style.display = 'flex';
};

const showSubmitSuccess = () => {
  successMessage.style.display = 'flex';
};

const hideSubmitStatus = () => {
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';
};

const resetFormValidation = () => {
  pristine.reset();
  hideSubmitStatus();
};

const blockExchangeBtn = () => {
  exchangeBtn.disabled = true;
  exchangeBtn.textContent = 'Обмениваю...';
};

const unblockExchangeBtn = () => {
  exchangeBtn.disabled = false;
  exchangeBtn.textContent = 'Обменять';
};

const setOnFormSubmit = () => {
  modalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    hideSubmitStatus();

    const isValid = pristine.validate();

    if (isValid) {
      blockExchangeBtn();
      sendData(
        () => {
          hideSubmitStatus();
          showSubmitSuccess();
          unblockExchangeBtn();
        },
        () => {
          hideSubmitStatus();
          showSubmitError();
          unblockExchangeBtn();
        },
        new FormData(modalForm)
      );
    } else {
      showSubmitError();
    }
  });
};

export { setOnFormSubmit, resetFormValidation };
