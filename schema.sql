DROP DATABASE IF EXISTS oddjobs;

CREATE DATABASE oddjobs;

USE oddjobs;

CREATE TABLE IF NOT EXISTS users (
  id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  password varchar(2000) not null,
  PRIMARY KEY (id),
  UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS posts (
  id int not null auto_increment,
  address varchar(255) not null default '2 Placeholder Address Road',
  lat varchar(50) not null,
  lng varchar(50) not null,
  brief varchar(1000) not null,
  detailed varchar(10000) not null,
  payment int not null,
  image varchar(1000),
  user_id int not null,
  taken tinyint not null default 0,
  taken_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  CHECK (taken_id <> user_id)
);

INSERT INTO users (id, first_name, last_name, email, password) VALUES (1, "Bobby", "Flay", "bflay@gmail.com", "123");

INSERT INTO posts (id, lat, lng, brief, detailed, payment, user_id) VALUES (1, 40.6734877, -73.98252079999997, "Need someone to mow lawn", "Willing to pay someone to mow my lawn ASAP need this done today!!", 20, 1);
INSERT INTO posts (id, lat, lng, brief, detailed, payment, user_id) VALUES (2, 40.744052, -74.02707450000003, "Looking for painter", "Willing to pay someone to mow my lawn ASAP need this done today!!", 20, 1);
INSERT INTO posts (id, lat, lng, brief, detailed, payment, user_id) VALUES (3, 38.8338816, -104.8213634, "Looking for cook", "Willing to pay someone to mow my lawn ASAP need this done today!!", 20, 1);
INSERT INTO posts (id, lat, lng, brief, detailed, payment, user_id) VALUES (4, 39.95391000000001, -75.17764599999998, "Clean car", "Willing to pay someone to mow my lawn ASAP need this done today!!", 20, 1);
INSERT INTO posts (id, lat, lng, brief, detailed, payment, user_id) VALUES (5, 37.4812763, -122.1556094, "Watch my dog", "Willing to pay someone to mow my lawn ASAP need this done today!!", 20, 1);
