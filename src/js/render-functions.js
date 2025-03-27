import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
export const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery li a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createMarkup(images) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        tags,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<li class="gallery-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" class="card-image" width="360" height="152" />
          <ul class="card-caption">
            <li class="image-tag"><p>Likes<br />${likes}</p></li>
            <li class="image-tag"><p>Views<br />${views}</p></li>
            <li class="image-tag"><p>Comments<br />${comments}</p></li>
            <li class="image-tag"><p>Downloads<br />${downloads}</p></li>
          </ul>
        </a>
      </li>`;
    })
    .join('');
  loader.classList.toggle('loader');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
