CREATE DATABASE bamazon_db;
USE bamazon_db;

--Product table creation
CREATE TABLE `product` (
  `itemID` int(10) NOT NULL AUTO_INCREMENT,
  `productName` varchar(30) DEFAULT NULL,
  `departmentName` varchar(30) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stockQuantity` int(10) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
);
--Insert products into the table
INSERT INTO	product (productName, departmentName, price, stockQuantity)
	values ('iphone', 'phone', 500, 10);
INSERT INTO	product (productName, departmentName, price, stockQuantity )
	values ('nexus', 'phone', 400, 20);
INSERT INTO	product (productName, departmentName, price, stockQuantity )
	values ('htc', 'phone', 350, 15);
INSERT INTO	product (productName, departmentName, price, stockQuantity )
	values ('macbook', 'laptop', 1000, 10);
INSERT INTO	product (productName, departmentName, price, stockQuantity )
	values ('dell', 'laptop', 700, 15); 
INSERT INTO	product (productName, departmentName,  price, stockQuantity)
	values ('hp',  'laptop', 800, 10);
INSERT INTO	product (productName, departmentName, price, stockQuantity)
 	values ('nintendo', 'console', 100, 10);
 INSERT INTO product (productName, departmentName, price, stockQuantity )
	values ('playstation', 'console', 200, 15);
INSERT INTO	product (productName, departmentName, price, stockQuantity )
	values ('dreamcast', 'console', 70, 20);
INSERT INTO	product (productName, departmentName, price, stockQuantity)
	values ('gamecube', 'console', 120, 10);

-- Department table creation
CREATE TABLE `department` (
  `departmentID` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(30) DEFAULT NULL,
  `overHeadCosts` varchar(30) DEFAULT NULL,
  `totalSales` double DEFAULT NULL,
  `totalProfit` double DEFAULT NULL,
  PRIMARY KEY (`departmentID`)
);
--Insert data into the department table
INSERT INTO	department (departmentName, overHeadCosts)
 	values ('phone', 1000);
INSERT INTO	department (departmentName, overHeadCosts)
 	values ('laptop', 2000);
INSERT INTO	department (departmentName, overHeadCosts)
 	values ('console', 500);