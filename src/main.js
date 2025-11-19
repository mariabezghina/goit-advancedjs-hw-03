import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGalleryCardTemplate } from './js/render-functions'; 
import {fetchPhotosByQuery} from "./js/pixabay-api";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightboxInstance = null;

const initLightbox = () => {
    // If the instance hasn't been created yet (first time loading gallery), create it.
    if (!lightboxInstance) {
        lightboxInstance = new SimpleLightbox('.js-gallery a', {
            captionDelay: 250, // Delay in milliseconds before the caption appears.
            captionsData: 'alt', // Specify to use the 'alt' attribute of the image for the caption text.
        });
    } else {
        // If the instance already exists, refresh it to include any newly added images in the gallery.
        lightboxInstance.refresh();
    }
}

// Form elements references. Grouping DOM elements here makes them easy to access and manage.
const refs = {
    searchForm: document.querySelector('.js-search-form'), // Reference to the main search form element.
    gallery: document.querySelector('.js-gallery'), // Reference to the container where gallery cards are rendered.
    loader: document.querySelector('.js-loader'),
}

// Handler function executed when the search form is submitted.
const onSearchFormSubmit = event => {
    event.preventDefault(); // Prevent the default form submission and page reload.

    const {target : searchForm} = event;

    const searchedQuery = searchForm.elements.user_query.value.trim()

    if (searchedQuery.length === 0) {
        
            // Display an error notification using iziToast if the query is empty.
            iziToast.show({
            title: "WARNING",
            message: `Search query cannot be empty!`,
            color: 'red',
            position: 'topCenter',

        });

        return; // Stop the function execution if the query is empty.
    }
    refs.gallery.innerHTML = '';

    refs.loader.classList.add('is-active')
    
    // Call the API function to fetch photos based on the user's query.
    fetchPhotosByQuery(searchedQuery)
    .then(data => {
        if (data.hits.length === 0){
            // Display a notification if no images were found for the query.
            iziToast.show({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                color: 'red',
                position: 'topCenter',
            });

            return;
        }

        const galleryCardTemplate = data.hits.map(pictureInfo => createGalleryCardTemplate(pictureInfo)).join('')
        
        // Insert the generated HTML string of gallery cards into the gallery container.
        refs.gallery.innerHTML = galleryCardTemplate
        
        // Initialize or refresh the SimpleLightbox to include the newly rendered images.
        initLightbox();
    })
    // Handle any errors that occur during the fetch process (e.g., network error).
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        refs.loader.classList.remove('is-active');
    })
}

// Attach the event listener to the search form to trigger the submission handler.
refs.searchForm.addEventListener('submit', onSearchFormSubmit)