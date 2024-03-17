DROP DATABASE IF EXISTS `userslist`;

DROP TABLE IF EXISTS `users`;
-- CREATE TABLE `users`;

CREATE TABLE `userslist`.`users` (
  `id` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `verified` VARCHAR(45) NOT NULL DEFAULT 'false',
  `role` VARCHAR(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`email`));


  INSERT  INTO users (name,email,verified,role) values (vaishu,vaishnavigannoju@gmail.com,true,user),(admin,admin@gmail.com,true,admin);
-- ALTER TABLE `userslist`.`users` 
-- CHANGE COLUMN `id` `id` INT NULL AUTO_INCREMENT ;
-- ALTER TABLE `userslist`.`users` 
-- CHANGE COLUMN `id` `id` INT NOT NULL ;
