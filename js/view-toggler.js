import { map } from "./map.js";

const togglersBlock = document.querySelector('.tabs--toggle-list-map');
const togglers = togglersBlock.querySelectorAll('button[data-tabs="control"]');

const views = {
  list: document.querySelector('.users-list'),
  map: document.querySelector('.map-container'),
};

const toggleView = (view) => {
  togglers.forEach((toggler) => {
    toggler.classList.toggle('is-active', toggler.dataset.view === view);
  });

  for (const [key, elem] of Object.entries(views)) {
    if (elem) {
      elem.style.display = key === view ? '' : 'none';
    }
  };

  if (view === 'map') {
    setTimeout(() => map.invalidateSize(), 0);
  }
};

togglersBlock.addEventListener('click', (evt) => {
  const clickedToggler = evt.target.closest('button[data-tabs="control"]');
  if (!clickedToggler) {
    return;
  };

  const view = clickedToggler.dataset.view;
  toggleView(view);
});
