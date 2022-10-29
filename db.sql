CREATE SCHEMA "full_stack";
USE full_stack;

CREATE TABLE Shops (
    id int primary key auto_increment,
    name varchar(255),
    isAvailable boolean
);

insert into shops (name, isAvailable) value ("test", true);