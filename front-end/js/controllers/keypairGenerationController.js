app.controller("KeypairGenerationController", ["$scope", "KeypairGenerationService", function($scope, KeypairGenerationService) {

	$scope.generateKeypair = function(encryption_method, pkey_size) {
		
		if (!encryption_method) {
			encryption_method = "none";
		}

		if (!pkey_size) {
			pkey_size = 512;
		}

		KeypairGenerationService.generateKeypair(encryption_method, pkey_size);

	}

}]);