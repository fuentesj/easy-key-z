app.controller("TruststoreConfigurationController", ["$scope", "TruststoreConfigurationService", function($scope, TruststoreConfigurationService) {

	$scope.truststores = undefined;

	$scope.$watch('$viewContentLoaded', function() {

		var promise = TruststoreConfigurationService.fetchTruststores();
		promise.then(
			function success(response) {
				$scope.truststores = response.data.results;
			},
			function error(error) {
				console.log("error with loading trustores");
			}
		);

	});


}]);