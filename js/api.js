const API_USER_URL = 'https://cryptostar.grading.htmlacademy.pro/user';
const API_CONTRACTORS_URL = 'https://cryptostar.grading.htmlacademy.pro/contractors';
const API_SUBMIT_URL = 'https://cryptostar.grading.htmlacademy.pro/';

const getUserData = (onSuccess, onFail) => {
  fetch(API_USER_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((userData) => {
      onSuccess(userData);
    })
    .catch(() => {
      onFail();
    });
};

const getContractorsData = (onSuccess, onFail) => {
  fetch(API_CONTRACTORS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((contractorsData) => {
      onSuccess(contractorsData);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => (
  fetch(
    API_SUBMIT_URL,
    {
      method: 'POST',
      body
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    onFail();
  })
);

export { getUserData, getContractorsData, sendData };
