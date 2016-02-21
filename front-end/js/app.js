var app = angular.module('EasyKeyzApp', ['ngRoute']);

app.config(function($routeProvider) {


	$routeProvider
		.when('/keypairGeneration', {
			templateUrl: '../views/keypairGeneration.html'
		})

		.when('/csrGeneration', {
			templateUrl: '../views/csrGeneration.html'
		})







})