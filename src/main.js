import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { createMarkup, gallery, loader, lightbox } from './js/render-functions';
const form = document.querySelector('.form');
const btn_load = document.querySelector('.btn-load-js');

btn_load.style = 'display: none';
loader.classList.toggle('loader');

let searchQuery = '';
let page = 1;

form.addEventListener('submit', renderPhotos);
btn_load.addEventListener('click', getMorePhotos);

async function renderPhotos(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.search_text.value.trim();
  page = 1;
  if (!searchQuery) {
    iziToast.error({
      message: 'Search field must not be empty!',
      position: 'topRight',
    });
    return;
  }
  gallery.innerHTML = '';
  loader.classList.toggle('loader');
  try {
    const data = await fetchPhotos(searchQuery, page);
    if (data.totalHits === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      btn_load.style = 'display: none';
      return;
    }
    createMarkup(data.hits);
    if (data.totalHits < 15) {
      btn_load.style = 'display: none';
      return;
    }
    btn_load.style = 'display: block';
  } catch (error) {
    loader.innerHTML = 'Oops... something went wrong';
  } finally {
    loader.classList.toggle('loader');
    lightbox.refresh();
  }
}

async function getMorePhotos() {
  page += 1;
  loader.classList.toggle('loader');
  const card = document.querySelector('.gallery>li');
  const cardHeight = card.getBoundingClientRect().height;
  try {
    const data = await fetchPhotos(searchQuery, page);
    if (data.totalHits > 15 * page) {
      createMarkup(data.hits);
      scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    } else {
      btn_load.style = 'display: none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    loader.innerHTML = 'Oops... something went wrong';
  } finally {
    loader.classList.toggle('loader');
    lightbox.refresh();
  }
}
