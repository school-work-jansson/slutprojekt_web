CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `discord_id` varchar(255) UNIQUE NOT NULL,
  `profile_picture` varchar(255),
  `moderator` boolean DEFAULT false,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(255),
  `created_at` timestamp NOT NULL,
  `reports` int,
  `refresh_token` varchar(255) NOT NULL,
  `refresh_valid_until` timestamp NOT NULL
);

CREATE TABLE `reports` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `reporter_id` varchar(255) NOT NULL,
  `review_id` int NOT NULL,
  `resolved` boolean DEFAULT false,
  `optional` varchar(255)
);

CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `poster_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255),
  `created_at` timestamp DEFAULT NOW() NOT NULL,
  `flagged` boolean DEFAULT false,
  `reports` int
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `poster_id` int NOT NULL,
  `product_picture` varchar(255),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category_id` int
);

-- Refererar till att att en product har en poster id från users
ALTER TABLE `products` 
  ADD 
    CONSTRAINT fk_products_users 
    FOREIGN KEY (poster_id) 
    REFERENCES users(id)
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;

-- Reports har en "reporter"
ALTER TABLE `reports` 
  ADD 
    CONSTRAINT fk_reports_reporter
    FOREIGN KEY (reporter_id) 
    REFERENCES users(id) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;
-- ERROR 3780 (HY000): Referencing column 'reporter_id' and referenced column 'id' in foreign key constraint 'fk_reports_reporter' are incompatible.



-- reports har en review som är raporterad
ALTER TABLE `reports` 
  ADD 
    CONSTRAINT fk_reports_review
    FOREIGN KEY (review_id) 
    REFERENCES reviews(id) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;

-- 
ALTER TABLE `reviews` 
  ADD 
    CONSTRAINT fk_review_product
    FOREIGN KEY (product_id) 
    REFERENCES products(id) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;

-- users kan ha en review och refereras till poster id i reviews
ALTER TABLE `users` 
  ADD 
    CONSTRAINT fk_user_review 
    FOREIGN KEY (id) 
    REFERENCES reviews(poster_id) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;
-- https://stackoverflow.com/questions/43511183/mysql-error-1822-failed-to-add-foreign-key-constraint-missing-index-for-contra
-- ERROR 1822 (HY000): Failed to add the foreign key constraint. Missing index for constraint 'fk_user_review' in the referenced table 'reviews'


-- Testing values
INSERT 
  INTO `products` (`poster_id`, `name`, `description`) 
  VALUES (1, 'Test product name', 'lorem ipsum');

INSERT 
  INTO `reviews` (`poster_id`, `product_id`, `rating`, `title`, `content`, `created_at`) 
  VALUES (1, 1, 5, 'Test product review title', 'lorem ipsum', NOW());

INSERT 
  INTO `reviews` (`poster_id`, `product_id`, `rating`, `title`, `content`, `created_at`) 
  VALUES (1, 1, 5, 'Test product review title2', 'lorem ipsum2', NOW());