var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

module.exports = function(request, response) {
	var username = request.body.username;
	var fullname = request.body.fullname;
	var email = request.body.email;
	var password = request.body.password;
	
	connection.query('INSERT INTO accounts (username, fullname, email, password) VALUES("' + [username] + '","' + [fullname] + '","' + [email] + '","' + [password] + '")');
	
	response.redirect('/');
};