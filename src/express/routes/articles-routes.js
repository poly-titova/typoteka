'use strict';

const { Router } = require(`express`);
const articlesRoutes = new Router();
const api = require(`../api`).getAPI();
const { changeDateFormat } = require(`../../utils`);

const multer = require(`multer`);
const path = require(`path`);
const { nanoid } = require(`nanoid`);

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

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

articlesRoutes.get(`/add`, async (req, res) => {
  const { error } = req.query;
  const categories = await api.getCategories();
  res.render(`new-post`, { categories, error });
});

articlesRoutes.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const { body } = req;
  const articleData = {
    title: body.title,
    createdDate: body.date,
    categories: body.category || [],
    announce: body.announcement,
    fullText: body[`full-text`],
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
    res.redirect(`/articles/add?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`edit-post`, { article, categories });
});

articlesRoutes.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const offer = await api.getOffer(id, true);
  res.render(`offers/ticket`, { offer });
});

module.exports = articlesRoutes;
