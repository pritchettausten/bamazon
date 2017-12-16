DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Personal Care", 5, 100),
("Hand Soap", "Personal Care", 1.29, 48),
("Deodorant", "Personal Care",	3.49, 88),
("Hatchimal", "Toys", 49.95, 150),
("Lego Set", "Toys", 24.95, 65),
("Diamond Ring", "Jewelry", 2000.00, 3),
("Fake Pearl Necklace", "Jewelry", 9.99, 75),
("PS4 Pro", "Electronics", 349.00, 10),
("XBox One X", "Electronics", 499.00, 8),
("Galaxy S8", "Electronics", 799.99, 17),
("MacBook Air", "Electronics", 1199.99, 7),
("MacBook Pro", "Electronics", 1799.99, 6)