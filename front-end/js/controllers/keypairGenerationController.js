app.controller("KeypairGenerationController", ["$scope", "KeypairGenerationService", function($scope, KeypairGenerationService) {

	$scope.encryption_selected = false;

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

		KeypairGenerationService.generateKeypair(encryption_method, pkey_size, pkey_file, passphrase);

	}

}]);