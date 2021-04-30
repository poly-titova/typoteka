"use strict";

const { Model } = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);

// импортируем перечисление
const Aliase = require(`./aliase`);

class ArticleCategory extends Model { }

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);

  Article.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `articleId` });
  Comment.belongsTo(Article, { foreignKey: `articleId` });

  ArticleCategory.init({}, { sequelize });

  Article.belongsToMany(Category, { through: `articleCategories`, as: Aliase.CATEGORIES });
  Category.belongsToMany(Article, { through: `articleCategories`, as: Aliase.ARTICLES });
  Category.hasMany(ArticleCategory, { as: Aliase.ARTICLE_CATEGORIES });

  return { Category, Comment, Article, ArticleCategory };
}

module.exports = define;
