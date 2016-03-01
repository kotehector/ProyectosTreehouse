/*
* Creamos la Directiva Todos y le asociamos un Controller y un Template
*/
angular.module('todoListApp')
.directive('todos', function() {
	return {
		templateUrl:  'templates/todos.html',
		controller: 'mainCtrl'
	}
})