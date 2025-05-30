const serverUnavailableMessage = document.querySelector('#server-unavailable-message');
const userListContainer = document.querySelector('.user-list-container');
const profileBlock = document.querySelector('.user-profile');

const showErrorMessage = () => {
  serverUnavailableMessage.style.display = '';
  userListContainer.style.display = 'none';
  profileBlock.style.display = 'none';
};

export { showErrorMessage };
