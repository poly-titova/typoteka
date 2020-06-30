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

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого год`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  'Деревья',
  'За жизнь',
  'Без рамки',
  'Разное',
  'IT',
  'Музыка',
  'Кино',
  'Программирование',
  'Железо'
];

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
