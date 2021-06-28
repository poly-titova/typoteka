'use strict';

const ArticleService = require(`./articles`);
const CategoryService = require(`./category`);
const CommentService = require(`./comment`);
const SearchService = require(`./search`);
const UserService = require(`./user`);

module.exports = {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
  UserService
};
