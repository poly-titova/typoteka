'use strict';

const { Router } = require(`express`);
const myRoutes = new Router();
const api = require(`../api`).getAPI();

myRoutes.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my`, { articles });
}); 
myRoutes.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = myRoutes;