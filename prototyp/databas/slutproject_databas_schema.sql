CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `discord_id` varchar(255) UNIQUE NOT NULL,
  `profile_picture` varchar(255),
  `is_moderator` boolean DEFAULT false,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(255),
  `created_at` timestamp NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `refresh_valid_until` timestamp NOT NULL
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
  `hash` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
);


-- Fixa det här på ngt  sätt med Refrences product -> review -> skapad av en user

CREATE TABLE `product_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL ,
  `review_id` int NOT NULL,
  `product_id`int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`review_id`) REFERENCES reviews(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`product_id`) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE `reports` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_review` int NOT NULL ,
  `resolved` boolean DEFAULT false,
  `optional` varchar(255),
  FOREIGN KEY (`user_review`) REFERENCES reviews(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `product_pictures` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL REFERENCES products(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `picture` varchar(255)
);
