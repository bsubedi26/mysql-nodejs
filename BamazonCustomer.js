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

function start() {
inquirer.prompt([
		{
			type: 'input',
			name: 'itemID',
			message: 'Which item ID would you like to buy?'
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

						var cost = response.quantity * rows[0].price;
						console.log("Total transaction cost: " + cost)
						
						var updateQuantity = rows[0].stockQuantity - response.quantity; 

						connection.query('UPDATE product SET ? WHERE ?', [{stockQuantity: updateQuantity}, 
							{itemID: response.itemID}], function(err,rows,fields) {
							if (err) throw err;
							console.log(rows)
						})
					}
					else {
						console.log('Not enough items in stock.')
					}
			})

});
}
