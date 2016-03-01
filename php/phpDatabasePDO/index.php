<?php 

require_once('database.php');

try {
	$results = $pdo->query('select * from film');
} catch (Exception $e) {
	echo "Query is wrong: ";
	echo $e->getMessage();
	die();
}
$films = $results->fetchAll(PDO::FETCH_ASSOC);


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
		<h2>Films by title</h2>
		<ol>
		<?php 
			foreach ($films as $film) {
				echo '<li><i class="lens"></i><a href="films.php?id='.$film["film_id"].'">' . $film["title"] . '</li>';
			}
		?>
		</ol>

	</body>
</html>