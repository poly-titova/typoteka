'use strict';

const { Router } = require(`express`);
const articles = require(`../api/articles`);
const category = require(`../api/category`);

const getMockData = require(`../lib/get-mock-data`);

const {
  ArticlesService,
  CategoryService,
} = require(`../data-service`);

const app = new Router();
(async () => {
  const mockData = await getMockData();

  articles(app, new ArticlesService(mockData));
  category(app, new CategoryService(mockData));
})();

module.exports = app;