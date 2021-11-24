export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
   }
  
searchPictures() {
  
  const URL = `https://pixabay.com/api/?key=24469743-af1bc0463689ec6840cc2fde9&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    

  return fetch(URL).then(r => r.json()).then(({ totalHits, hits }) => {
    this.incrementPage();
    console.log(totalHits)
    // let arrayData = [];
    
    // arrayData.push(totalHits, hits);
    // console.log(arrayData[1]);
    // console.log(arrayData[0])
   
    return hits;
  })
  }

  incrementPage() {
this.page += 1;
  }
  resetPage() {
this.page = 1;
  }
  get query() {
    console.log(this.searchQuery);
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
}
}