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
  const categories = await api.getCategories();
  res.render(`new-post`, { categories });
});

articlesRoutes.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const { body } = req;
  const articleData = {
    title: body.title,
    createdDate: body.date,
    category: body.category || [],
    announce: body.announcement,
    fullText: body[`full-text`],
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
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

articlesRoutes.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRoutes;