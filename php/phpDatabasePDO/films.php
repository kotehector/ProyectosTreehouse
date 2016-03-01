<?php 

require_once('database.php');

if (!empty($_GET['id'])) {
	// validamos que el parametro pasado sea un int
	$film_id = intval($_GET['id']);

	try {
		// QUERY() no es seguro porque deja hacer injecciones sql en el navegador
		// $results = $pdo->query('select * from film where film_id = ' . $film_id);

		// en su lugar utilizamos PREPARE() con ? para las variables a injectar
		$results = $pdo->prepare('select * from film where film_id = :id');
		// enlazamos los ? con bindParam('nº del ?', variable)
		$results->bindParam(':id', $film_id, PDO::PARAM_INT);
		// ejecutamos la query
		$results->execute();
	} catch (Exception $e) {
		echo "Query is wrong: ";
		echo $e->getMessage();
		die();
	}

	$film = $results->fetch(PDO::FETCH_ASSOC);
	if ($film == FALSE) {
		echo "<h2>Sorry, no film was found with the provider ID.</h2>";
		die();
	}
}

?>

<!Doctype html>
<html lang="es">

	<head>
		<meta charset="UTF-8">
		<title>PHP Data Objects</title>
		<link rel="stylesheet" href="style.css">
	</head>

	<body id="home">

		<h1>Example DataBase</h1>
		<h2>
		<?php
			if (isset($film)) {
				echo $film['title'];
			} 
		?>
		</h2>
	</body>
</html>