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
    start();
});

function start() {
    
    inquirer.prompt([
        {
            name: "welcome",
            type: "list",
            message: "Would you like to shop or leave?",
            choices: ["Start shopping", "Exit"]
        }
    ]).then(function(answer){
        
        if (answer.welcome === "Start shopping"){
            beginShopping();
        }else{
            connection.end()
        }
    })
};

function beginShopping(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        //var itemsArr = [];
        
        console.log("-------------------------------------");
        res.forEach(function(obj){
            console.log(`ID: ${obj.item_id} || ${obj.product_name} || Price: $${obj.price}`)
        })
        console.log("-------------------------------------");
        
        inquirer.prompt([
            {
                name: "item",
                // type: "list",
                type: "input",
                message: "Type in ID number you'd like to purchase?",
                // choices: function(){
                //     for (var i = 0; i < res.length; i++) {
                    
                //         itemsArr.push({
                //             id: res[i].item_id,
                //             name: res[i].product_name,
                //             price: res[i].price,
                //             quantity: res[i].stock_quantity

                //         });
                //     }
                //     // console.log(itemsArr);
                //     return itemsArr;
                // }
            }
        ])
        .then(function(answer){
            var itemPicked = parseInt(answer.item);
            var chosenObj;
            
            for (var j = 0; j < res.length; j++){
                if(itemPicked === res[j].item_id){
                    // console.log(itemsArr[j]);
                    chosenObj = res[j];
                }
            }
            console.log("-------------------------------------");
            console.log("This " + chosenObj.product_name + " is $" + chosenObj.price);
            console.log("-------------------------------------");
            
            inquirer.prompt([
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                }
            ]).then(function(answer){
                var a = answer.quantity;
                
                if(a > chosenObj.stock_quantity){
                    
                    console.log("-------------------------------------");
                    console.log("Sorry we only have " + chosenObj.stock_quantity);
                    console.log("-------------------------------------");
                    
                    beginShopping();
                
                }else{
                    var b = (chosenObj.price * a) * 1.06;
                    var total = Math.round(b * 100) / 100

                    console.log("-------------------------------------");
                    console.log("That will be $" + total + " with tax.");
                    console.log("-------------------------------------");
                    
                    connection.query("UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: chosenObj.stock_quantity - a}, 
                            {product_name: chosenObj.product_name
                        }]
                    );
                    
                    start();
                };
            });
        });
    });
};
