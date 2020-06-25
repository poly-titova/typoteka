// Функция для генерации даты
const {getRandomInt} = require(`./utils`);

const today = new Date();
const dayInThePast = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate()
);

const pad = (number) => `${number}`.padStart(2, `0`);

const format = (date) =>
  [date.getFullYear(), date.getMonth(), date.getDate()]
    .map((num) => pad(num))
    .join(`-`) +
  ` ` +
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((num) => pad(num))
    .join(`:`);

const getRandomDate = () => {
  const dt = new Date(getRandomInt(dayInThePast, today));
  return format(dt);
};

module.exports = {
  getRandomDate
};