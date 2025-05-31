import { map } from './map.js';
import { getOnlyCheckedStatus } from './sorting.js';
import { formatNumber } from './util.js';
import { openModal } from './modal.js';
import { setUserData } from './payment-data.js';

const markersGroup = L.layerGroup().addTo(map);
const markerPopupTemplate = document.querySelector('#map-baloon__template').content.querySelector('.user-card');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal-buy');
const modalDescription = modal.querySelector('.modal__description');
const walletNumberBlock = modal.querySelector('#wallet-number');

let users = [];

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [36, 46],
  iconAncor: [19, 46],
});

const iconVerified = L.icon({
  iconUrl: './img/pin-verified.svg',
  iconSize: [36, 46],
  iconAncor: [18, 46],
});

const createMarkerPopup = (seller) => {
  const {userName, balance, exchangeRate, isVerified, minAmount, paymentMethods} = seller;
  const markerPopup = markerPopupTemplate.cloneNode(true);
  const sellerBadgesList = markerPopup.querySelector('.user-card__badges-list');
  const sellerBadgeItem = sellerBadgesList.querySelector('.badge');
  const exchangeBtn = markerPopup.querySelector('.user-card__change-btn');

  sellerBadgesList.innerHTML = '';
  exchangeBtn.dataset.userId = seller.id;

  if (!isVerified) {
    markerPopup.querySelector('svg').remove();
  }

  markerPopup.querySelector('.user-card__user-name span').textContent = userName;
  markerPopup.querySelector('.exchange-rate').textContent = `${formatNumber(exchangeRate)} ₽`;
  markerPopup.querySelector('.user-card__min-cashlimit').textContent = `${formatNumber(minAmount * exchangeRate)} ₽ -`;
  markerPopup.querySelector('.user-card__max-cashlimit').textContent = ` ${formatNumber(balance.amount * exchangeRate)} ₽`;

  paymentMethods.forEach((method) => {
    const sellerBadge = sellerBadgeItem.cloneNode(true);
    sellerBadge.textContent = `${method.provider}`;
    sellerBadgesList.append(sellerBadge);
  });

  exchangeBtn.addEventListener('click', () => {
    modalDescription.textContent = 'Покупка криптовалюты';
    walletNumberBlock.style.order = '0';

    setUserData(seller);
    modalForm.querySelector('.custom-input__unit--sent').textContent = '₽';
    modalForm.querySelector('.custom-input__unit--got').textContent = 'KEKS';

    openModal();
  });

  return markerPopup;
};

const showMarkers = () => {
  markersGroup.clearLayers();

  if (users.length === 0) {
    return;
  }

  const cashSellers = users.filter((user) =>
    user.status === 'seller' &&
    user.paymentMethods.some((method) => method.provider === 'Cash in person' &&
      (!getOnlyCheckedStatus() || user.isVerified))
  );

  cashSellers.forEach((seller) => {
    const { lat, lng } = seller.coords;
    const marker = L.marker(
      { lat, lng },
      { icon: seller.isVerified ? iconVerified : icon },
    ).bindPopup(createMarkerPopup(seller));

    markersGroup.addLayer(marker);
  });
};

const getUsers = (data) => {
  users = [...data];
  showMarkers();
};

const updateMarkers = () => {
  showMarkers();
};

export { getUsers, updateMarkers };
