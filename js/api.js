const getUserData = (onSuccess) => {
  fetch('https://cryptostar.grading.htmlacademy.pro/user')
    .then((response) => response.json())
    .then((userData) => {
      console.log(userData);
      onSuccess(userData);
    })
    .catch(() => {
      console.log('Ошибка!');
    });
};

const getContractorsData = () => {
  fetch('https://cryptostar.grading.htmlacademy.pro/contractors')
    .then((response) => response.json())
    .then((contractorsData) => {
      console.log(contractorsData);
    })
    .catch(() => {
      console.log('Ошибка!');
    });
};

export { getUserData, getContractorsData };
