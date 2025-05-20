const userCryptoBalance = document.querySelector('#user-crypto-balance');
const userFiatBalance = document.querySelector('#user-fiat-balance');
const userProfileName = document.querySelector('.user-profile__name span');

const setUserData = ({userName, balances}) => {
  userFiatBalance.textContent = balances[0].amount;
  userCryptoBalance.textContent = balances[1].amount;
  userProfileName.textContent = userName;
};

export { setUserData };
