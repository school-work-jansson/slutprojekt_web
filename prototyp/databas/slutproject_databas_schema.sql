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
  `user_id` int NOT NULL,
  `review_id` int NOT NULL,
  `resolved` boolean DEFAULT false,
  `optional` varchar(255)
);

CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `rating` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255),
  `created_at` timestamp DEFAULT NOW() NOT NULL,
  `flagged` boolean DEFAULT false,
  `reports` int
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_picture` varchar(255),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
);

CREATE TABLE `user_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `review_id` int NOT NULL REFERENCES reviews(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `product_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `review_id` int NOT NULL REFERENCES reviews(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `product_id`int NOT NULL REFERENCES products(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);



-- Refererar till att att en product har en poster id från users
ALTER TABLE `products` 
  ADD 
    CONSTRAINT fk_products_poster_id
    FOREIGN KEY (user_id) 
    REFERENCES users(id)
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;

-- Reports har en "reporter"
ALTER TABLE `reports` 
  ADD 
    CONSTRAINT fk_reports_reporter
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;


-- reports har en review som är raporterad
ALTER TABLE `reports` 
  ADD 
    CONSTRAINT fk_reports_review
    FOREIGN KEY (review_id) 
    REFERENCES reviews(id) 
  ON DELETE NO ACTION 
  ON UPDATE NO ACTION;



-- Testing values
INSERT 
  INTO `products` (`user_id`, `name`, `description`) 
  VALUES (1, 'Test product name', 'lorem ipsum');

INSERT 
  INTO `reviews` (`user_id`, `product_id`, `rating`, `title`, `content`, `created_at`) 
  VALUES (1, 1, 5, 'Test product review title', 'lorem ipsum', NOW());

INSERT 
  INTO `reviews` (`user_id`, `product_id`, `rating`, `title`, `content`, `created_at`) 
  VALUES (1, 1, 5, 'Test product review title2', 'lorem ipsum2', NOW());