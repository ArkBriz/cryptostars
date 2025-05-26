const usersList = document.querySelector('.users-list__table-body');
const userItemTemplate = document.querySelector('#user-table-row__template').content;

const createUserItem = (userData) => {
  const {status, userName, balance, exchangeRate, isVerified, minAmount} = userData;
  const userItem = userItemTemplate.cloneNode(true);
  const userBadgesList = userItem.querySelector('.users-list__badges-list');
  const userBadgeItem = userItem.querySelector('.badge').cloneNode(true);

  userItem.querySelector('.users-list__user-name').textContent = userName;
  userItem.querySelector('.users-list__table-currency').textContent = balance.currency;
  userItem.querySelector('.users-list__table-exchangerate').textContent = `${exchangeRate.toFixed(0)} ₽`;
  userItem.querySelector('.users-list__min-cashlimit').textContent = `${minAmount}\u00A0₽\u00A0-`;
  userItem.querySelector('.users-list__max-cashlimit').textContent = `\u00A0${balance.amount}\u00A0₽`;
  userItem.querySelector('.users-list__badges-list').innerHTML = '';

  if (!isVerified) {
    userItem.querySelector('.users-list__table-name svg').remove();
  };

  if (status === "seller") {
    const {paymentMethods} = userData;
    userItem.querySelector('.users-list__min-cashlimit').textContent = `${(minAmount * exchangeRate).toFixed(0)}\u00A0₽\u00A0-`;
    userItem.querySelector('.users-list__max-cashlimit').textContent = `\u00A0${(balance.amount * exchangeRate).toFixed(0)}\u00A0₽`;

    paymentMethods.forEach((method) => {
      const userBadge = userBadgeItem.cloneNode(true);
      userBadge.textContent = `${method.provider}`;
      userBadgesList.append(userBadge);
    });
  };

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
