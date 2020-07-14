'use strict';

// подключим дополнительные пакеты
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

// подключим статус-коды
const { HttpCode } = require(`../constants`);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера`, err));
        }
        return console.log(chalk.green(`Ожидаю соединений по адресу http://localhost:${port}`));
      });
  }
}