import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = {
  key: '49355742-bd7d44539c0e651abd52850bf',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

export async function fetchPhotos(searchQuery, page) {
  searchParams.q = searchQuery;
  searchParams.page = page;
  try {
    const response = await axios.get(`?${new URLSearchParams(searchParams)}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
