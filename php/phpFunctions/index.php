<?php 
	
	/* 
	 * Función Básica
	*/
	function hello() {
		echo "Hello World!" . "<br>";	
	}	
	hello();	// Llamada a función

	
	$current_user = "Hector";	// Variable Global
	/* 
	 * Función con condicional 
	*/
	function is_hector() {
		global $current_user; // Usamos la variable global
		if ($current_user == "Hector") {
			echo "Hello Hector!" . "<br>";
		} else {
			echo "Hector is out" . "<br>";
		}
	}
	is_hector();

	
	/*
	 * Función Básica con argumento 
	*/
	function greet($name) {
		echo "Hello, $name, how's it going?" . "<br>";
	}
	greet("Mike");	// Llamada a función con arg

	
	/* 
	 * Función con Array de argumento 
	*/
	function greet_array($nombres) {
		//comprobamos si es un array
		if (is_array($nombres)) {
			//recorremos el array
			foreach ($nombres as $name) {
				echo "Hello, $name, how's it going?" . "<br>";
			}
		} else {
			echo "Hello to everyone!" . "<br>";
		}
	}
	$nombres = array(
		"Hector",
		"Juan",
		"Raquel"
	);
	greet_array($nombres);


	/*
	 * Función con arg por defecto
	*/
	function greet_default_args($name = "friend",
								$time_of_day = null) {
		if ($time_of_day) {
			echo "Hi, $name, good $time_of_day!" . "<br>";
		} else {
			echo "Hi, $name!" . "<br>";
		}
	}
	greet_default_args();
	greet_default_args('Raquel','afternoon');
	greet_default_args('Juan');



	/*
	 * Función con "return"
	*/
	function hello_return($name) {
		if($name == "Mike") {
			return "Hello Mike! <br>";
		} else {
			return "Hello World! <br>";
		}
	}
	$hello = hello_return();
	echo $hello;

	function sum($a, $b) {
		return $a + $b;
	}
	$sum = sum(2,5);
	echo $sum . "<br>";

	// función que "return" un Array
	function add_up($a, $b) {
		$arr = array(
			$a,
			$b,
			$a + $b
		);
		return $arr;
	}
	$array_valores = add_up(2,8);
	var_dump($array_valores);
	echo "<br>" . $array_valores[2] . "<br>";


	/*
	* Variable functions: forma de usar el valor de una
	* variable como una función.
	*/
	function answer() {
		return 42 . "<br>";
	}

	function add_down($a, $b) {
		return $a - $b . "<br>";
	}

	$func = 'answer';
	echo $func();

	$func2 = 'add_down';
	echo $func2(5,2);


	/*
	* PHP Closures
	* Los cierres son funciones anónimas, que son 
	* funciones sin nombre, que son capaces de acceder a 
	* las variables fuera del ámbito de la función. 
	*/

	$name = "Hector";

	$greet_closures = function() use($name) {
		echo "Hi, $name!" . "<br>";
	};
	$greet_closures();


	/*
	* PHP String Functions 
	* Internal (built-in) Functions
	* Propias del lenguaje 
	*/
	$phrase = "We only hit what we aim for";

	// longitud de un string: strlen(string)
	$len = strlen($phrase);
	echo $len . "<br>";

	// Trozo de un string: substr(string,start,final)
	$sub = substr($phrase, 5, 10);
	echo $sub . "<br>";

	// Posición (int) en un string de un trozo: strpos(string,string)
	$pos = strpos($phrase, 'hit');
	echo $pos . "<br>";

	echo substr($phrase, $pos) . "<br>";


	/*
	* PHP Funciones Array 
	*/
	$names = array(
		'Mike'   => 'Frog',
		'Chris'  => 'Teacher',
		'Hector' => 'Student'
	);
	var_dump($names);
	echo "<br>";

	// Array de claves de un array: arraykeys(array)
	foreach (array_keys($names) as $name) {
	 	echo "Hello $name! <br>";
	}

	// Aplicar una función a cada elemento de un array
	function print_info_names($value,$key) {
		echo "$key is a $value <br>";
	}
	array_walk($names, 'print_info_names');














