var app = angular.module('EasyKeyzApp', ['ngRoute']);

app.config(function($routeProvider) {


	$routeProvider
		.when('/keypairGeneration', {
			templateUrl: 'static/partials/keypairGeneration.html'
		})

		.when('/csrGeneration', {
			templateUrl: 'static/partials/csrGeneration.html'
		})

		.when('/truststoreConfiguration', {
			templateUrl: 'static/partials/truststoreConfiguration.html'
		});

});