import { formatNumber } from './util.js';
import { Currency } from './payment-data.js';

const usersList = document.querySelector('.users-list__table-body');
const userItemTemplate = document.querySelector('#user-table-row__template').content;

const createUserItem = (userData) => {
  const {id, status, userName, balance, exchangeRate, isVerified, minAmount} = userData;
  const userItem = userItemTemplate.cloneNode(true);
  const userBadgesList = userItem.querySelector('.users-list__badges-list');
  const userBadgeItem = userItem.querySelector('.badge').cloneNode(true);
  const exchangeBtn = userItem.querySelector('.btn');

  userItem.querySelector('.users-list__user-name').textContent = userName;
  userItem.querySelector('.users-list__table-currency').textContent = balance.currency;
  userItem.querySelector('.users-list__table-exchangerate').textContent = `${formatNumber(exchangeRate)} ${Currency.FIAT_SYMBOL}`;
  userItem.querySelector('.users-list__min-cashlimit').textContent = `${formatNumber(minAmount)}\u00A0${Currency.FIAT_SYMBOL}\u00A0-`;
  userItem.querySelector('.users-list__max-cashlimit').textContent = `\u00A0${formatNumber(balance.amount)}\u00A0${Currency.FIAT_SYMBOL}`;

  while (userBadgesList.firstChild) {
    userBadgesList.removeChild(userBadgesList.firstChild);
  }

  if (!isVerified) {
    userItem.querySelector('.users-list__table-name svg').remove();
  }

  if (status === 'seller') {
    const {paymentMethods} = userData;
    userItem.querySelector('.users-list__min-cashlimit').textContent = `${formatNumber(minAmount * exchangeRate)}\u00A0${Currency.FIAT_SYMBOL}\u00A0-`;
    userItem.querySelector('.users-list__max-cashlimit').textContent = `\u00A0${formatNumber(balance.amount * exchangeRate)}\u00A0${Currency.FIAT_SYMBOL}`;

    const fragment = document.createDocumentFragment();

    paymentMethods.forEach((method) => {
      const userBadge = userBadgeItem.cloneNode(true);
      userBadge.textContent = `${method.provider}`;
      fragment.append(userBadge);
    });

    userBadgesList.append(fragment);
  }

  exchangeBtn.dataset.userId = id;

  return userItem;
};

const renderUsersList = (usersData) => {
  usersList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  usersData.forEach((userData) => {
    fragment.append(createUserItem(userData));
  });

  usersList.append(fragment);
};

export { renderUsersList };
