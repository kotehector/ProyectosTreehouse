angular.module('todoListApp')
	/* creamos una <tag> .directive('nombreDirective', callBackFunction(){}*/
	.directive('helloWorld', function() {
		/* devolvemos un object {
							template: "hello world text", -> Template de la <tag>
							restrict: "E"} -> restrict directive to use an element only
		 */
		return {
			template: "<h1>This is the hello world directive</h1>",
			restrict: "E"
		}
	})