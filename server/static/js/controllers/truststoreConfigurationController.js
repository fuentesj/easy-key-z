app.controller("TruststoreConfigurationController", ["$scope", "TruststoreConfigurationService", function($scope, TruststoreConfigurationService) {

	$scope.truststores = undefined;
	$scope.selectedTruststore = undefined;
	$scope.alias = undefined;
	$scope.passphrase = undefined,
	$scope.certificate = undefined;
	$scope.showSuccessAlert = false;
	$scope.showErrorAlert = false;
	$scope.errorMessage = undefined;

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

	$scope.truststoreSelected = function(selectedTruststore) {
		$scope.selectedTruststore = selectedTruststore;
		console.log("truststore selected" + $scope.selectedTruststore);
	}

	$scope.submitCertificate = function() {

		if (!scope.selectedTruststore || !scope.alias || !scope.certificate) {
			$scope.errorMessage = "Please fill out all required fields."
			if ($scope.showSuccessAlert) {
					$scope.showSuccessAlert = false;
			}
			$scope.showErrorAlert = true;
			return;
		}

		var postData = {
			"selectedTruststore": $scope.selectedTruststore,
			"alias": $scope.alias,
			"passphrase": $scope.passphrase,
			"certificate": $scope.certificate
		};


		var promise = TruststoreConfigurationService.submitCertificate(postData);
		promise.then(
			function success(response) {
				if ($scope.showErrorAlert) {
					$scope.showErrorAlert = false;
				}
				$scope.showSuccessAlert = true
			},
			function error(error) {
				if ($scope.showSuccessAlert) {
					$scope.showSuccessAlert = false;
				}
				$scope.errorMessage = error["data"]
				$scope.showErrorAlert = true;

			}
		);
	}


}]);