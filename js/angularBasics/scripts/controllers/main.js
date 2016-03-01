'use strict';

// asociamos el controlador con nuestra app.js
angular.module('todoListApp')

/* Pasamos el $scope y el dataService como parametro */
.controller('mainCtrl' , function($scope, dataService) {
	$scope.addTodo = function() {
		var todo = {name: "This is a new todo."};
		$scope.todos.unshift(todo);
	};

	// Forma de traer un servicio al $scope
	$scope.helloConsole = dataService.helloConsole;

	$scope.helloWorld = function() {
		console.log("Hello! This is the helloWorld controller function in the mainCtrl");
	};

	// Metodo para conseguir todos los datos
	dataService.getTodos(function(response) {
		console.log(response.data);
		$scope.todos = response.data;
	});

	// Metodo para borrar 1 elemnto de la bd
	$scope.deleteTodo = function(todo, $index) {
		dataService.deleteTodo(todo);
		$scope.todos.splice($index, 1);
	};

	// Metodo para guardar 1 elemnto de la bd
	$scope.saveTodos = function() {
		var filteredTodos = $scope.todos.filter(function(todo) {
			if(todo.edited) {
				return todo;
			}
		})
		dataService.saveTodos(filteredTodos);
	};

})