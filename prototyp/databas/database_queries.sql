-- Testing values
START TRANSACTION;
  INSERT 
    INTO `products` (`name`, `description`) 
    VALUES ('tmp product', 'lorem ipsum product');
  SET @PRODUCT_ID =(SELECT LAST_INSERT_ID() );    
  INSERT 
    INTO `reviews` (`rating`, `title`, `content`, `created_at`) 
    VALUES (5, 'Bäst', 'lorem ipsum', NOW());
  SET @REVIEW_ID = (SELECT LAST_INSERT_ID() );    
  INSERT 
    INTO `product_reviews` (`user_id`, `review_id`, `product_id`) 
    VALUES ((SELECT id FROM users WHERE discord_id = '322015089529978880'), @REVIEW_ID, @PRODUCT_ID);
COMMIT;



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


SELECT u.profile_picture, u.nickname, r.rating, r.title, r.content, r.created_at, p.name FROM product_reviews pr INNER JOIN users u ON ( pr.user_id = u.id  )  INNER JOIN reviews r ON ( pr.review_id = r.id  )  INNER JOIN products p ON ( pr.product_id = p.id  )  WHERE (SELECT id FROM users WHERE discord_id = ?)

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

SELECT u.profile_picture, u.nickname, r.rating, r.title, r.content, r.created_at, p.product_picture, p.name, p.description FROM product_reviews pr INNER JOIN users u ON ( pr.user_id = u.id  ) INNER JOIN reviews r ON ( pr.review_id = r.id  ) INNER JOIN products p ON ( pr.product_id = p.id  ) WHERE (p.id = ?)


-- GET user_profile


-- GET SEARCH ngt fel Variables funkar inte i limit eller OFFSET? Returnerar samma produkt 2 gånger
SET @SEARCHVALUE:='tmp product';
SET @LOWLIM:=0;
SET @HIGHLIM:=100;
SELECT 
  p.name, p.description,
  (SELECT AVG(rating) as AverageRating FROM reviews)
FROM product_reviews pr
  INNER JOIN reviews r ON ( pr.review_id = r.id  )  
  INNER JOIN products p ON ( pr.product_id = p.id  ) 
WHERE (p.name = @SEARCHVALUE OR p.description = @SEARCHVALUE)
ORDER BY pr.id
LIMIT 100 OFFSET 0;
