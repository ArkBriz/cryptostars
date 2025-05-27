import { currentStatus, getUsers } from "./sorting.js";
import { getProfileData } from "./user.js";
import { parseNumber, floorToHundredths } from "./util.js";

const sendingField = document.querySelector('[name="sendingAmount"]');
const recievingField = document.querySelector('[name="receivingAmount"]');
const sendAllBtn = sendingField.closest('.custom-input').querySelector('.custom-input__btn');
const receiveAllBtn = recievingField.closest('.custom-input').querySelector('.custom-input__btn');

let exchangeRate;
let profileBalance;
let userBalance;

const countReceiving = () => {
  const sendingValue = parseNumber(sendingField.value);

  if (currentStatus === 'seller') {
    recievingField.value = floorToHundredths(sendingValue / exchangeRate);
  } else {
    recievingField.value = Math.ceil(sendingValue * exchangeRate);
  }
};

const countSending = () => {
  const receivingValue = parseNumber(recievingField.value);

  if (currentStatus === 'seller') {
    sendingField.value = Math.ceil(receivingValue * exchangeRate);
  } else {
    sendingField.value = floorToHundredths(receivingValue / exchangeRate);
  }
};

const onSendAllClick = () => {
  if (currentStatus === 'seller') {
    sendingField.value = getProfileData().balances[0].amount;
    countReceiving();
  } else {
    sendingField.value = getProfileData().balances[1].amount;
    countReceiving();
  }
};

const onReceiveAllClick = () => {
  recievingField.value = userBalance;
  countSending();
};

const setExchangeData = ({rate, contractorBalance}) => {
  exchangeRate = rate.toFixed(0);
  userBalance = contractorBalance;

  if (currentStatus === 'seller') {
    profileBalance = getProfileData().balances[0].amount;
  } else {
    profileBalance = getProfileData().balances[1].amount;
  }
};

sendingField.addEventListener('input', countReceiving);
recievingField.addEventListener('input', countSending);
sendAllBtn.addEventListener('click', onSendAllClick);
receiveAllBtn.addEventListener('click', onReceiveAllClick);

export { setExchangeData };
