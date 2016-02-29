app.controller("CsrGenerationController", ["$scope", "CsrService", function($scope, CsrService) {

	$scope.private_keys = undefined;
	$scope.private_key_selected = false;
	$scope.private_key = null;

	$scope.privateKeySelected = function(private_key) {
		$scope.private_key = private_key;
		$scope.private_key_selected = true;
	};

	$scope.$watch('$viewContentLoaded', function() {

		if (!$scope.private_keys) {
			var promise = CsrService.fetchGeneratedPrivateKeys()
			promise.then(
				function success(response){
					$scope.private_keys = response.data.results;
					console.log(response);
				},
				function error(error){

				}
			);
		}
		
	});

	$scope.generateCsr = function(commonName, organization, organizationalUnit, city, state, country, email, private_key, csrFilename) {
		CsrService.generateCsr(commonName, organization, organizationalUnit, city, state, country, email, $scope.private_key, csrFilename)
	}

}]);