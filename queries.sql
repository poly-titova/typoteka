-- запрос для получения списка всех категорий
SELECT * FROM categories

-- запрос для получения списка непустых категорий
SELECT id, name FROM categories
  JOIN article_categories
  ON id = category_id
  GROUP BY id

-- запрос для получения категорий с количеством публикаций
SELECT id, name, count(article_id) FROM categories
  LEFT JOIN article_categories
  ON id = category_id
  GROUP BY id

-- запрос для построения сводной таблицы из четырёх других таблиц, применение двух агрегатных функций и сгруппирования по двум столбцам, а затем ещё и упорядочивание
SELECT articles.*, 
  COUNT(comments.id) AS comments_count, 
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  users.first_name,
  users.last_name,
  users.email
FROM articles
  JOIN article_categories ON articles.id = article_categories.article_id
  JOIN categories ON article_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
  GROUP BY articles.id, users.id
  ORDER BY articles.created_at DESC

-- запрос для детальной информации по публикации
SELECT articles.*, 
  COUNT(comments.id) AS comments_count, 
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  users.first_name,
  users.last_name,
  users.email
FROM articles
  JOIN article_categories ON articles.id = article_categories.article_id
  JOIN categories ON article_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
WHERE articles.id = 1
  GROUP BY articles.id, users.id

-- запрос для получения пяти свежих комментариев
SELECT 
  comments.id, 
  comments.offer_id, 
  users.first_name, 
  users.last_name,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5

-- запрос для получения комментариев к публикации
SELECT 
  comments.id, 
  comments.offer_id, 
  users.first_name, 
  users.last_name,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.offer_id = 1
  ORDER BY comments.created_at DESC
