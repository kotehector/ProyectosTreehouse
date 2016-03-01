'use strict';

var express = require('express');
var posts = require('./mock/posts.json');
// Convertir objecto json en array (Common Pattern)
var postList =  Object.keys(posts).map(function(value){
					return posts[value];
				});

var app = express();

// Puente entre el navegador con los archivos estáticos del servidor
app.use('/static', express.static(__dirname + '/public'));

// Configuración Express. Egine Template Jade
app.set('view engine' , 'jade');
// Utilizamos la var '__dirname' para ir a la ruta del Express Server
app.set('views' , __dirname + '/templates');


// Ruta y respuesta para /home
app.get('/' , function(request, response) {
	//Mostar info a nivel de solicitud segun la ruta (_nav.jade)
	var path = request.path;
	response.locals.path = path;
	//Renderizamos /src/templates/index.jade
	response.render('index');
});

// Ruta y Response para cada Post del Blog
app.get('/blog/:title?' , function(request, response) {
	var title = request.params.title;
	if(title === undefined) {
		response.status(503);
		response.render('blog', {posts: postList});
	} else {
		var post = posts[title] || {};
		response.render('post' , { post: post });
	}
});
/*
app.get('/posts', function(req,res) {
	if (req.query.raw) {
		res.json(posts);
	} else 
		res.json(postList);
	}
});
*/

app.listen(3000, function(){
	console.log("The front-end server is running on port 3000");	
});