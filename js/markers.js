
// добавить функцию для использования шаблона, подставить в эту функцию актуальные данные пользователей
// отрисовать балуны, передав эту функцию в метод bindPopup

import { map } from "./map.js";
import { onlyChecked } from "./sorting.js";

const markersGroup = L.layerGroup().addTo(map);
const markerPopupTemplate = document.querySelector('#map-baloon__template')
  .content.querySelector('.user-card');

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

const createMarkerPopup = (seller) => {
  const {userName, balance, exchangeRate, isVerified, minAmount, paymentMethods} = seller;
  const markerPopup = markerPopupTemplate.cloneNode(true);
  const sellerBadgesList = markerPopup.querySelector('.user-card__badges-list');
  const sellerBadgeItem = sellerBadgesList.querySelector('.badge');
  sellerBadgesList.innerHTML = '';

  if (!isVerified) {
    markerPopup.querySelector('svg').remove();
  };

  markerPopup.querySelector('.user-card__user-name span').textContent = userName;
  markerPopup.querySelector('.exchange-rate').textContent = `${Number(exchangeRate.toFixed(0)).toLocaleString('ru-RU')} ₽`;
  markerPopup.querySelector('.user-card__min-cashlimit').textContent = `${Number((minAmount * exchangeRate).toFixed(0)).toLocaleString('ru-RU')} -`;
  markerPopup.querySelector('.user-card__max-cashlimit').textContent = ` ${Number((balance.amount * exchangeRate).toFixed(0)).toLocaleString('ru-RU')} ₽`;

  paymentMethods.forEach((method) => {
    const sellerBadge = sellerBadgeItem.cloneNode(true);
    sellerBadge.textContent = `${method.provider}`;
    sellerBadgesList.append(sellerBadge);
  });

  return markerPopup;
};

const showMarkers = () => {
  markersGroup.clearLayers();

  const cashSellers = users.filter((user) =>
    user.status === 'seller' &&
    user.paymentMethods.some((method) => method.provider === 'Cash in person' &&
      (!onlyChecked || user.isVerified))
  );

  cashSellers.forEach((seller) => {
    const { lat, lng } = seller.coords;
    const marker = L.marker(
      { lat, lng },
      { icon: seller.isVerified ? icon : iconVerified },
    )
    .bindPopup(createMarkerPopup(seller));

    markersGroup.addLayer(marker);
  })
};

const updateMarkers = () => {
  showMarkers();
};

export { getUsers, updateMarkers };
