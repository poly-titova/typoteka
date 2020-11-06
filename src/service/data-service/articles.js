'use strict';

const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../../constants`)

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

  // метод который создаёт новую публикацию
  // полученные данные мы просто добавляем в массив — хранилище
  create(article) {
    const newArticle = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }
};

module.exports = ArticlesService;