"use strict";

const HELP_MESSAGE = `
Программа запускает http-сервер и формирует файл с данными для API.
    Помощь:
    service <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mock.json
`;

module.exports = {
  name: `--help`,
  run() {
    console.info(HELP_MESSAGE);
  }
};