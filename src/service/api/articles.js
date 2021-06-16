'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const schema = require(`../lib/schema`);
const commentSchema = require(`../lib/comment-schema`);
const validation = require(`../middlewares/validation`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  // возвращает список публикаций
  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await articleService.findPage({limit, offset});
    } else {
      result = await articleService.findAll(comments);
    }
    res.status(HttpCode.OK).json(result);
  });

  // возвращает полную информацию публикации
  route.get(`/:articleId`, async (req, res) => {
    // идентификатор желаемой публикации получаем из параметров
    const { articleId } = req.params;
    const { comments } = req.query;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен 
    // полную информацию о публикации
    const article = await articleService.findOne(articleId, comments);

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
  route.post(`/`, articleValidator, async (req, res) => {
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод create, который должен 
    // создать новую публикацию
    const article = await articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  // редактирует определённую публикацию
  route.put(`/:articleId`, articleValidator, async (req, res) => {
    // идентификатор желаемой публикации получаем из параметров
    const { articleId } = req.params;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен 
    // вернуть полную информацию о публикации
    const updated = await articleService.update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(`Updated`);
  });

  // удаляет определённую публикацию
  route.delete(`/:articleId`, async (req, res) => {
    // идентификатор желаемой публикации получаем из параметров
    const { articleId } = req.params;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен 
    // удалять определённую публикацию
    const article = await articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  // возвращает список комментариев определённой публикации
  route.get(`/:articleId/comments`, articleExist(articleService), async (req, res) => {
    // сохраняем публикацию, чтобы не искать в следующий раз
    const { article } = req.params;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод findAll, который должен 
    // вернуть все комментарии
    const comments = await commentService.findAll(article);

    res.status(HttpCode.OK)
      .json(comments);
  });

  // удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), async (req, res) => {
    // идентификатор желаемого комментария получаем из параметров
    const { commentId } = req.params;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен 
    // удалять определённый комментарий
    const deleted = await commentService.drop(article, commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  // создаёт новый комментарий
  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    // сохраняем публикацию, чтобы не искать в следующий раз
    const { article } = res.locals;
    // пользуемся возможностями сервиса articleService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен 
    // удалять определённый комментарий
    const comment = commentService.create(article, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  // -----
  route.post(`/:articleId/comments`, validation(commentSchema), async (req, res) => {
    const { body } = req;
    res.json({
      message: `A new comment created.`,
      data: body
    });
  });
};
