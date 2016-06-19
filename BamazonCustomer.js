//Require modules
var mysql = require('mysql');
var inquirer = require('inquirer');

//Connection configuration
var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3306,
  user     : 'root',
  password : 'root',
  database : 'bamazon_db'
});

//Establishing connection
connection.connect();
//Making a query to display all of the products available
connection.query('SELECT * FROM product', function(err, rows, fields) {
  if (err) throw err;
 	for (var i = 0; i < rows.length; i++) {
 		console.log(rows[i].itemID + ": "+ rows[i].productName + " || Price: $" + rows[i].price);
 		console.log("---------------------------------------------------");
 	}	
	start()
});

//Main function for this script file
function start() {
inquirer.prompt([
		{
			type: 'input',
			name: 'itemID',
			message: 'Which item ID would you like to buy (Ctrl + C to exit)?'
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to buy?'
		}
		]).then(function (response) {
			connection.query('SELECT * FROM product WHERE ?', {itemID: response.itemID}, function(err, rows, fields) {
				if (err) throw err;

					//If user input quantity is less than or equal to the stock quantity, allow purchase
					if (response.quantity <= rows[0].stockQuantity) {
						//Calculate total cost of transaction
						var cost = response.quantity * rows[0].price;
						console.log("Total transaction cost: " + cost);
						//Calculate the new available quantity after purchase
						var updateQuantity = rows[0].stockQuantity - response.quantity; 
						//Update the product table with the new quantity
						connection.query('UPDATE product SET ? WHERE ?', [{stockQuantity: updateQuantity}, 
							{itemID: response.itemID}], function(err,rows,fields) {
							if (err) throw err;
						})
						
						//Update the department table
						connection.query('SELECT * FROM department WHERE ?', {departmentName: rows[0].departmentName}, function(err,rows,fields) {
						var updateTotal = rows[0].totalSales + cost;
						connection.query('UPDATE department SET ? WHERE ?', [{totalSales: updateTotal}, 
							{departmentName: rows[0].departmentName}], function(err,rows,fields) {
							if (err) throw err;
						})
						})
						start();
						}
						else {
						console.log('Not enough items in stock.');
						start();
						}
			})//close top connection query
});
}
