'use strict';

const { Router } = require(`express`);
const articlesRoutes = new Router();
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);
const { ensureArray } = require(`../../utils`);
const { changeDateFormat, ensureArray } = require(`../../utils`);

const multer = require(`multer`);
const path = require(`path`);
const { nanoid } = require(`nanoid`);
const csrf = require(`csurf`);
const csrfProtection = csrf();

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({ storage });

articlesRoutes.get(`/category/:id`, (req, res) => {
  const { user } = req.session;
  res.render(`articles-by-category`, { user });
});

articlesRoutes.get(`/add`, auth, csrfProtection, async (req, res) => {
  const { error } = req.query;
  const { user } = req.session;
  const categories = await api.getCategories();
  res.render(`new-post`, { categories, error, user, csrfToken: req.csrfToken() });
});

articlesRoutes.post(`/add`, auth, csrfProtection, upload.single(`avatar`), async (req, res) => {
  const { body } = req;
  const { user } = req.session;
  const articleData = {
    title: body.title,
    createdDate: changeDateFormat(body.date),
    categories: ensureArray(body.category),
    announce: body.announcement,
    fullText: body[`full-text`],
    userId: user.id
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
    res.redirect(`/articles/add?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRoutes.get(`/edit/:id`, auth, csrfProtection, async (req, res) => {
  const { id } = req.params;
  const { error } = req.query;
  const { user } = req.session;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`edit-post`, { id, article, categories, error, user, csrfToken: req.csrfToken() });
});

articlesRoutes.post(`/edit/:id`, auth, csrfProtection, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const { id } = req.params;
  const { user } = req.session;
  const articleData = {
    title: body.title,
    createdDate: changeDateFormat(body.date),
    categories: ensureArray(body.category),
    announce: body.announcement,
    fullText: body[`full-text`],
    userId: user.id
  };

  try {
    await api.editArticle(id, articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`/articles/edit/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRoutes.get(`/:id`, csrfProtection, async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const { error } = req.query;
  const article = await api.getArticle(id, true);
  res.render(`articles/post`, { article, id, user, error, csrfToken: req.csrfToken() });
});

articlesRoutes.post(`/:id/comments`, auth, csrfProtection, async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const { comment } = req.body;

  try {
    await api.createComment(id, { userId: user.id, text: comment });
    res.redirect(`/articles/${id}`);
  } catch (error) {
    res.redirect(`/articles/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = articlesRoutes;
