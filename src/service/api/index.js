'use strict';

const {Router} = require(`express`);
const articles = require(`../api/articles`);

const getMockData = require(`../lib/get-mock-data`);

const {
  ArticlesService,
} = require(`../data-service`);

const app = new Router();
(async () => {
  const mockData = await getMockData();

  articles(app, new ArticlesService(mockData));
})();

module.exports = app;