<?php 

	/**
	*	Plantilla para una un objeto en PHP
	*/
	class Product {

		public static $manufacter = "Hector Menduiña";
		//Propiedades
		public $name = "default_name";
		public $price = 0;
		public $desc = "default_description";

		//Constructor
		function __construct($name, $price, $desc) {
			$this->name = $name;
			$this->price = $price;
			$this->desc = $desc;
		}

		//Métodos
		public function getInfo(){
			$message = "Product name: " . $this->name . "<br>" .		
					   "Price: " . $this->price . "$ <br>" .
					   "Product description: " . $this->desc . "<br>";
					   ;
			return  $message; 
		}

		public function getMaker(){
			return self::$manufacter."<br><br>";
		}
	}


	/**
	*  Ejemplo de herencia de un objeto en PHP
	*/
	class Soda extends Product {
		//Propiedades
		public $flavor;
		
		//Constructor
		function __construct($name, $price, $desc, $flavor) {
			parent :: __construct($name, $price, $desc);
			$this -> flavor = $flavor;
		}

		//Métodos
		public function getInfo(){
			$message = "Product name: " . $this->name . "<br>" .		
					   "Price: " . $this->price . "$ <br>" .
					   "Product description: " . $this->desc . "<br>" .
					   "Flavor : " . $this->flavor . "<b";
					   ;
			return  $message; 
		}
	}


	// Creamos un Producto
	$shirt = new Product("Space Juice T-Shirt", 20, "Awesome Grey T-Shirt" );
	
	// Creamos un Producto con herencia
	$soda = new Soda("Space Juice Soda", 2, "Thirst Multilator" , "Grape");

	echo $shirt -> getInfo();
	echo $shirt -> getMaker();
	echo $soda -> getInfo();


	// Métodos para comprobas el objeto
	method_exists($shirt, "getPrice");
	is_subclass_of($soda, "Product");

 ?>