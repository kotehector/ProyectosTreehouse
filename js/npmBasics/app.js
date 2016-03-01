var unsecurePlainTextPassword = "password";

var colors = require('colors');
var bcrypt = require('bcrypt');
bcrypt.genSalt(10, function(err, salt) {
	bcrypt.hash(unsecurePlainTextPassword, salt, function(err, hash) {
		console.log(hash.green);
	})
});