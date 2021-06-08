'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string()
    .min(30)
    .max(250)
    .required(),

  createdDate: Joi.string()
    .isoDate(),

  category: Joi.string()
    .items(Joi.string())
    .min(1)
    .required(),

  announce: Joi.string()
    .min(30)
    .max(250)
    .required(),

  fullText: Joi.string()
    .max(1000),

  comments: Joi.object({
    text: Joi.string()
      .min(20)
      .required(),
  }).required(),
});
