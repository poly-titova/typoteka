const axios = require(`axios`);

class API {
  constructor(baseURL, timeout){
    // создадим экземпляр axios
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  // общий приватный метод для загрузки данных
  async _load(url, options){
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  // методы для получения и отправки данных
  getArticles(){
    return this._load('/articles'); 
  }

  getArticle(id){
    return this._load(`/articles/${id}`);
  }

  search(query){
    return this._load(`/search`, {params: {query}});
  }

  async getCategories(){
    return this._load('/category');
  }

  async createArticle(data){
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }
}
