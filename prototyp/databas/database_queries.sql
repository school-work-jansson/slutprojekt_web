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

-- Hämta user reviews
SELECT ur.user_id, ur.review_id, r.rating, r.title, r.content, r.created_at, u.nickname
    FROM user_reviews ur 
        INNER JOIN reviews r ON ( ur.review_id = r.id  )  
        INNER JOIN users u ON ( ur.user_id = u.id  )  
    WHERE (SELECT id FROM users WHERE discord_id = ?)

-- hämta product reviews + product
SELECT pr.review_id, pr.product_id, p.product_picture, p.name, p.description, u.nickname, r.rating, r.title, r.content, r.created_at
    FROM product_reviews pr 
        INNER JOIN products p ON ( pr.product_id = p.id  )  
        INNER JOIN users u ON ( p.user_id = u.id  )  
        INNER JOIN reviews r ON ( pr.review_id = r.id  )    
   
-- POST Reviews
START TRANSACTION;
  INSERT 
    INTO `reviews` (`rating`, `title`, `content`, `created_at`)
    VALUES (3, "Hello World 2", "lorem ipsum review", NOW());
  INSERT 
    INTO `user_reviews` (`user_id`, `review_id`)
    values ((SELECT id FROM users WHERE discord_id = '322015089529978880'), (SELECT LAST_INSERT_ID() ));
COMMIT;
