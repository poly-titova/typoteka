"use strict";

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const { HttpCode } = require(`../../constants`);

const mockData = [
  {
    "id": "ohgKVY",
    "title": "Что такое золотое сечение",
    "createdDate": "2020-09-16 09:29:49",
    "announce": "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "fullText": "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Еду надо примимать как минимум три раза. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    "category": [
      "Рисование",
      "Кино"
    ],
    "comments": [
      {
        "text": "Совсем немного... Хочу такую же футболку :-)",
        "id": "51Nz-E"
      },
      {
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        "id": "FURmIl"
      },
      {
        "text": "Плюсую, но слишком много буквы!",
        "id": "HGPrY0"
      }
    ]
  },
  {
    "id": "u0Vb3N",
    "title": "Лучшие рок-музыканты 20-века",
    "createdDate": "2020-09-31 05:51:44",
    "announce": "Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.",
    "fullText": "Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Только преобретя их, я чувствую себя чудочеловеком. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь.",
    "category": [
      "Еда",
      "Железо"
    ],
    "comments": [
      {
        "text": "Планируете записать видосик на эту тему? Совсем немного...",
        "id": "ItHjUU"
      },
      {
        "text": "Плюсую, но слишком много буквы!",
        "id": "ns1vf-"
      }
    ]
  },
  {
    "id": "G4O6lY",
    "title": "Ёлки. История деревьев",
    "createdDate": "2020-09-14 03:13:34",
    "announce": "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Это один из лучших рок-музыкантов.",
    "fullText": "Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Еду надо примимать как минимум три раза. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Только преобретя их, я чувствую себя чудочеловеком. Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "category": [
      "Без рамки",
      "Деревья"
    ],
    "comments": [
      {
        "text": "Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!",
        "id": "tGWMNL"
      },
      {
        "text": "Мне кажется или я уже читал это где-то?",
        "id": "Tw_bES"
      }
    ]
  },
  {
    "id": "6VAidP",
    "title": "Ложка-поварёжка — нужный инструмент",
    "createdDate": "2020-10-13 12:33:06",
    "announce": "Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят.",
    "fullText": "Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Еду надо примимать как минимум три раза. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Из под его пера вышло 8 платиновых альбомов. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
    "category": [
      "Программирование",
      "Деревья"
    ],
    "comments": [
      {
        "text": "Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        "id": "5MATMD"
      },
      {
        "text": "Согласен с автором! Мне кажется или я уже читал это где-то?",
        "id": "4GWkGB"
      },
      {
        "text": "Хочу такую же футболку :-) Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
        "id": "MFvb-G"
      }
    ]
  },
  {
    "id": "QjcSqJ",
    "title": "Как перестать беспокоиться и начать жить",
    "createdDate": "2020-09-05 09:02:13",
    "announce": "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Только преобретя их, я чувствую себя чудочеловеком.",
    "fullText": "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина. Еду надо примимать как минимум три раза. Только преобретя их, я чувствую себя чудочеловеком. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    "category": [
      "Программирование",
      "За жизнь"
    ],
    "comments": [
      {
        "text": "Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
        "id": "abZOZV"
      }
    ]
  }
]

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "Рисование", "Еда", "Без рамки", "Программирование"`,
    () => expect(response.body).toEqual(
      expect.arrayContaining([`Рисование`, `Еда`, `Без рамки`, `Программирование`])
    )
  );

});