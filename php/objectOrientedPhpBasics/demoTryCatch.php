<?php 
	try {
		// Aquí va nuestro código
	} catch (Exception $e) {
		// Métodos para usar en la excepción del error
		$e->getMessage();
		$e->getCode();
		$e->getFile();
		$e->getTrace();
		$e->getTraceAsString();
		$e->__toString();
	}
 ?>