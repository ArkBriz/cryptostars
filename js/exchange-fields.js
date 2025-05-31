import { isBuyingMode } from './payment-data.js';
import { parseNumber } from './util.js';
import { getProfileData } from './user.js';

const sendingField = document.querySelector('[name="sendingAmount"]');
const recievingField = document.querySelector('[name="receivingAmount"]');
const sendAllBtn = sendingField.closest('.custom-input').querySelector('.custom-input__btn');
const receiveAllBtn = recievingField.closest('.custom-input').querySelector('.custom-input__btn');

let exchangeRate;
let userBalance;

const setExchangeData = ({rate, contractorBalance}) => {
  exchangeRate = Number(rate);
  userBalance = contractorBalance;
};

const countReceiving = () => {
  const sendingValue = parseNumber(sendingField.value);

  if (isBuyingMode()) {
    recievingField.value = (sendingValue / exchangeRate);
  } else {
    recievingField.value = (sendingValue * exchangeRate);
  }
};

const countSending = () => {
  const receivingValue = parseNumber(recievingField.value);

  if (isBuyingMode()) {
    sendingField.value = (receivingValue * exchangeRate);
  } else {
    sendingField.value = (receivingValue / exchangeRate);
  }
};

const onSendAllClick = () => {
  const profileBalance = getProfileData().balances[isBuyingMode() ? 0 : 1].amount;
  sendingField.value = profileBalance;
  countReceiving();
};

const onReceiveAllClick = () => {
  recievingField.value = userBalance;
  countSending();
};

sendingField.addEventListener('input', countReceiving);
recievingField.addEventListener('input', countSending);
sendAllBtn.addEventListener('click', onSendAllClick);
receiveAllBtn.addEventListener('click', onReceiveAllClick);

export { setExchangeData };
