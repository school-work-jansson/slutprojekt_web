-- Testing values
INSERT 
  INTO `products` (`user_id`, `name`, `description`) 
  VALUES (1, 'tmp product', 'lorem ipsum product');

INSERT 
  INTO `reviews` (`rating`, `title`, `content`, `created_at`) 
  VALUES (5, 'Test review review title', 'lorem ipsum', NOW());

INSERT 
  INTO `product_reviews` (`review_id`, `product_id`) 
  VALUES (1, 1);

INSERT 
  INTO `user_reviews` (`user_id`, `review_id`) 
  VALUES (1, 1);


-- POST product_review
START TRANSACTION;
  INSERT 
    INTO `reviews` (`rating`, `title`, `content`, `created_at`)
    VALUES (3, "Hello World 2", "lorem ipsum review", NOW());
  INSERT 
    INTO `product_reviews` (`user_id`, `review_id`, `product_id`)
    values ((SELECT id FROM users WHERE discord_id = '322015089529978880'), (SELECT LAST_INSERT_ID() ), ?);
COMMIT;

-- Hämta user reviews
SELECT 
    u.profile_picture, u.nickname, 
    r.rating, r.title, r.content, r.created_at, 
    p.id
FROM product_reviews pr 
	INNER JOIN users u ON ( pr.user_id = u.id  )  
	INNER JOIN reviews r ON ( pr.review_id = r.id  )  
	INNER JOIN products p ON ( pr.product_id = p.id  )  
WHERE (SELECT id FROM users WHERE discord_id = ?)


-- GET product & reviews
SELECT 
    u.profile_picture, u.nickname, 
    r.rating, r.title, r.content, r.created_at, 
    p.product_picture, p.name, p.description
FROM product_reviews pr 
	INNER JOIN users u ON ( pr.user_id = u.id  )  
	INNER JOIN reviews r ON ( pr.review_id = r.id  )  
	INNER JOIN products p ON ( pr.product_id = p.id  ) 
WHERE (p.id = ?)