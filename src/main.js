import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { createMarkup, gallery, loader } from './js/render-functions';
const form = document.querySelector('.form');
loader.classList.toggle('loader');

form.addEventListener('submit', renderPhotos);

function renderPhotos(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.search_text.value
    .toLowerCase()
    .trim();
  if (!searchQuery) {
    iziToast.error({
      message: 'Search field must not be empty!',
      position: 'topRight',
    });
    return;
  }
  gallery.innerHTML = '';
  loader.classList.toggle('loader');
  fetchPhotos(searchQuery)
    .then(response => {
      if (response.data.totalHits === 0) {
        loader.classList.toggle('loader');
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createMarkup(response.data.hits);
    })
    .catch(() => {
      loader.classList.toggle('loader');
      loader.innerHTML = 'Oops... something went wrong';
    });
}
