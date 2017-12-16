var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    start();
})

function start() {
    
    inquirer.prompt([
        {
            name: "welcome",
            type: "list",
            message: "Welcome, to the management system. What can I do for you today?",
            choices: ["View Products for Sale",
                      "View Low Inventory",
                      "Add to Inventory",
                      "Add New Product",
                      "Exit"]
        }
    ]).then(function(answer){
        var command = answer.welcome;

        switch(command){
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
};

function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        console.log("--------------------------------------------------------------");
        res.forEach(function(obj){
            console.log(`ID: ${obj.item_id} || Item: ${obj.product_name} || Price: $${obj.price} || Quantity: ${obj.stock_quantity}`)
        });
        console.log("--------------------------------------------------------------");
        
        start();
    });
};

function lowInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        console.log("--------------------------------------------------------------");
        res.forEach(function(obj){
            if (obj.stock_quantity < 5){
                console.log(`ID: ${obj.item_id} || Item: ${obj.product_name} || Price: $${obj.price} || Quantity: ${obj.stock_quantity}`)
            };
        });
        console.log("--------------------------------------------------------------");
       
        start();
    });
};

function addInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        console.log("--------------------------------------------------------------");
        res.forEach(function(obj){
            console.log(`ID: ${obj.item_id} || Item: ${obj.product_name} || Price: $${obj.price} || Quantity: ${obj.stock_quantity}`)
        });
        console.log("--------------------------------------------------------------");

        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "Please enter the ID number of the item you wish to update"
            },
            {
                name: "quantity",
                type: "input",
                message: "What would you like the stock amount set to?"
            }
        ]).then(function(answer){

            console.log(answer.item);
    
            connection.query("UPDATE products SET ? WHERE ?", 
                [{stock_quantity: answer.quantity},{item_id: answer.item}], 
                function (err, resp) {
                    if (err) {
                        throw err;
                    }
                   console.log("Stock was successfully updated!");
                   start();
                }
            );
        });
    });
};

function newProduct(){
    
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What new item would you like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "Which department is it in?"
        },
        {
            name: "price",
            type: "input",
            message: "How much would you like to sell it for?"
        },
        {
            name: "inventory",
            type: "input",
            message: "How many do you want to add?"
        }
    ]).then(function(answer){
        
        connection.query("INSERT INTO products SET ?",
            [{
                product_name: answer.item,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.inventory
            }],
            function (err) {
                if (err) {
                    throw err;
                }
                console.log(answer.item + " was successfully added to the store!");
                start();
            }
        )
    })
};

