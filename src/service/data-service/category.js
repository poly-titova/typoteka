class CategoryService {
  // конструктор класса принимает один аргумент — articles, 
  // тот самый массив информации с публикациями
  constructor(articles) {
    this._articles = articles;
  }

  // формирование массива всех категорий для которых есть публикации
  findAll() {
    const categories = this._articles.reduce((acc, article) => {
      acc.add(...article.category);
      return acc;
      // сохраняем лишь уникальные элементы
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
