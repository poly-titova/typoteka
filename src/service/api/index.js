'use strict';

const { Router } = require(`express`);
const articles = require(`../api/articles`);
const category = require(`../api/category`);
const search = require(`../api/search`);

const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService
} = require(`../data-service`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();

defineModels(sequelize);

(() => {
  category(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
  offer(app, new ArticleService(sequelize), new CommentService(sequelize));
})();

module.exports = app;
