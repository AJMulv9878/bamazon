var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Zeratul26/",
    database: "bamazon"
});

connection.connect(function(objectError) {
    if (objectError) throw objectError;
    console.log("connected as id " + connection.threadId);
    bamazonCustomer.userStart();
});

var items = [];

bamazonCustomer = {
        userStart: function() {
            var that = this;
            connection.query("SELECT * FROM products", function(objectError, result) {
                if (objectError) throw objectError; 
                for (i = 0; i < result.length; i++) {
                    items.push({
                        ID: result[i].item_id,
                        Product: result[i].product_name,
                        Price: "$" + result[i].price,
                        Quantity: result[i].stock_quantity
                    });
                }
                console.table(items);
                that.userPrompt();
            });
        },

        userPrompt: function() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please select an item to purchase and type the ID number in.",
                    name: "userSelect"
                },
                {
                    type: "input",
                    message: "How many would you like?",
                    name: "userQuantity"
                }
            ]).then(function(response){
                var select = parseInt(response.userSelect);
                var quantity = parseInt(response.userQuantity);
                for (i = 0; i < items.length; i++) {
                    if (items[i].ID === select) {
                        console.log("Let me check on that for you!");
                    }
                }
                connection.query("SELECT * FROM products WHERE item_id =?", [parseInt(response.userSelect)], function(objectError, result) {
                    if (objectError) throw objectError;
                    quantityDB = result.stock_quantity;
                    if (result.stock_quantity != 0) {
                        connection.query("UPDATE products SET stock_quantity ='"+(quantityDB-quantity)+"' WHERE item_id =?"
                    [1, select], function(objectError, result) {
                        if (objectError) throw objectError;
                        console.log("Thank you for your purchase! Goodbye");
                        connection.end();
                    });
                    }
                    else {
                        console.log("We currently don't have that product in stock, thanks for your time! Goodbye");
                        connection.end();
                    }
                });
            });
        }

}