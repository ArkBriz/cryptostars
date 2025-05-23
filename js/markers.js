// для передачи списка пользователей использую функцию
// для выделения только тех, у кого есть cash in person тоже будет функция, которая вернет массив их таких пользователей
// далее этот массив передаем в forEach и отрисовываем маркеры
// также добавить кастомную иконку
// добавить функцию для использования шаблона

import { map } from "./map.js";

let users = [];

const getUsers = (data) => {
  users = [...data];
  showMarkers();
};

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [36, 46],
  iconAncor: [19, 46],
});

const iconVerified = L.icon({
  iconUrl: './img/pin-verified.svg',
  iconSize: [36, 46],
  iconAncor: [19, 46],
});

const showMarkers = () => {
  const cashSellers = users.filter((user) =>
    user.status === 'seller' &&
    user.paymentMethods.some((method) => method.provider === 'Cash in person')
  );

  cashSellers.forEach((seller) => {
    const { lat, lng } = seller.coords;
    const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: seller.isVerified ? icon : iconVerified
    },
  );

    marker.addTo(map);
  })
};

export { getUsers };
