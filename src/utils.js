// Функция для получения случайных значений из диапазона
module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для перетасовки массива
module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

// Функция для форматирования даты
module.exports.changeDateFormat = (date) => {
  return `${date.split(`.`).reverse().join(`-`)}T${`00:00:00.000Z`}`;
};

// Функция для проверки аргумента на принадлежность к массиву
module.exports.ensureArray = (value) => Array.isArray(value) ? value : [value];
