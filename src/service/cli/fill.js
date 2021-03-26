'use strict';

// Подключение getRandomDate
const {getRandomDate} = require(`../../getRandomDate`);

// Подключаем модуль `fs`
const fs = require(`fs`).promises;

// Подключение chalk
const chalk = require(`chalk`);

// Обращение к utils.js
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

// Подключение файлов с данными
const pathCategories = './data/categories.txt';
const pathSentences = './data/sentences.txt';
const pathTitles = './data/titles.txt';
const pathComments = './data/comments.txt';

// Первым шагом опишем все необходимые константы
const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;
const ANNOUNCE_SENTENCES_RESTRICT = {
  min: 1,
  max: 5
};
const FILE_NAME = `fill-db.sql`;

// Функция для чтения файлов и преобразовании полученных данных в нужном оформлении
const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.split(`\n`);
  } catch (err) {
    console.error(err);
  }
}

// Основная функция для формирования комментариев
const generateComments = (count, articleId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    articleId: articleId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

// Основная функция для формирования объявлений
const generateArticles = (count, titles, categoryCount, userCount, sentences, comments) => (
  Array(count).fill({}).map((_, index) => ({
    category: [getRandomInt(1, categoryCount)],
    created_at: getRandomDate(),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
    announce: shuffle(sentences).slice(ANNOUNCE_SENTENCES_RESTRICT.min, ANNOUNCE_SENTENCES_RESTRICT.max).join(` `),
    full_text: shuffle(sentences).slice(getRandomInt(0, SENTENCES.length - 1)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    userId: getRandomInt(1, userCount)
  }))
);

// Опишем заготовку для новой команды
module.exports = {
  name: `--fill`,
  // Описание метода
  async run(args) {
    const categories = await readFiles(pathCategories);
    const sentences = await readFiles(pathSentences);
    const titles = await readFiles(pathTitles);
    const commentSentences = await readFiles(pathComments);

    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;
  }
};
