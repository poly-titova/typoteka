'use strict';

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
  
}

module.exports = CommentService;
