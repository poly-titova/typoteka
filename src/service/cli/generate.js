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

// Первым шагом опишем все необходимые константы
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const ANNOUNCE_SENTENCES_RESTRICT = {
  min: 1,
  max: 5
};
const FILE_NAME = `mocks.json`;

// Основная функция для формирования объявлений
const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(SENTENCES.slice()).slice(ANNOUNCE_SENTENCES_RESTRICT.min, ANNOUNCE_SENTENCES_RESTRICT.max).join(` `),
    fullText: shuffle(SENTENCES.slice()).slice(getRandomInt(0, SENTENCES.length - 1)).join(` `),
    category: shuffle(CATEGORIES.slice()).slice(getRandomInt(0, CATEGORIES.length - 1)),
  }))
);

// Функция из модуля fs
const makeMockData = async (filename, content) => {
  try {
    await fs.writeFile(filename, content);
    console.log(chalk.green(`The file has been saved!`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file`));
  } 
};

// Опишем заготовку для новой команды
module.exports = {
  name: `--generate`,
  // Описание метода
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    if (count > MAX_COUNT) {
      return console.log(chalk.red(`Не больше ${MAX_COUNT} публикаций.`));
    }

    makeMockData(FILE_NAME, content);
  }
};
