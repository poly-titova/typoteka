'use strict';

const { Router } = require(`express`);
const myRoutes = new Router();
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);
myRoutes.use(auth);

myRoutes.get(`/`, async (req, res) => {
  const { user } = req.session;
  const articles = await api.getArticles();
  res.render(`my`, { articles, user });
});

myRoutes.get(`/comments`, async (req, res) => {
  const { user } = req.session;
  const articles = await api.getArticles({ comments: true });
  res.render(`comments`, { articles: articles.slice(0, 3), user });
});

module.exports = myRoutes;