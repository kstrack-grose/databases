CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int(5) auto_increment,
  -- userid int(3),
  message varchar(255),
  -- room varchar(30),
  primary key (id)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id int(3) auto_increment,
  username varchar(30),
  primary key (id)
);

-- CREATE TABLE tweets (
--   id int(5) auto_increment,
--   text varchar(200),
--   primary key (id)
-- );


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

