import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = {
  key: '49355742-bd7d44539c0e651abd52850bf',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function fetchPhotos(searchQuery) {
  searchParams.q = searchQuery;
  return axios
    .get(`?${new URLSearchParams(searchParams)}`)
    .then(response => response)
    .catch(error => error);
}
