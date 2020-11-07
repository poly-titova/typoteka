'use strict';

class CommentService {
  // метод который возвращает все комментарии
  findAll(article) {
    return article.comments;
  }

}

module.exports = CommentService;
