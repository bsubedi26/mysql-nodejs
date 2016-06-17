//Require modules
var mysql = require('mysql');
var inquirer = require('inquirer');

//Connection configuration
var connection = mysql.createConnection({
  host     : 'localhost',
  port		: 3306,
  user     : 'root',
  password : 'root',
  database : 'bamazon_db'
});

//Establishing connection
connection.connect();

//Function that prompts the user with several options
function options() {
	inquirer.prompt([
    {
        type: 'list',
        name: 'selection',
        message: "What action would you like to take?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
	]).then(function (response) {
    	if (response.selection === 'View Products for Sale') viewProducts();
    	if (response.selection === 'View Low Inventory') viewLow();
    	if (response.selection === 'Add to Inventory') addInventory();
    	if (response.selection === 'Add New Product') addNew();
	});
}
//Start the main function with the prompt
options();

//Function that displays all the products for sale
function viewProducts() {
	connection.query('SELECT * FROM product', function(err, rows, fields) {
  	if (err) throw err;
 	for (var i = 0; i < rows.length; i++) {
 		console.log(rows[i].itemID + ": "+ rows[i].productName + " || Price: $" + rows[i].price + " || Quantity: " + rows[i].stockQuantity);
 		console.log("---------------------------------------------------");
 	}
	});
options();
}

//Function that displays the products that are low in inventory
function viewLow() {
	connection.query('SELECT * FROM product WHERE stockQuantity < 15', function(err,rows,fields) {
		if (err) throw err;
		for (var i = 0; i < rows.length; i++) {
 		console.log(rows[i].itemID + ": "+ rows[i].productName + " || Price: $" + rows[i].price + " || Quantity: " + rows[i].stockQuantity);
 		console.log("---------------------------------------------------");
 	}
	options();
	})
}

//Function that allows user to add to the inventory
function addInventory() {
	connection.query('SELECT * FROM product', function(err, rows, fields) {
  	if (err) throw err;
 	for (var i = 0; i < rows.length; i++) {
 		console.log(rows[i].itemID + ": "+ rows[i].productName + " || Quantity: " + rows[i].stockQuantity);
 		console.log("---------------------------------------------------");
 	}
	})

	//Wait 1 second before running function (better transition)
	setTimeout(wait, 1000);

	function wait() {
		inquirer.prompt([
			{
				type: 'input',
				name: 'item',
				message: 'What is the item ID for the item you want to add?'
			},
			{
				type: 'input',
				name: 'quantity',
				message: 'How many items do you want to add?'
			}
		]).then(function(response) {
				//query that selects the product that matches the response item id
				connection.query('SELECT * FROM product WHERE ?', {itemID: response.item}, function (err,rows,fields) {
				//Add the number of items the user wants to add to the stock quantity
				var updateQuantity = parseFloat(rows[0].stockQuantity) + parseFloat(response.quantity);
				//Update the product table with the new quantity amount
				connection.query('UPDATE product SET ? WHERE ?', [{stockQuantity: updateQuantity},{itemID: response.item}], function (err,rows,fields) {	
			})
			})
			options();
		})
}
}

//Function that allows user to add a new product
function addNew() {
		inquirer.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the item you want to add?'
			},
			{
				type: 'input',
				name: 'price',
				message: 'What is the stock price for this item?'
			},
			{
				type: 'input',
				name: 'quantity',
				message: 'How many items do you want to add?'
			},
			{
				type: 'input',
				name: 'department',
				message: 'Which department does this item belong?'
			}
		]).then(function(response) {
			//Query that inserts the user response to the sql database
			connection.query('INSERT INTO product SET ?', {productName: response.name, departmentName: response.department, price: response.price, stockQuantity: response.quantity})
			options();
		})
}