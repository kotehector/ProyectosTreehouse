/* 
 * Problema: Necesitamos una manera simple de ver  la cantidad de badge y los puntos en JavaScript
 *           de nuestro perfil en treehouse.
 * Solución: Usar Node.js para conectarse a la API de Treehouse y obtener la información del perfil necesario.
*/

// Necesitamos el modulo "https" para hacer poder hacer peticiones al servidor externo
var https = require("https");


/**
* Funcíon para imprimir el mensaje
*/
function printMessage( username, badgeCount, profileUrl, pointsHtml, pointsCss, pointsDesign, pointsJs,
					   pointsRuby, pointsPhp, pointsWordpress, pointsIos, pointsAndroid,
					   pointsDevelopmentTools, pointsBusiness, pointsPython, pointsJava,
					   pointsDigitalLiteracy, pointsGameDevelopment ) {
	var message = username + " has " + badgeCount + " total badge(s).\n"
				+ "URL Profile: " + profileUrl + "\n" 
				+ "- HTML: " + pointsHtml + "\n"
				+ "- CSS: " + pointsCss + "\n"
				+ "- Design: " + pointsDesign + "\n"
				+ "- JavaScript: " + pointsJs + "\n"
				+ "- Ruby: " + pointsRuby + "\n"
				+ "- PHP: " + pointsPhp + "\n"
				+ "- Wordpress: " + pointsWordpress + "\n"
				+ "- iOs: " + pointsIos + "\n"
				+ "- Android: " + pointsAndroid + "\n"
				+ "- Development Tools: " + pointsDevelopmentTools + "\n"
				+ "- Business: " + pointsBusiness + "\n"
				+ "- Python: " + pointsPython + "\n"
				+ "- Java: " + pointsJava + "\n"
				+ "- Digital Literacy: " + pointsDigitalLiteracy + "\n"
				+ "- Game Development: " + pointsGameDevelopment + "\n";
	console.log(message);
}

/**
* Método para imprimir un error por consola
*/
function printError(error) {
	console.error(error.message);
}

/**
* Método para hacer la petición por GET a la API de Treehouse.
* @arg nombre de usuario del que queremos obtener los datos.
*/
function getProfile(username) {
	// 1. Nos conectamos a la API URL(https://treehouse.com/username.json) por medio de GET.
	var request = https.get("https://teamtreehouse.com/" + username + ".json" , function (response) {	
		console.log(response.statusCode);

		var body = "";
		// 2. Leemos los datos
		response.on('data' , function(chunk) {
			body += chunk;
		});
		response.on("end" , function(){
			if(response.statusCode === 200) {
				try {
					// 3. Parseamos los datos y los convertimos en un JSON
					var profile = JSON.parse(body);
					// 4. Imprimir los datos
					printMessage(username, profile.badges.length, profile.profile_url, profile.points.HTML, 
								 profile.points.CSS, profile.points.Design, profile.points.JavaScript,
								 profile.points.Ruby, profile.points.PHP, profile.points.WordPress,
								 profile.points.iOS, profile.points.Android, profile.points["Development Tools"],
								 profile.points.Business, profile.points.Python, profile.points.Java,
								 profile.points["Digital Literacy"], profile.points["Game Development"]);
				} catch(error) {
					// Parseamos el error
					printError(error);
				}
			} else {
				// Status Code Error
				printError({message: "There was an error getting the profile for " + username + ". ()"});
			}
		});
	});

	// Connection Error
	request.on("error" , printError);

}

/* Exportar el método getProfile para poder usarlo en otros archivos.
 * El nombre público para usarlo es otros archivos es: get.
*/
module.exports.get = getProfile;






