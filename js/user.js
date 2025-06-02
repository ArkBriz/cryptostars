const profileBlock = document.querySelector('.user-profile');
const userCryptoBalance = profileBlock.querySelector('#user-crypto-balance');
const userFiatBalance = profileBlock.querySelector('#user-fiat-balance');
const userProfileName = profileBlock.querySelector('.user-profile__name span');

const BalanceType = {
  FIAT: 0,
  CRYPTO: 1,
};

let profileData;

const setProfileData = (userData) => {
  profileData = userData;
  const {userName, balances} = userData;

  userFiatBalance.textContent = balances[BalanceType.FIAT].amount;
  userCryptoBalance.textContent = balances[BalanceType.CRYPTO].amount;
  userProfileName.textContent = userName;
};

const getProfileData = () => profileData;

export { setProfileData, getProfileData, BalanceType };
