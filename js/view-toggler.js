import { map } from './map.js';
import { updateUserList } from './sorting.js';

const togglersBlock = document.querySelector('.tabs--toggle-list-map');
const togglers = togglersBlock.querySelectorAll('button[data-tabs="control"]');
const noResultsBlock = document.querySelector('#no-results');

const views = {
  list: document.querySelector('.users-list'),
  map: document.querySelector('.map-container'),
};

const DELAY = togglersBlock.dataset.delay;

const toggleView = (view) => {
  togglers.forEach((toggler) => {
    toggler.classList.toggle('is-active', toggler.dataset.view === view);
  });

  for (const [key, elem] of Object.entries(views)) {
    if (elem) {
      elem.style.display = key === view ? '' : 'none';
    }
  }

  if (view === 'map') {
    noResultsBlock.style.display = 'none';
    setTimeout(() => map.invalidateSize(), DELAY);
  } else {
    updateUserList();
  }
};

togglersBlock.addEventListener('click', (evt) => {
  const clickedToggler = evt.target.closest('button[data-tabs="control"]');
  if (!clickedToggler) {
    return;
  }

  const view = clickedToggler.dataset.view;
  toggleView(view);
});
