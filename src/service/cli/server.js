'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const { HttpCode } = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
  }
}