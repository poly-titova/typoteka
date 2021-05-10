'use strict';

// Подключение getRandomDate
const { getRandomDate } = require(`../../getRandomDate`);

// Подключаем модуль `fs`
const fs = require(`fs`).promises;

// Подключение chalk
const chalk = require(`chalk`);

// Подключение модулей
const { getLogger } = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

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

const logger = getLogger({});

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
const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

// Основная функция для формирования случайного массива
const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
      ...items.splice(
        getRandomInt(0, items.length - 1), 1
      )
    );
  }
  return result;
};

// Основная функция для формирования объявлений
const generateArticles = (count, CATEGORIES, SENTENCES, TITLES, COMMENTS) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(),
    picture: getPictureFilename(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    announce: shuffle(SENTENCES).slice(ANNOUNCE_SENTENCES_RESTRICT.min, ANNOUNCE_SENTENCES_RESTRICT.max).join(` `),
    fullText: shuffle(SENTENCES.slice()).slice(getRandomInt(0, SENTENCES.length - 1)).join(` `),
    categories: getRandomSubarray(CATEGORIES),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

// Опишем заготовку для новой команды
module.exports = {
  name: `--filldb`,
  // Описание метода
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const CATEGORIES = await readFiles(pathCategories);
    const SENTENCES = await readFiles(pathSentences);
    const TITLES = await readFiles(pathTitles);
    const COMMENTS = await readFiles(pathComments);

    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const articles = generateArticles(countArticle, TITLES, CATEGORIES, SENTENCES, COMMENTS);

    return initDatabase(sequelize, { articles, categories });
  }
};
