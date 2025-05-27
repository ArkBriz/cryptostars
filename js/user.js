const profileBlock = document.querySelector('.user-profile');
const userCryptoBalance = profileBlock.querySelector('#user-crypto-balance');
const userFiatBalance = profileBlock.querySelector('#user-fiat-balance');
const userProfileName = profileBlock.querySelector('.user-profile__name span');

let profileData;

const setProfileData = (userData) => {
  profileData = userData;
  const {userName, balances} = userData;

  userFiatBalance.textContent = balances[0].amount;
  userCryptoBalance.textContent = balances[1].amount;
  userProfileName.textContent = userName;
};

const hideProfileBlock = () => {
  profileBlock.style.display = 'none';
};

const getProfileData = () => profileData;

export { setProfileData, getProfileData, hideProfileBlock };
