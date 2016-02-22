'use strict'
//Problema: Cuando el usuario hace "click" en la imagen va a un callejón sin salida.
//Solución: LightBox - Crear una superposición con la imagen a gran tamaño.


/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<< Creación del Overlay <<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<</

/* 1. Creamos un Overlay(capa superpuesta) para mostrar el slider
   2. Los encerramos $() para convertirlos en un objeto JQuery
   3. Le ponemos $ para indicar que es un objecto jQuery
*/
var  $overlay = $('<div id="overlay"></div>');
var $image = $("<img>"); //creamos una imagen que sera el "container"
var $caption = $("<p></p>");

// Añadimos al Overlay la foto
$overlay.append($image);

// Añadimos el titulo al Overlay
$overlay.append($caption);

// Añadir overlay al final del body
$("body").append($overlay);
  
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>> Fin Overlay >>>>>>>>>>>>>>>>>>>>>*/



/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<< Click en un foto <<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

// Capturamos el "event click" al hacer "click" en una imagen
 $(".item_galery").click(function(event){
   // Previene el comportamiento del "event" clickeado
   event.preventDefault();
   // Cogemos la localizacion de la imagen y la guardamos 
   var imageLocation = $(this).attr("href");
   console.log(imageLocation);
   
   // Actualizamos el attr "src" de la imagen del overlay con la localizacion de la imagen
   $image.attr("src",imageLocation);
   
   // Cogemos  el atributo "alt" de la img y lo hacemos el texto del Overlay
   var captionText = $(this).children("img").attr("alt");
   $caption.text(captionText);

   // Mostrar el Overlay
   $overlay.show();
 });


// Cuando hacemos "click" en el Overlay lo escondemos
$overlay.click(function(){
    //  Escondemos el Overlay
    $overlay.hide();  
});
