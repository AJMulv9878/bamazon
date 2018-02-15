CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40),
    department_name VARCHAR(40),
    price DECIMAL(10,2),
    stock_quantity INT(5),
    PRIMARY KEY (item_id)
    );
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
		VALUES ("Samsung Galaxy S8", "Electronics", 579.00, 10), ("Asus 15 Laptop", "Electronics", 500.00, 8), ("Steam $50 Gift Card", "Gaming", 50.00, 30),
        ("Blender", "Housewares", 50.00, 12), ("Kuerig Coffee Maker", "Housewares", 120.00, 23), ("Gel Pens", "Office Supplies", 6.89, 39), ("College Ruled Notebook", "Office Supplies", 1.23, 40),
        ("Towel", "Home Decor", 22.00, 32), ("Pillow", "Home Decor", 20.81, 31), ("Samsung 52 OLED 4k TV", "Electronics", 1200, 21);
	