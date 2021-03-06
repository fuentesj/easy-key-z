app.controller("KeypairGenerationController", ["$scope", "KeypairGenerationService", function($scope, KeypairGenerationService) {

	$scope.encryption_selected = false;
	$scope.showSuccessAlert = false;
	$scope.showErrorAlert = false;
	$scope.errorMessage = "";
	$scope.passphrase = "";

	$scope.clearPassphrase = function() {
		$scope.passphrase = "";
	};

	$scope.generateKeypair = function(encryption_method, pkey_size, pkey_file, passphrase) {
		
		if (!encryption_method) {
			encryption_method = "";
		}

		if (!pkey_size) {
			pkey_size = "512";
		}

		if (!pkey_file) {
			pkey_file = "pkey.pem"
		}

		var promise = KeypairGenerationService.generateKeypair(encryption_method, pkey_size, pkey_file, passphrase)
		promise.then(
			function successfulCallback(response) {
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