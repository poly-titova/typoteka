'use strict';

class SearchService {
  // конструктор принимает данные о всех публикациях
  // и сохраняет их в одноимённое приватное свойство
  constructor(articles) {
    this._articles = articles;
  }

  // метод который возвращает все публикации
  findAll(searchText) {
    return this._articles.
      filter((article) => article.title.includes(searchText));
  }
}

module.exports = SearchService;
