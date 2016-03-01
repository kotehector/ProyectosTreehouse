'use strict';

/*
* Creamos el servicio con los métodos necesarios para acceder a los datos
*/
angular.module('todoListApp')
.service('dataService', function($http) {

	this.helloConsole = function () {
		console.log("This is the hello service!");
	};

	// Metodo para hacer un peticion get a un servidor
	this.getTodos = function(callback) {
		$http.get('mock/todos.json')
		.then(callback)
	};

	// Metodo para borrar un elemento del servidor
	this.deleteTodo = function(todo) {
		console.log("The " + todo.name + " has been deleted!");
	};

	// Metodo para guardar un elemento en el srvidor
	this.saveTodos = function(todos) {
		console.log("The " + todos.length + " tdodos has been saved!");
	};

})