'use strict';

const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../../constants`);

class CommentService {
  // метод который возвращает все комментарии
  findAll(article) {
    return article.comments;
  }

  // метод который удаляет из определённой публикации комментарий с идентификатором
  drop(article, commentId) {
    const dropComment = article.comments
      .find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments
      .filter((item) => item.id !== commentId);

    return dropComment;
  }

  // метод который создаёт новую публикацию
  // полученные данные мы просто добавляем в массив — хранилище
  create(article, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
    }, comment);

    article.comments.push(newComment);
    return comment;
  }
}

module.exports = CommentService;
