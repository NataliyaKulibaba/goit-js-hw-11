import './sass/main.scss';
import NewsApiService from './news-Service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import hitsTemplates from './templates/hitsTemplates.hbs';
import LoadMoreBtn from './load-more';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// const axios = require('axios').default;

const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});






const searchFormEl = document.getElementById('search-form');
// const loadMoreEl = document.querySelector('.load-more');
const imagesContainerEl = document.querySelector('.gallery');



searchFormEl.addEventListener('submit', searchElements);
// loadMoreEl.addEventListener('click', loadMore);
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
  Notify.info('Hooray! We found totalHits images');
  // const lightbox = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250 });
//   let gallery = ('.photo-card a').simpleLightbox();

// gallery .refresh();
 
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearHitsMarkup();
  //  onScroll();
fetchHits()
}



function fetchHits(hits) {
  console.log(hits);
  loadMoreBtn.disable();
  newsApiService.searchPictures().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
  });
}


function appendHitsMarkup(hits) {
  console.log(hits)
imagesContainerEl.insertAdjacentHTML('beforeend', hitsTemplates(hits) )
}

function clearHitsMarkup() {
imagesContainerEl.innerHTML = '';
}
// const options = {
//   headers: (
//     Autorization:'24469743-af1bc0463689ec6840cc2fde9',
// )
// }

// function onScroll() {
//   const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

// }

 