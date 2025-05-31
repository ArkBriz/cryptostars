const getUserData = (onSuccess, onFail) => {
  fetch('https://cryptostar.grading.htmlacademy.pro/user')
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
  fetch('https://cryptostar.grading.htmlacademy.pro/contractors')
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
    'https://cryptostar.grading.htmlacademy.pro/',
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
