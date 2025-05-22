import { renderUsersList } from "./users-list.js";

const sortingTabsBlock = document.querySelector('.tabs--toggle-buy-sell');
const tabButtons = sortingTabsBlock.querySelectorAll('button[data-tabs]');

let users = [];

const sortUsers = (userStatus) => {
  tabButtons.forEach((tabButton) => {
    if (tabButton.dataset.tabs === userStatus) {
      tabButton.classList.add('is-active');
    } else {
      tabButton.classList.remove('is-active');
    }
  });

  const sortedUsers = users.filter((user) => user.status === userStatus);
  renderUsersList(sortedUsers);
};

const initSorting = (data) => {
  users = [...data];

  tabButtons.forEach((tabButton) => {
    const userStatus = tabButton.dataset.tabs;
    tabButton.addEventListener('click', () => sortUsers(userStatus));
  });

  sortUsers('seller');
}

export { initSorting };
