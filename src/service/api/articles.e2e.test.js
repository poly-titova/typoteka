"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const articles = require(`./articles`);
const DataService = require(`../data-service/articles`);
const CommentService = require(`../data-service/comment`);

const { HttpCode } = require(`../../constants`);

const mockData = [
  {
    "id": "-_KcI6",
    "title": "Самый лучший музыкальный альбом этого год",
    "createdDate": "2020-10-06 09:51:02",
    "announce": "Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Еду надо примимать как минимум три раза. Первая большая ёлка была установлена только в 1938 году.",
    "fullText": "Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Еду надо примимать как минимум три раза. Золотое сечение — соотношение двух величин, гармоническая пропорция.",
    "category": [
      "Еда",
      "Без рамки",
      "Программирование"
    ],
    "comments": [
      {
        "text": "Согласен с автором!",
        "id": "aFaVn9"
      }
    ]
  },
  {
    "id": "_PnXaf",
    "title": "Рок — это протест",
    "createdDate": "2020-10-04 19:00:41",
    "announce": "Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха.",
    "fullText": "Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Из под его пера вышло 8 платиновых альбомов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения.",
    "category": [
      "За жизнь",
      "Разное",
      "Рисование"
    ],
    "comments": [
      {
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему?",
        "id": "Umcuok"
      },
      {
        "text": "Планируете записать видосик на эту тему?",
        "id": "_afP_9"
      },
      {
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему?",
        "id": "x7vQDa"
      }
    ]
  },
  {
    "id": "-A8qxG",
    "title": "Как начать программировать",
    "createdDate": "2020-11-01 04:49:09",
    "announce": "Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Еду надо примимать как минимум три раза. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения.",
    "fullText": "Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Еду надо примимать как минимум три раза. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Только преобретя их, я чувствую себя чудочеловеком. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    "category": [
      "Разное"
    ],
    "comments": [
      {
        "text": "Планируете записать видосик на эту тему? Совсем немного... Мне кажется или я уже читал это где-то?",
        "id": "pwz2mC"
      },
      {
        "text": "Мне кажется или я уже читал это где-то?",
        "id": "aAp5_K"
      }
    ]
  },
  {
    "id": "FXf7Xi",
    "title": "Борьба с прокрастинацией",
    "createdDate": "2020-09-22 20:29:34",
    "announce": "Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "fullText": "Достичь успеха помогут ежедневные повторения. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Еду надо примимать как минимум три раза. Это один из лучших рок-музыкантов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "category": [
      "За жизнь",
      "Железо",
      "Программирование",
      "Без рамки"
    ],
    "comments": [
      {
        "text": "Согласен с автором! Планируете записать видосик на эту тему?",
        "id": "bFYhJ7"
      }
    ]
  },
  {
    "id": "HIW7kx",
    "title": "Ёлки. История деревьев",
    "createdDate": "2020-09-30 18:50:32",
    "announce": "Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Только преобретя их, я чувствую себя чудочеловеком.",
    "fullText": "Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Еду надо примимать как минимум три раза. Только преобретя их, я чувствую себя чудочеловеком. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
    "category": [
      "Железо",
      "Музыка"
    ],
    "comments": [
      {
        "text": "Согласен с автором!",
        "id": "XNTA49"
      },
      {
        "text": "Хочу такую же футболку :-)",
        "id": "Es7Edw"
      },
      {
        "text": "Совсем немного... Это где ж такие красоты?",
        "id": "pZRbqy"
      },
      {
        "text": "Согласен с автором!",
        "id": "Ng8hvA"
      }
    ]
  }
]

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, { logging: false });
  await initDB(mockDB, { category: mockCategories, articles: mockArticles });
  app.use(express.json());
  articles(app, new DataService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "-_KcI6"`, () => expect(response.body[0].id).toBe(`-_KcI6`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/-_KcI6`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`article's title is "Самый лучший музыкальный альбом этого год"`, () => expect(response.body.title).toBe(`Самый лучший музыкальный альбом этого год`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    createdDate: `2020-09-30 18:50:32`,
    announce: `Дам погладить котика.`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    createdDate: `2020-09-30 18:50:32`,
    announce: `Дам погладить котика.`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = { ...newArticle };
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    createdDate: `2020-09-30 18:50:32`,
    announce: `Дам погладить котика.`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/-_KcI6`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/-_KcI6`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    category: `Это`,
    title: `валидный`,
    createdDate: `2020-09-30 18:50:32`,
    announce: `Дам погладить котика.`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    category: `Это`,
    title: `невалидный`,
    createdDate: `2020-09-30 18:50:32`,
    announce: `Дам погладить котика.`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/_PnXaf`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`_PnXaf`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/-A8qxG/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`When field type is wrong response code is 400`, async () => {

  const badArticles = [
    {...newArticle, picture: 12345},
    {...newArticle, category: `Котики`}
  ];
  for (const badArticle of badArticles) {
    await request(app)
      .post(`/articles`)
      .send(badArticle)
      .expect(HttpCode.BAD_REQUEST);
  }
});

test(`When field value is wrong response code is 400`, async () => {
  const badArticles = [
    {...newArticle, title: `too short`},
    {...newArticle, categories: []}
  ];
  for (const badArticle of badArticles) {
    await request(app)
      .post(`/articles`)
      .send(badArticle)
      .expect(HttpCode.BAD_REQUEST);
  }
});
