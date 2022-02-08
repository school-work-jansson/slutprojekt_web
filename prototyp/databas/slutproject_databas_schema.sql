CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `discord_id` varchar(255) UNIQUE,
  `role_id` int NOT NULL,
  `nickname` varchar(255),
  `email` varchar(255),
  `created_at` timestamp,
  `reports` int,
  `refresh_token` varchar(255),
  `valid_until` timestamp
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
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(255) NOT NULL
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role` varchar(255) NOT NULL
);

ALTER TABLE `reports` ADD FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `reviews` (`user_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
