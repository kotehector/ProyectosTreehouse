// Problema: Necesitamos una manera simple de conocer los datos de perfil del usuario
// Solución: Usar Node.js para actualizar nuestro template a través de una petición GET

// Creamos y solicitamos los archivos que necesitamos para nuestra App
var router = require("./router.js");

// Creamos un Servidor Web local
var http = require('http');
http.createServer(function (request, response) {
	router.home(request, response); // route to home page
	router.user(request, response); // route to user page
}).listen(1337, "127.0.0.1");


console.log('Server running at http://127.0.0.1:1337/');


