'use strict'

import './sass/main.scss';
import NewsApiService from './news-Service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import hitsTemplates from './templates/hitsTemplates.hbs';
import LoadMoreBtn from './load-more';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const axios = require('axios').default;

const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});






const searchFormEl = document.getElementById('search-form');
const imagesContainerEl = document.querySelector('.gallery');



searchFormEl.addEventListener('submit', searchElements);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);



function searchElements(evn) {
  evn.preventDefault();

  clearHitsMarkup();

  newsApiService.query = evn.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();
  
  if (newsApiService.query === '') {
    console.log(newsApiService.query)
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return
  }
  
  
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearHitsMarkup();

fetchHits()
}




function fetchHits() {
  
  loadMoreBtn.disable();
  newsApiService.searchPictures().then(data => {
    
    appendHitsMarkup(data);

    loadMoreBtn.enable();
    if (newsApiService.page >2 ) {
      console.log(data)
      const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

   }
  });
  
 
  
}



function appendHitsMarkup(data) {
  console.log(data)
 
  imagesContainerEl.insertAdjacentHTML('beforeend', hitsTemplates(data.hits));
  


  const gallery = new SimpleLightbox('.gallery a',{close:true, closeText:'×',showCounter:true,preloading:true,enableKeyboard:true,docClose:true,disableScroll:true});
  gallery.refresh();

  

  if (data.hits.length < 40 && data.hits.length > 0) {
    loadMoreBtn.hide();
    Notify.info("We're sorry, but you've reached the end of search results.")
  }
  
  if (data.hits.length === 0) {
     loadMoreBtn.hide();
return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  
  }
  if (newsApiService.page === 2 ) {
return Notify.info(`Hooray! We found ${data.totalHits} images`);
 }
 
}


function clearHitsMarkup() {
imagesContainerEl.innerHTML = '';
}

