const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);

const { HttpCode } = require(`../../constants`);

const mockData = [
  {
    "user": `ivanov@example.com`,
    "id": "p7cWcB",
    "title": "Ложка-поварёжка — нужный инструмент",
    "createdDate": "2020-10-21 22:42:03",
    "announce": "Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
    "fullText": "Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Еду надо примимать как минимум три раза. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Только преобретя их, я чувствую себя чудочеловеком. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.",
    "category": [
      "Еда",
      "Без рамки",
      "Музыка"
    ],
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": "Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        "id": "w1Rlr9"
      },
      {
        "user": `ivanov@example.com`,
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        "id": "6Fgh6H"
      },
      {
        "user": `petrov@example.com`,
        "text": "Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы!",
        "id": "VWbqiC"
      }
    ]
  },
  {
    "user": `petrov@example.com`,
    "id": "W1aSyl",
    "title": "Борьба с прокрастинацией",
    "createdDate": "2020-10-15 18:46:47",
    "announce": "Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Только преобретя их, я чувствую себя чудочеловеком. Программировать не настолько сложно, как об этом говорят.",
    "fullText": "Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Еду надо примимать как минимум три раза. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.",
    "category": [
      "Рисование",
      "Еда"
    ],
    "comments": [
      {
        "user": `ivanov@example.com`,
        "text": "Это где ж такие красоты? Согласен с автором!",
        "id": "DY2RST"
      }
    ]
  },
  {
    "user": `ivanov@example.com`,
    "id": "AofwlE",
    "title": "Учим HTML и CSS",
    "createdDate": "2020-09-04 15:40:06",
    "announce": "Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    "fullText": "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха.",
    "category": [
      "За жизнь",
      "Железо",
      "Кино",
      "Еда"
    ],
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        "id": "M2K9h-"
      },
      {
        "user": `ivanov@example.com`,
        "text": "Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        "id": "yaKT4W"
      }
    ]
  },
  {
    "user": `petrov@example.com`,
    "id": "qrbGtF",
    "title": "Ёлки. История деревьев",
    "createdDate": "2020-09-03 01:18:42",
    "announce": "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
    "fullText": "Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Еду надо примимать как минимум три раза. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    "category": [
      "Без рамки"
    ],
    "comments": [
      {
        "user": `ivanov@example.com`,
        "text": "Планируете записать видосик на эту тему? Это где ж такие красоты?",
        "id": "8a1Jj9"
      }
    ]
  },
  {
    "user": `ivanov@example.com`,
    "id": "cF1d1H",
    "title": "Борьба с прокрастинацией",
    "createdDate": "2020-10-10 00:43:23",
    "announce": "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой.",
    "fullText": "Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Как начать действовать? Для начала просто соберитесь. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.",
    "category": [
      "Кино"
    ],
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        "id": "CGQrTA"
      },
      {
        "user": `ivanov@example.com`,
        "text": "Совсем немного... Хочу такую же футболку :-)",
        "id": "jtJUHG"
      },
      {
        "user": `petrov@example.com`,
        "text": "Плюсую, но слишком много буквы!",
        "id": "MK7KW7"
      }
    ]
  }
]

const mockDB = new Sequelize(`sqlite::memory:`, { logging: false });

const app = express();
app.use(express.json());
beforeAll(async () => {
  await initDB(mockDB, { categories: mockCategories, articles: mockArticles });
  search(app, new DataService(mockDB));
});

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Ложка-поварёжка — нужный инструмент`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`p7cWcB`));

  test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
  );

  test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
  );
});
