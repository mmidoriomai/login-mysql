CREATE DATABASE IF NOT EXISTS Users;
USE Users;

CREATE TABLE IF NOT EXISTS User(
username varchar(50) primary key, 
password varchar(10) NOT NULL);

INSERT INTO user values ('may', 'admin123');
