import { renderUsersList } from "./users-list.js";
import { updateMarkers } from './markers.js';

const sortingTabsBlock = document.querySelector('.tabs--toggle-buy-sell');
const tabButtons = sortingTabsBlock.querySelectorAll('button[data-tabs="control"]');
const checkbox = document.querySelector('#checked-users');

let users = [];
let currentStatus = 'seller';
let onlyChecked = false;

const updateUserList = () => {
  let sortedUsers = users.filter((user) => user.status === currentStatus);

  if (onlyChecked) {
    sortedUsers = sortedUsers.filter((user) => user.isVerified);
  };

  renderUsersList(sortedUsers);
}

const sortUsers = (userStatus) => {
  currentStatus = userStatus;

  tabButtons.forEach((tabButton) => {
    const buttonText = tabButton.textContent.trim().toLowerCase();
    const isBuyTab = buttonText === 'купить';
    const isSellTab = buttonText === 'продать';

    const isActive =
      (userStatus === 'seller' && isBuyTab) ||
      (userStatus === 'buyer' && isSellTab);

      tabButton.classList.toggle('is-active', isActive);
  });

  updateUserList();
};

const initSorting = (data) => {
  users = [...data];

  tabButtons.forEach((tabButton) => {
    const tabButtonText = tabButton.textContent.trim().toLowerCase();
    const userStatus = tabButtonText === 'купить' ? 'seller' : 'buyer';
    tabButton.dataset.status = userStatus;

    tabButton.addEventListener('click', () => sortUsers(tabButton.dataset.status));
  });

  checkbox.addEventListener('change', () => {
    onlyChecked = checkbox.checked;
    updateUserList();
    updateMarkers();
  });

  sortUsers(currentStatus);
}

export { initSorting, onlyChecked, currentStatus };
