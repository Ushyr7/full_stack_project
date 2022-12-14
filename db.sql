CREATE TABLE `shops` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255) unique,
  `isAvailable` bool,
  `created` datetime,
  `creatorId` int
);

CREATE TABLE `schedule`(
  `id` int PRIMARY KEY auto_increment,
  `shopId` int,
  `day` tinyint unsigned,
  `open` time,
  `close` time    
);

CREATE TABLE `junctionsProductCategory` (
  `id` int PRIMARY KEY auto_increment,
  `productId` int,
  `categoryId` int
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY auto_increment,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255) unique,
  `price` float,
  `description` varchar(255),
  `shopId` int
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255) unique
);

ALTER TABLE `products` ADD FOREIGN KEY (`shopId`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

ALTER TABLE `schedule` ADD FOREIGN KEY (`shopId`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

ALTER TABLE `shops` ADD FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`);

ALTER TABLE `junctionsProductCategory` ADD FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

ALTER TABLE `junctionsProductCategory` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;


insert into shops(name, isAvailable, created, creatorId)
values("Banette",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
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

insert into shops(name, isAvailable, created, creatorId)
values("La Halle aux fruits",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "La Halle aux fruits"), 2, '06:30:00', '13:30:00'),
((select id from shops where name = "La Halle aux fruits"), 2, '15:00:00', '19:30:00'),
((select id from shops where name = "La Halle aux fruits"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "La Halle aux fruits"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "La Halle aux fruits"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "La Halle aux fruits"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "La Halle aux fruits"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "La Halle aux fruits"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "La Halle aux fruits"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "La Halle aux fruits"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "La Halle aux fruits"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "La Halle aux fruits"), 7, '15:00:00', '19:30:00');


insert into shops(name, isAvailable, created, creatorId)
values("Boucherie Breuque Olivier",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Boucherie Breuque Olivier"), 2, '06:30:00', '13:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 2, '15:00:00', '19:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Boucherie Breuque Olivier"), 7, '15:00:00', '19:30:00');

insert into shops(name, isAvailable, created, creatorId)
values("Charcuterie B??guet C'ROYAL",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Charcuterie B??guet C'ROYAL"), 7, '15:00:00', '19:30:00');

insert into shops(name, isAvailable, created, creatorId)
values("Royal Donuts",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Royal Donuts"), 2, '09:30:00', '12:30:00'),
((select id from shops where name = "Royal Donuts"), 2, '13:30:00', '18:30:00'),
((select id from shops where name = "Royal Donuts"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Royal Donuts"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Royal Donuts"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Royal Donuts"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Royal Donuts"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Royal Donuts"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Royal Donuts"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Royal Donuts"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Royal Donuts"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Royal Donuts"), 7, '15:00:00', '19:30:00');

insert into shops(name, isAvailable, created, creatorId)
values("Maison Vatelier",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Maison Vatelier"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Vatelier"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Vatelier"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Vatelier"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Vatelier"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Vatelier"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Vatelier"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Vatelier"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Vatelier"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Vatelier"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Vatelier"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Vatelier"), 7, '15:00:00', '19:30:00');

insert into shops(name, isAvailable, created, creatorId)
values("Saveurs du soleil",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Saveurs du soleil"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Saveurs du soleil"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Saveurs du soleil"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Saveurs du soleil"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Saveurs du soleil"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Saveurs du soleil"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Saveurs du soleil"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Saveurs du soleil"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Saveurs du soleil"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Saveurs du soleil"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Saveurs du soleil"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Saveurs du soleil"), 7, '15:00:00', '19:30:00');


insert into shops(name, isAvailable, created, creatorId)
values("Maison Bernard", false, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Maison Bernard"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Bernard"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Bernard"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Bernard"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Bernard"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Bernard"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Bernard"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Bernard"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Bernard"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Bernard"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Maison Bernard"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Maison Bernard"), 7, '15:00:00', '19:30:00');

insert into shops(name, isAvailable, created, creatorId)
values("Les Caves",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Les Caves"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Les Caves"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Les Caves"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Les Caves"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Les Caves"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Les Caves"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Les Caves"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Les Caves"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Les Caves"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Les Caves"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Les Caves"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Les Caves"), 7, '15:00:00', '19:30:00');

insert into shops(name, isAvailable, created, creatorId)
values("Zakian Primeurs",true, NOW(), null);
insert into schedule(shopId, day, open, close) values
((select id from shops where name = "Zakian Primeurs"), 1, '06:30:00', '13:30:00'),
((select id from shops where name = "Zakian Primeurs"), 1, '15:00:00', '19:30:00'),
((select id from shops where name = "Zakian Primeurs"), 3, '06:30:00', '13:30:00'),
((select id from shops where name = "Zakian Primeurs"), 3, '15:00:00', '19:30:00'),
((select id from shops where name = "Zakian Primeurs"), 4, '06:30:00', '13:30:00'),
((select id from shops where name = "Zakian Primeurs"), 4, '15:00:00', '19:30:00'),
((select id from shops where name = "Zakian Primeurs"), 5, '06:30:00', '13:30:00'),
((select id from shops where name = "Zakian Primeurs"), 5, '15:00:00', '19:30:00'),
((select id from shops where name = "Zakian Primeurs"), 6, '06:30:00', '13:30:00'),
((select id from shops where name = "Zakian Primeurs"), 6, '15:00:00', '19:30:00'),
((select id from shops where name = "Zakian Primeurs"), 7, '06:30:00', '13:30:00'),
((select id from shops where name = "Zakian Primeurs"), 7, '15:00:00', '19:30:00');

insert into categories(name) values
("Nourriture"),
("Patisserie"),
("Fruits"),
("Donut"),
("Chocolat"),
("Gateau"),
("Boisson"),
("Vin"),
("Viande"),
("L??gume");

insert into products(name, price, description) values
("Baguette tradition", 1.20, "Une baguette tradition"),
("Tartelette Caramel beurre sal??", 4.75, null),
("Tartelette Vanille framboise", 4.20, null),
("Tartelette Pistache framboise", 4.45, null),
("Tartelette Citron Mergingu??e", 4.10, null),
("Farandole", 4.85 , "Une farandole de fruits"),
("Eclair au caf??", 2.80, null),
("Eclair au chocolat", 2.80, null),
("Religieuse au caf??", 3.05, "Une religieuse au caf??"),
("Religieuse au chocolat", 3.05, "Une religieuse au chocolat"),
("Crossnut du jour - la surprise du chef", 4.90, null),
("Box de 6 Donuts Bueno - La surprise du chef !", 23.99 , "Box contenant 6 Donuts al??atoires"),
("Box de 6 Donuts Nutella - La surprise du chef !", 23.99, "Box contenant 6 Donuts al??atoires"),
("Cookie bomb", 4.20, "Donut chocolat / cookie"),
("Sneackers Bomb", 4.20, "Donut sneacker"),
("Biscuit nutella bomb", 4.20, null),
("Milky Hazel Bomb", 4.20 , null),
("Caramel Biscuit Bomb", 4.20, "Donut chocolat / biscuit"),
("Pralin?? Bomb", 4.20, "Donut chocolat / pralin??"),
("Happy Hippo Bomb", 4.20, "Donut chocolat / fruits"),
("Panier fruits secs", 35.00, null),
("Panier fruits confits a changer", 20, null),
("P??te de pistache", 11.30, "Un pot de p??te de pistache"),
("Plateau ap??ritif Olives & tomates s??ch??es", 15, null),
("Plateau ap??ritif ?? tartiner + 1 pot d'olives OFFERT", 29, null),
("Ananas confits", 2.80 , null),
("Plateau ap??ritif aux olives & tapenades", 26, null),
("Melon confit", 5.60, null),
("Cerise amarena confitte", 2.80 , null),
("Raison golden", 1.29, "Raison golden d'origine afrique du sud"),
("Panier legumes", 5.90, "Panier contenant chou, tomates, oignons, pommes de terres, carottes"),
("M??lange forestier", 2.50, "M??lange de champignons"),
("Ail violet", 1, "De l'ail violet d'origine France"),
("Ananas pain du sucre", 5.95, "Ananas d'origine cameroun"),
("Aubergine", 1.98, "Aubergine origine Espagne"),
("Avocat Hass Non-trait?? Gros", 3.70, "2 avocats d'origine espagne"),
("Betterave ronde", 1.25, "Betterave orgine France"),
("Brocoli", 2.77, "700g de brocoli origine Espagne"),
("Carottes lav??es", 0.75, "500g de carottes lav??es"),
("Concombre", 1.80, "1 concombre d'origine France"),
("Vodka CIROC Red Berry 37,5%", 45, "Bouteille de vodka CIROC Red Berry 37,5%"),
("Blanc Sec - Tariquet Classic 10,5%", 7.70, null),
("Rhum Brugal 1888 40%", 69 , null),
("Raclette Poivre", 4, "200g de fromage a raclette poivre"),
("St Emilion Gd Cru 2019 Ch. Haut la gr??ce Dieu 14.5%", 29, null),
("Bdx Sup. Chateau Reindent 2020, 14.5%", 8.50 , null),
("Calendrier de l'Avent Bi??res", 65, null),
("Rhum Kirk and Sweeney", 67, null),
("St Est??phe 2015 L??o de Prades, 13%", 24.50, "Orgine bordelais"),
("Pain de Brugge Ap??ro Epic?? Pasteuris??", 3.70, null),
("Pack Fondu", 4.60, null),
("Pack Raclette", 3, null),
("Les Essentiels - 2 personnes", 20, "Boeuf orgine normand et volaille des landes, 1 colis de 1,450 kg"),
("Escalope de veau milanaise", 2.50, null),
("Filet mignon de porc 'fa??on Orloff'", 10.80 , "origine france, 600g pour 3 personnes"),
("Paupiette de veau", 2.50, "origine france, 250g pour 1 personne"),
("R??ti de proc Orloff", 9, "origine france, 600g pour 3 personnes"),
("Paupiette de porc", 2.50, "origine france, 250g pour 1 personne"),
("R??ti de porc au Chorizo Espagnol gruy??re", 9, "Origine france, 600g pour 3 personnes"),
("R??ti de porc ?? la diable", 9, "Origine france, 600g pour 3 personnes"),
("Plateau pierrade", 40, "plateau pour 7 personnes"),
("Plateau fondu", 29.50, "plateau pour 7 personnes"),
("Plateau de charcuteries & fromages", 44, "plateau pour 8 ?? 10 personnes"),
("Plateau de charcuteries", 50, "Plateau pour 14 personnes"),
("Les packs des petits", 7.80, null),
("Le pack r??ti", 65.15, null),
("Le colis de porc", 42, null),
("Le colis de la semaine taille S", 30, null),
("Le colis de la semaine taille L", 80, null),
("L'ap??ro des copains", 38.5, null),
("Colis du patron - Race ?? viande", 68, "Origine france, 1 colis = 5kg pour 5 personnes"),
("Colis ??conomique - Viande de france", 50, "Origine france, 1 colis de 4,250kg pour 5 personnes"),
("Colis Les Essentiels", 20, "Origine france, colis pour 2 personnes"),
("Lot raclette sup??rieur", 9.80, "1 lot de 350g pour 1 personne"),
("Lot raclette ordinaire", 7.80, "1 lot de 350g pour 1 personne"),
("Colis choucroute", 15.90, "1 colis de 1,460kg pour 2 personnes"),
("D??lice Normand - Volaille fran??aise", 3.02 , "180g pour 1 personne"),
("Andouillette pur porc ficel??e", 5.36 , "200g pour 1 personne"),
("Chair ?? saucisse - Le proc fran??ais", 1.28, "100g"),
("Chipolatas", 1.18, "2 chipolatas de 100g par personne"),
("3 biftecks hach??s", 7.39, "390g"),
("3 tranches de museau vinaigrette", 3.39, "250g"),
("1 plateau raclette", 19.95, "pour 4 personnes environ, 800g"),
("Assortiment de charcuterie", 3.20, "origine france, pour 1 personne environ 70g"),
("Le colis de la semaine", 62.50, "environ 3,7kg"),
("Le colis de la semaine taille M", 95.95, "environ 4.15kg"),
("Le panier gourmand", 60, "orgine france, environ 2,350kg"),
("Andouillette", 8.98, "500g pour 1 personne"),
("Merguez", 6.80, "Origine france, environ 500g"),
("Saucisse de Toulouse", 1.90, "130g pour 1 personnse"),
("Tartufo", 89, null),
("Nougat Pruneddu", 7.90, "200g"),
("Fusilli Paisanella", 5.90, "500g"),
("Nos Coups de coueur", 49, null),
("Plaisirs Sucr??s", 29, null),
("Pasticceria Sinatti Panforte Margherita", 6.18, "200g"),
("Aperitivo", 39, null),
("Pasta e Salsa", 59, null),
("BOX Tapenade", 29.90, null),
("BOX Burrata", 19.90, null);