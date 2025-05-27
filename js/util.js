const isEscKey = (evt) => evt.key === 'Escape';

const formatNumber = (number) => Number(number.toFixed(0)).toLocaleString('ru-RU');

const parseNumber = (string) => parseFloat(string.replace(/\s/g, '').replace(',', '.'));

const floorToHundredths = (value) => Math.floor(value * 100) / 100;

export {
  isEscKey,
  formatNumber,
  parseNumber,
  floorToHundredths,
};
