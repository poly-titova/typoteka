'use strict';

const express = require(`express`);
const routes = require(`../api`);

const { HttpCode, API_PREFIX } = require(`../../constants`);
const { getLogger } = require(`../lib/logger`);

const logger = getLogger({ name: `api` });

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`))

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