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
  `product_picture` varchar(255),
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
);


-- Fixa det här på ngt  sätt med Refrences product -> review -> skapad av en user

CREATE TABLE `product_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `review_id` int NOT NULL REFERENCES reviews(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `product_id`int NOT NULL REFERENCES products(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `user_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `review_id` int NOT NULL REFERENCES product_reviews(review_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- en user kan skapa en ny product med en review? Bra att hålla koll på 
create TABLE `user_products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `product_id` int NOT NULL REFERENCES products(id) ON DELETE NO ACTION ON UPDATE NO ACTION
  
);

CREATE TABLE `reports` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_review` int NOT NULL REFERENCES user_reviews(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  `resolved` boolean DEFAULT false,
  `optional` varchar(255)
);


