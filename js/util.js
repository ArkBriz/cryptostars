const isEscKey = (evt) => evt.key === 'Escape';

const formatNumber = (number) => Number(number.toFixed(0)).toLocaleString('ru-RU');

export { isEscKey, formatNumber };
