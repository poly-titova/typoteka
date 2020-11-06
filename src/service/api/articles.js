'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);

const route = new Router();

module.exports = (app, articleService) => {
  app.use(`/articles`, route);

  // возвращает список публикаций
  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK)
      .json(articles);
  });

  // возвращает полную информацию публикации
  route.get(`/:articleId`, (req, res) => {
    // идентификатор желаемой публикации получаем из параметров
    const { articleId } = req.params;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен 
    // полную информацию о публикации
    const article = articleService.findOne(articleId);

    // если будет запрошенна информация о несуществующей публикации
    if (!article) {
      // мы отреагируем соответствующим кодом — 404
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  // создаёт новую публикацию
  route.post(`/`, articleValidator, (req, res) => {
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод create, который должен 
    // создать новую публикацию
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });
};
