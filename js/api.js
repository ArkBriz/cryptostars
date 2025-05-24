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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then((contractorsData) => {
      onSuccess(contractorsData);
    })
    .catch((error) => {
      console.error('Ошибка!', error);
    });
};

export { getUserData, getContractorsData };
