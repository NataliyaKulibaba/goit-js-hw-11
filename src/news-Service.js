const axios = require('axios').default;


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  
 
  
  async searchPictures() {
     
    const axiosOptions = {
        method: 'get',
    url: 'https://pixabay.com/api/',
      params: {
          key: '24469743-af1bc0463689ec6840cc2fde9',
           q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
      },
      
    };

      try {
        const response = await axios( axiosOptions );
        console.log(response)
        const data = response.data;
        console.log(data)
        this.incrementPage();
        return data
    }
    catch (error) {
      console.error(error)
}
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


   // searchPictures() {
  
  //   const URL = `https://pixabay.com/api/?key=24469743-af1bc0463689ec6840cc2fde9&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    

  //   return fetch(URL).then(r => r.json()).then((data) => {
  //     this.incrementPage();

  
  //     return data;
  //   })
  // }
  