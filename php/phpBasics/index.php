<?php 
  
  // Constantes
  define("YEAR", 2014);
  define("JOB_TITLE", "Web Developer");
  define("MAX_BADGES", 150000);
  define("USE_FULL_NAME", false);
  
  // Nombre inválido para constantes
  //define("2LEFIT", "to quit");

  // Variables
  $first_name = "Héctor";
  $last_name = "Menduíña";
  $location = "Taipei, TW";
  $role = "Student";

  // Condicional IF/ELSE
  if (USE_FULL_NAME == True) {
    $name = $first_name . ' ' . $last_name;
  } else {
    $name = $first_name;
  }

  // Condcional IF/ELSEIF
  if ($role == "Teacher") {
    $info = "I am a teacher at Treehouse";
  } elseif ($role == "Student") {
    $info = "I am a student at Treehouse";
  } else {
    $info = "I am just visiting";
  }

  $social_icons = array('twitter', 'facebook', 'google', 'instagram');


 ?>

<!DOCTYPE html>
<html>
  <head>
  	<meta charset=utf-8>
  	<title><?php echo $name ?> | Treehouse Profile</title>
  	<link href="css/style.css" rel="stylesheet" />
  </head>
  
  <body>
    <section class="sidebar text-center">
      <div class="avatar">
        <img src="img/avatar.png" alt="<?php echo $name ?>">
      </div>
      <h1><?php echo $name ?></h1>
      <p><?php echo $location ?></p>
      <hr />
      <p>Welcome to PHP Basics!</p>
      <hr />
      <p><?php echo $info ?></p>
      <hr />
      <ul class="social">
        <?php // condicional FOREACH loop ?>
        <?php foreach ($social_icons as $icon) { ?>
          <li><a href=""><span class="icon <?php echo $icon ?>"></span></a></li>
        <?php } ?>
      </ul>
    </section>
    <section class="main">
      <p>Let's Get Started!</p>
      <p><?php echo "Hello, World!" ?></p>
      <ul>
        <?php 
          // condicional FOR loops
          for ($i=1; $i <= 10 ; $i++) { 
            echo "<li>" . $i . "</li>";
          }
        ?>
      </ul>
      <pre>
        <?php 
          
          $one = 1; // Integer
          $two = 2; // Integer
          $three = 3; // Integer

          $string_one = "1"; // String
          $greeting = "Hello Friends!"; // String         
          $greeting{0} = "JJJ"; // substituir un caracter de la cadena {}
          $secondary_greeting = "How was your day?";

          $distance_to_home = 1.2; // Floats
          $distance_to_work = 2.5; // Floats

          $bool = TRUE; // Boolean
          var_dump($bool);
          $bool = FALSE; // Boolean
          var_dump($bool);

          var_dump((bool) "");
          var_dump((bool) 0);
          var_dump((bool) 0.0);
          var_dump((bool) array());
          
          var_dump((bool) "abc");
          var_dump((bool) 1);
          var_dump((bool) 1.2);
          var_dump((bool) -1);

          
          $array_example = array(); // Array vacio
          print_r($array_example);
          
          $eye_colors = array('blue','green','brown'); // Array 
          print_r($eye_colors);
          $eye_colors[1] = "pink";
          echo $eye_colors[1];
          
          $hector = array(7, "blue", 1.2, TRUE); // Array con datos de tipo diferentes
          print_r($hector);

          // Associative Arrays
          $cars_colors = array(
            'bmw' => 'blue',
            'renault' => 'red',
            'seat' => 'green'
          );
          print_r($cars_colors);
          $cars_colors['bmw'] = "pink";
          echo $cars_colors['bmw'];


          // Operadores
            $a = 10;
            $b = 10;
            $c = 20;
            $d = "10";
            $e = TRUE;
            $f = TRUE;
            
            $sum = $a + $b; 
            $diff = $a - $b;
            $product = $a * $b;
            $division = $a / $b;
            
            $sum++; // Auto-incremento
            $product--; // Auto-decremento

            // Comparaciones
            var_dump($a == $b); // igual
            var_dump($a === $d); // identico tipo y dato
            var_dump($a != $c); // no igual
            var_dump($a !== $b); // no identico

            var_dump($a < $b); // menos que
            var_dump($c > $b); // mayor que
            var_dump($a <= $c); // menos que o igual a
            var_dump($a >= $b); // mayor que o igual a

            var_dump($e and $f); // TRUE e AND f es TRUE
            var_dump($e or $f); // TRUE e OR f es TRUE
            var_dump(! $e); // TRUE e is NOT TRUE 




         ?>
      </pre>
      <!-- Operaciones -->
      <ul>
        <li><?php echo $sum; ?></li>
        <li><?php echo $diff; ?></li>
        <li><?php echo $product; ?></li>
        <li><?php echo $division; ?></li>
      </ul>
      <!-- Funcion para saber tipo de dato gettype(var) -->
      <ul>
        <li><?php echo gettype($one) ?></li>
        <li><?php echo gettype($string_one) ?></li>
      </ul>

      <ul>
        <!-- Integer y Floats -->
        <li><?php echo $one + $two ?></li>
        <li><?php echo $distance_to_work * $distance_to_home + $three ?></li>
        <!-- String -->
        <li><?php echo $greeting ?></li>
        <li><?php echo $greeting{0} ?></li>
        <li><?php echo $secondary_greeting ?></li>
        <!-- Constantes -->
        <li><?php echo YEAR ?></li>
        <li><?php echo JOB_TITLE ?></li>
      </ul>
      
    </section>
  </body>
</html>