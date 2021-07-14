'use strict';

const { Router } = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();
const upload = require(`../middlewares/upload`);

const ARTICLES_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
  const { user } = req.session;
  // получаем номер страницы
  let { page = 1 } = req.query;
  page = +page;

  // количество запрашиваемых объявлений равно количеству объявлений на странице
  const limit = ARTICLES_PER_PAGE;

  // количество объявлений, которое нам нужно пропустить - это количество объявлений на предыдущих страницах
  const offset = (page - 1) * ARTICLES_PER_PAGE;
  const [
    { count, articles },
    categories
  ] = await Promise.all([
    api.getArticles({ limit, offset }),
    api.getCategories(true)
  ]);

  // количество страниц — это общее количество объявлений, поделённое на количество объявлений на странице (с округлением вверх)
  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  // передадим все эти данные в шаблон
  res.render(`main`, { articles, categories, page, totalPages, user });
});

mainRoutes.get(`/register`, (req, res) => {
  const { error } = req.query;
  const { user } = req.session;
  res.render(`sign-up`, { error, user });
});

mainRoutes.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const userData = {
    avatar: file.filename,
    name: body[`user-name`],
    email: body[`user-email`],
    password: body[`user-password`],
    passwordRepeated: body[`user-password-again`]
  };
  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (error) {
    res.redirect(`/register?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRoutes.get(`/login`, (req, res) => {
  const { error } = req.query;
  res.render(`login`, { error });
});

mainRoutes.post(`/login`, async (req, res) => {
  try {
    const user = await api.auth(req.body[`user-email`], req.body[`user-password`]);
    req.session.user = user;
    res.redirect(`/`);
  } catch (error) {
    res.redirect(`/login?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRoutes.get(`/logout`, (req, res) => {
  delete req.session.user;
  res.redirect(`/`);
});

mainRoutes.get(`/search`, async (req, res) => {
  try {
    const { search } = req.query;
    const results = await api.search(search);

    res.render(`search`, {
      results
    });
  } catch (error) {
    res.render(`search`, {
      results: []
    });
  }
});
mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRoutes;