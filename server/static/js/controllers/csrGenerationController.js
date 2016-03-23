app.controller("CsrGenerationController", ["$scope", "CsrService", function($scope, CsrService) {

	$scope.private_keys = undefined;
	$scope.private_key_selected = false;
	$scope.private_key = null;
	$scope.showSuccessAlert = false;
	$scope.showErrorAlert = false;
	$scope.errorMessage = "";
	$scope.csr = "";

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
		var promise = CsrService.generateCsr(commonName, organization, organizationalUnit, city, state, country, email, $scope.private_key, csrFilename)
		promise.then(
			function successfulCallback(response) {
				console.log(response)
				if ($scope.showErrorAlert) {
					$scope.showErrorAlert = false;
				}
				$scope.showSuccessAlert = true;
			},
			function errorCallback(err) {
				if ($scope.showSuccessAlert) {
					$scope.showSuccessAlert = false;
				}
				$scope.errorMessage = err["data"];
				$scope.showErrorAlert = true;
			}
		);
	}

}]);