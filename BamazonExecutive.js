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
function choices() {
	inquirer.prompt([
    {
        type: 'list',
        name: 'selection',
        message: "What action would you like to take?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }
	]).then(function (response) {
    	if (response.selection === 'View Product Sales by Department') view();
    	if (response.selection === 'Create New Department') newDepartment();
	});
}
//Start the main function with the prompt
choices();

//Function that displays the department table from the db
function view() {
	//query db to retrieve the product sales by department
	connection.query('SELECT * FROM department', function(err,rows,fields) {
	if (err) throw err;
	for (var i = 0; i < rows.length; i++) {
		var profits = rows[i].totalSales - rows[i].overHeadCosts;
	console.log(rows[i].departmentID + ": "+ rows[i].departmentName + " || Overhead Costs: $" + 
	rows[i].overHeadCosts + " || Product Sales: " + rows[i].totalSales + " || Total Profit: " + profits);
	console.log("---------------------------------------------------");
	}
	})
choices();
}

//Function that creates a new department for the department table
function newDepartment() {

	inquirer.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the department you want to add?'
			},
			{
				type: 'input',
				name: 'price',
				message: 'What will be the estimated over head cost?'
			}
		]).then(function(response) {
			//Query that inserts the user response to the sql database
			connection.query('INSERT INTO department SET ?', {departmentName: response.name, overHeadCosts: response.price})
			choices();
		})
}
