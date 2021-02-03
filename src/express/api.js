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
}
