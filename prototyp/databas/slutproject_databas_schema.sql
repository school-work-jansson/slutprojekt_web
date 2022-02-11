CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `profile_picture` varchar(255),
  `discord_id` varchar(255) UNIQUE,
  `moderator` boolean DEFAULT false,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(255),
  `created_at` timestamp NOT NULL,
  `reports` int,
  `refresh_token` varchar(255)
);

CREATE TABLE `reports` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `reporter_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `review_id` int NOT NULL,
  `resolved` boolean DEFAULT false,
  `optional` varchar(255)
);

CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `content` varchar(255),
  `flagged` boolean NOT NULL,
  `reports` int
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_picture` varchar(255),
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(255) NOT NULL
);


ALTER TABLE `reports` ADD FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `reviews` (`user_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
