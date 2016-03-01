// Creamos y solicitamos los archivos que necesitamos para nuestra App
var EventEmitter = require("events").EventEmitter;
var https = require("https");
var util = require("util");

/**
 * Un EventEmitter para conseguir el perfil en Treehouse.
 * Crear un objeto con los datos del perfil.
 * @param username
 * @constructor
 */
function Profile(username) {

    EventEmitter.call(this);

    profileEmitter = this;

    // Conectar con la API URL (http://teamtreehouse.com/username.json)
    var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            //profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + https.STATUS_CODES[response.statusCode] + ")"));
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + response.statusCode + ")"));
        }

        // Leer los datos
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parsear los datos
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

// Exportar módulo
module.exports = Profile;