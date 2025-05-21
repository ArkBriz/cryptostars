const getUserData = (onSuccess, onFail) => {
  fetch('https://cryptostar.grading.htmlacademy.pro/user')
    .then((response) => response.json())
    .then((userData) => {
      onSuccess(userData);
    })
    .catch(() => {
      onFail();
    });
};

const getContractorsData = (onSuccess) => {
  fetch('https://cryptostar.grading.htmlacademy.pro/contractors')
    .then((response) => response.json())
    .then((contractorsData) => {
      onSuccess(contractorsData);
    })
    .catch(() => {
      console.log('Ошибка!');
    });
};

export { getUserData, getContractorsData };
