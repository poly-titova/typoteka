"use strict";

const { Model } = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineUser = require(`./user`);

// импортируем перечисление
const Aliase = require(`./aliase`);

class ArticleCategory extends Model { }

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);

  Article.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `articleId` });
  Comment.belongsTo(Article, { foreignKey: `articleId` });

  User.hasMany(Article, { as: Aliase.ARTICLES, foreignKey: `userId` });
  Article.belongsTo(User, { as: Aliase.USER, foreignKey: `userId` });

  User.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `userId` });
  Comment.belongsTo(User, { as: Aliase.USER, foreignKey: `userId` })

  ArticleCategory.init({}, { sequelize });

  Article.belongsToMany(Category, { through: `articleCategories`, as: Aliase.CATEGORIES });
  Category.belongsToMany(Article, { through: `articleCategories`, as: Aliase.ARTICLES });
  Category.hasMany(ArticleCategory, { as: Aliase.ARTICLE_CATEGORIES });

  return { Category, Comment, Article, ArticleCategory, User };
}

module.exports = define;
