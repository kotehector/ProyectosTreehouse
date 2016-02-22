// Problema: Las interacciones del usuarion no provacan cambios en la app.
// Solución: Hacer que funcione la app y responda a las interacciones del usuario.

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $("canvas")[0].getContext("2d");
var lastEvent;
var mouseDown = false;

// Cuando hacemos "click" en cada uno de los colores
$(".controls").on("click", "li", function(){
  // Deseleccionar el elemento seleccionado
  $(this).siblings().removeClass("selected");
  // Seleccionar el elemento "clickeado"
  $(this).addClass("selected");
  // Cambiar Css
  color = $(this).css("background-color");
});
  

// Cuando un nuevo color es presionado
$("#revealColorSelect").click(function(){
  // Mostrar o ocultar el color seleccionado
  changeColor();
  $("#colorSelect").toggle();
});
  
// Función para actualizar el nuevo color
function changeColor(){
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

// Cuando cambia el color del slider de colores
$("input[type=range]").change(changeColor);

// Cuando "Añadir Color" es precionado
$("#addNewColor").click(function(){
  // Añadimos el color a la <ul> de controles
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  // Seleccionamos un nuevo color
  $newColor.click();
});
  

// Eventos del ratón en el canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
   // Dibujamos lineas
   if(mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
   }
}).mouseup(function(){
    mouseDown = false;
}).mouseleave(function(){
	$canvas.mouseup();
});



 













