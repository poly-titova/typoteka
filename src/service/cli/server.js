'use strict';

const express = require(`express`);
const routes = require(`../api`);

const { HttpCode, API_PREFIX } = require(`../../constants`);
const { getLogger } = require(`../lib/logger`);

const logger = getLogger({ name: `api` });

const DEFAULT_PORT = 3000;

const app = express();

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`Ошибка при создании сервера: ${err.message}`);
        }

        return logger.info(`Ожидаю соединений на ${port}`);
      });
    } catch (err) {
      logger.error(`Произошла ошибка: ${err.message}`);
      process.exit(1);
    }
  }
}