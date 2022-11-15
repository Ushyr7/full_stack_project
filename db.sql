CREATE SCHEMA fullstack;
USE fullstack;

CREATE TABLE `Shops` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255) unique,
  `isAvailable` bool,
  `created` datetime,
  `creatorId` int
);

CREATE TABLE `Schedule`(
  `id` int PRIMARY KEY auto_increment,
  `shopId` int,
  `day` tinyint unsigned,
  `open` time,
  `close` time    
);

CREATE TABLE `JunctionsShopProduct` (
  `id` int PRIMARY KEY auto_increment,
  `shopId` int,
  `productId` int
);

CREATE TABLE `JunctionsProductCategory` (
  `id` int PRIMARY KEY auto_increment,
  `productId` int,
  `categoryId` int
);

CREATE TABLE `Users` (
  `id` int PRIMARY KEY auto_increment,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `Products` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255) unique,
  `price` float,
  `description` varchar(255)
);

CREATE TABLE `Categories` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255) unique
);

ALTER TABLE `JunctionsShopProduct` ADD FOREIGN KEY (`productId`) REFERENCES `Products` (`id`);

ALTER TABLE `JunctionsShopProduct` ADD FOREIGN KEY (`shopId`) REFERENCES `Shops` (`id`);

ALTER TABLE `Schedule` ADD FOREIGN KEY (`shopID`) REFERENCES `Shops` (`id`);

ALTER TABLE `Shops` ADD FOREIGN KEY (`creatorId`) REFERENCES `Users` (`id`);

ALTER TABLE `JunctionsProductCategory` ADD FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`);

ALTER TABLE `JunctionsProductCategory` ADD FOREIGN KEY (`productId`) REFERENCES `Products` (`id`);


insert into Shops(name, isAvailable, created, creatorId)
values("Banette",true, NOW(), null);
insert into Schedule(shopId, day, open, close) values
((select id from shops where name = "Banette"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Banette"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Banette"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Banette"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Banette"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Banette"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Banette"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Banette"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Banette"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Banette"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Banette"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Banette"), 7, '15:00:00', '19:30:00');
