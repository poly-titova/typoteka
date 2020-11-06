'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

const route = new Router();

module.exports = (app, articleService) => {
  app.use(`/articles`, route);

  // возвращает список публикаций
  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK)
      .json(articles);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:articleId`, (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const { articleId } = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен 
    // вернуть информацию по определённому объявлению
    const article = articleService.findOne(articleId);

    // если будет запрошенна информация о несуществующем объявлении
    if (!article) {
      // мы отреагируем соответствующим кодом — 404
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });
};