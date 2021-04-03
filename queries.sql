-- запрос для получения списка всех категорий
SELECT * FROM categories

-- запрос для получения списка непустых категорий
SELECT id, name FROM categories
  JOIN article_categories
  ON id = category_id
  GROUP BY id
