import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup, Loader } from './js/render-functions.js';

const API_KEY = "43490794-44764587ca88d9eedc273b8a9";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader-backdrop");

let searchQuery = "";
let page = 1;
let totalHits = 0;

searchForm.addEventListener("submit", onSubmitForm);
loadMoreBtn.addEventListener("click", onLoadMoreBtnClick);

async function onSubmitForm(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.query.value.trim();
  page = 1;
  gallery.innerHTML = "";
  loadMoreBtn.hidden = true;

  try {
    const data = await fetchImages(searchQuery, page);
    renderImages(data);
    loadMoreBtn.hidden = data.totalHits <= PER_PAGE;
    totalHits = data.totalHits;
  } catch (error) {
    console.log("catch", error);
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching images. Please try again later.",
      position: "topRight",
    });
  }
}

async function onLoadMoreBtnClick() {
  page += 1;

  try {
    const data = await fetchImages(searchQuery, page);
    renderImages(data);
    loadMoreBtn.hidden = page * PER_PAGE >= totalHits;
    smoothScroll();
  } catch (error) {
    console.log("catch", error);
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching images. Please try again later.",
      position: "topRight",
    });
  }
}

function renderImages(data) {
  if (data.hits.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  if (page === 1 && data.totalHits > 0) {
    loadMoreBtn.hidden = false;
  }

  if (page * PER_PAGE >= data.totalHits) {
    iziToast.info({
      title: 'End of search results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    loadMoreBtn.hidden = true;
  }

  const markup = createMarkup(data.hits);
  gallery.insertAdjacentHTML('beforeend', markup);
  instance.refresh();
}


async function fetchImages(searchQuery, page) {
  try {
    loader.classList.remove('hidden');
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });
    const data = response.data;
    loader.classList.add('hidden');
    return data;
  } catch (error) {
    console.log("catch", error);
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching images. Please try again later.",
      position: "topRight",
    });
    loader.classList.add('hidden');
  }
}

const instance = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 200,
});

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  const galleryItemHeight = galleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}
