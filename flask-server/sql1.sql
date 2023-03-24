select * from users;
drop table users;
drop table books;
drop table user_book;
select * from books;
select * from user_book;
INSERT INTO users (first_name, last_name, email, passwd) 
VALUES ('asd', 'feg', 'feg@gmail.com' , 'sdsds' );

INSERT INTO user_book (user_id,book_id,rent_status,authored) 
VALUES (1, 1005, 1 , 0 );

INSERT INTO books (name, author, description,added_by) 
VALUES ('One piece', 'Eiichiro Oda', 'The story follows the adventures of Monkey D. Luffy, a boy whose body gained the properties of rubber.','rey' );

INSERT INTO books (id,name, author, description,added_by) 
VALUES (1001,'That time I got reincarnated as a Slime', 'Fuse', 'Satoru Mikami, in his mid-thirties, is an employee and satisfied with
           his life, but would like to have a girlfriend. He is jealous of his
           colleague, who has just got engaged to the most beautiful woman in the
           company.','Hero');

INSERT INTO books (name, author, description,added_by) 
VALUES ('Overlord', 'Kugane Maruyama', 'When a popular MMORPG is scheduled to be shut down permanently, veteran player Momonga refuses to log out. As NPCs begin to develop personalities and minds of their own he decides to put his skills to use as the game’s new overlord.','demon');


delete from users where user_id=8;
delete from user_book where user_id=8;

CREATE TABLE BOOKS(
id int AUTO_INCREMENT,
name varchar(255) NOT NULL,
author varchar(255),
description varchar(255),
image varchar(255),
pdf varchar(255),
added_by varchar(255), 
PRIMARY KEY(id));

alter table BOOKS auto_increment=1000;

CREATE TABLE USERS(
user_id int AUTO_INCREMENT,
first_name varchar(255) NOT NULL,
last_name varchar(255),
email varchar(255) NOT NULL,
passwd varchar(255) NOT NULL,
PRIMARY KEY(user_id));

CREATE TABLE USER_BOOK(
user_id int,
book_id int,
rent_status bool,
authored bool,
primary key(user_id,book_id),
foreign key(user_id) references users(user_id),
foreign key(book_id) references books(id)
);

select max(user_id) from users;
select id from books;
INSERT INTO user_book (user_id,book_id,rent_status) 
VALUES (1);

select * from books where id in (1001, 1002, 1003)
