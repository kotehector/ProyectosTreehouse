//Problema: Demasiado ancho para dispositivos pequeños.
//Solución: Esconder los liks y encerrarlos en un modo de navegación más apropiado.

// Crear elemento <select> y lo añadimos al menu
var $select = $("<select></select");
$("#menu").append($select);

// Recorremos los <a> del #menu
$("#menu a").each(function(){
    var $anchor = $(this);
   
    // Creamos elemento <option>
    var $option = $("<option></option>");
   
    // Tratar con las opciones seleccionadas en función de la pág. actual
    if($anchor.parent().hasClass("selected")){
        $option.prop("selected" , true);
    }
    
    // El valor del <option> es el "href"
    $option.val($anchor.attr("href"));
    // El texto de la <option> es el texto del <a>
    $option.text($anchor.text());
    // Añadimos el <option> al <select>
    $select.append($option);
});   
    


// Unimos el boton al click
$select.change(function(){
    // Vamos a la localicación escogida.
    window.location = $select.val();    
});









