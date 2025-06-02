const MAP_ZOOM = 10;

const map = L.map('map')
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

export { map };
