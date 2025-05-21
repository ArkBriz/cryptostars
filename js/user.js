const profileBlock = document.querySelector('.user-profile');
const userCryptoBalance = profileBlock.querySelector('#user-crypto-balance');
const userFiatBalance = profileBlock.querySelector('#user-fiat-balance');
const userProfileName = profileBlock.querySelector('.user-profile__name span');

const setUserData = ({userName, balances}) => {
  userFiatBalance.textContent = balances[0].amount;
  userCryptoBalance.textContent = balances[1].amount;
  userProfileName.textContent = userName;
};

const hideProfileBlock = () => {
  profileBlock.style.display = 'none';
};

export { setUserData, hideProfileBlock };
