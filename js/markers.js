import { map } from "./map.js";
import { onlyChecked } from "./sorting.js";
import { formatNumber } from "./util.js";
import { openModal, setUserData } from "./modal.js";
import { getProfileData } from "./user.js";

const markersGroup = L.layerGroup().addTo(map);
const markerPopupTemplate = document.querySelector('#map-baloon__template')
  .content.querySelector('.user-card');
const modal = document.querySelector('.modal');
const modalDescription = modal.querySelector('.modal__description');
const walletNumberBlock = modal.querySelector('#wallet-number');
const walletNumberInput = walletNumberBlock.querySelector('input');

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
  };

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
    openModal();
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
      { icon: seller.isVerified ? iconVerified : icon },
    )
    .bindPopup(createMarkerPopup(seller));

    markersGroup.addLayer(marker);
  })
};

const updateMarkers = () => {
  showMarkers();
};

export { getUsers, updateMarkers };
