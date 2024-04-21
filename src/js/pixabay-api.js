import iziToast from "izitoast";
import { Loader } from './render-functions.js';
import axios from 'axios';

export const API_KEY = "43490794-44764587ca88d9eedc273b8a9";
export const BASE_URL = "https://pixabay.com/api/?";
export const PER_PAGE = 15;

export async function fetchImages(searchQuery, page) {
    try {
        Loader.show();
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: searchQuery,
                per_page: PER_PAGE,
                page,
                _image_type: 'photo',
                _orientation: 'horizontal',
                _safesearch: true,
            },
        });
        const data = response.data;
        if (data.hits.length === 0) {
            iziToast.error({
                title: "No Images Found",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            Loader.hide();
            return [];
        }
        Loader.hide();
        return data.hits;
    }
         catch (error) {
            console.log("catch", error);
            iziToast.error({
                title: "Error",
                message: "An error occurred while fetching images. Please try again later.",
                position: "topRight",
            });
            Loader.hide();
        }
    }
