<?php
// remove before flight
ini_set('display_errors', 'On');

/*
* Todas las operaciones con la base de datos deben de hacerse
* con try/catch y recoger las excepciones.
*/
try {
	// conexión a través del driver PDO con mysql
	$pdo = new PDO(
		//'mysql:host=localhost;dbname=hector;port=3306;charset=utf8',
		'mysql:host=localhost;dbname=sakila;port=3306;charset=utf8',
		'root',
		'root'
	);

	// lanza una excepción cuando hay un error en la query
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


} catch (Exception $e) {
	// Database connection failed
	echo "Database connection failed: ";
	echo $e->getMessage();
	exit;
}



 ?>