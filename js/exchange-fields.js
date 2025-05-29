import { isBuying } from "./payment-data.js";
import { getProfileData } from "./user.js";
import { parseNumber, floorToHundredths } from "./util.js";

const sendingField = document.querySelector('[name="sendingAmount"]');
const recievingField = document.querySelector('[name="receivingAmount"]');
const sendAllBtn = sendingField.closest('.custom-input').querySelector('.custom-input__btn');
const receiveAllBtn = recievingField.closest('.custom-input').querySelector('.custom-input__btn');

let exchangeRate;
let userBalance;
let profileData;

const setExchangeData = ({rate, contractorBalance}) => {
  exchangeRate = Number(rate.toFixed(0));
  userBalance = contractorBalance;
  profileData = getProfileData();
};

const countReceiving = () => {
  const sendingValue = parseNumber(sendingField.value);

  if (isBuying) {
    recievingField.value = floorToHundredths(sendingValue / exchangeRate);
  } else {
    recievingField.value = Math.ceil(sendingValue * exchangeRate);
  }
};

const countSending = () => {
  const receivingValue = parseNumber(recievingField.value);

  if (isBuying) {
    sendingField.value = Math.ceil(receivingValue * exchangeRate);
  } else {
    sendingField.value = floorToHundredths(receivingValue / exchangeRate);
  }
};

const onSendAllClick = () => {
  const profileBalance = profileData.balances[isBuying ? 0 : 1].amount;
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

export { setExchangeData, exchangeRate, userBalance, profileData };
