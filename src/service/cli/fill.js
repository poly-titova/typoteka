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
const PictureRestrict = {
  min: 0,
  max: 16
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

// Основная функция для формирования изображений
const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

// Основная функция для формирования объявлений
const generateArticles = (count, titles, categoryCount, userCount, sentences, comments) => (
  Array(count).fill({}).map((_, index) => ({
    category: [getRandomInt(1, categoryCount)],
    created_at: getRandomDate(),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
    announce: shuffle(sentences).slice(ANNOUNCE_SENTENCES_RESTRICT.min, ANNOUNCE_SENTENCES_RESTRICT.max).join(` `),
    full_text: shuffle(sentences).slice(getRandomInt(0, sentences.length - 1)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
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

    // Заранее заданные пользователи
    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`
      }
    ];

    // Преображажение массивов в строки
    const articles = generateArticles(countArticle, titles, categories.length, users.length, sentences, commentSentences);

    const comments = articles.flatMap((article) => article.comments);

    const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: article.category[0]}));

    const userValues = users.map(
        ({email, passwordHash, firstName, lastName, avatar}) =>
          `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles.map(
        ({title, announce, full_text, picture, userId, created_at}) =>
          `('${title}', '${announce}', '${full_text}', '${picture}', ${userId}, '${created_at}')`
    ).join(`,\n`);

    const articleCategoryValues = articleCategories.map(
        ({articleId, categoryId}) =>
          `(${articleId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, articleId}) =>
          `('${text}', ${userId}, ${articleId})`
    ).join(`,\n`);

    const content = `
    INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
    ${userValues};
    INSERT INTO categories(name) VALUES
    ${categoryValues};
    ALTER TABLE articles DISABLE TRIGGER ALL;
    INSERT INTO articles(title, announce, full_text, picture, user_id, created_at) VALUES
    ${articleValues};
    ALTER TABLE articles ENABLE TRIGGER ALL;
    ALTER TABLE article_categories DISABLE TRIGGER ALL;
    INSERT INTO article_categories(article_id, category_id) VALUES
    ${articleCategoryValues};
    ALTER TABLE article_categories ENABLE TRIGGER ALL;
    ALTER TABLE comments DISABLE TRIGGER ALL;
    INSERT INTO COMMENTS(text, user_id, article_id) VALUES
    ${commentValues};
    ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));          
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
