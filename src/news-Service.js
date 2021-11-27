const axios = require('axios').default;


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  
  // searchPictures() {
  
  //   const URL = `https://pixabay.com/api/?key=24469743-af1bc0463689ec6840cc2fde9&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    

  //   return fetch(URL).then(r => r.json()).then((data) => {
  //     this.incrementPage();

  
  //     return data;
  //   })
  // }
  
  
  async searchPictures() {
    const url = 'https://pixabay.com/api/';
    const axiosOptions = {
        method: 'get',
    
        params: {            
           q: `${this.searchQuery}`,
        image_type: photo,
        orientation: horizontal,
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
      },
         headers: {
        'Content-Type': 'application/json',
        Autorization: '24469743-af1bc0463689ec6840cc2fde9'
      }
    };

      try {
        
        const response = await axios(url, { axiosOptions });
        console.log(response)
        const data = response.data;
console.log(data)
        return data
    }
    catch (error) {
      console.error(error)
      Notify.warning("Sorry, there are no images matching your search query. Please try again.");
}
  }
  



    // return axios.get(`https://pixabay.com/api/?key=24469743-af1bc0463689ec6840cc2fde9&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
      
      

    // return axios.get('https://pixabay.com/api/', {
    //   param: {
    //     q: `${this.searchQuery}`,
    //     image_type: photo,
    //     orientation: horizontal,
    //     safesearch: true,
    //     page: `${this.page}`,
    //     per_page: 40,
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Autorization: '24469743-af1bc0463689ec6840cc2fde9'
    //   }
    // })


    // .then((data) => {
    //   this.incrementPage();
    //   console.log(data)
   
    //   return data;

    // })


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
