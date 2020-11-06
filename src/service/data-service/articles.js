'use strict';

class ArticlesService {
  // конструктор принимает данные о всех публикациях
  // и сохраняет их в одноимённое приватное свойство
  constructor(articles) {
    this._articles = articles;
  }

  // метод который возвращает все публикации
  findAll() {
    return this._articles
  }

  // метод который возвращает полную информацию о публикации
  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }
};

module.exports = ArticlesService;