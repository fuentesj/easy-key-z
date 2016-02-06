app.controller("KeypairGenerationController", function($scope, keypairGenerationService) {

	$scope.generatePrivateKey = function() {
		keypairGenerationService.generatePrivateKey(this.encryption_method, this.pkeySize).then(function(result) {
			console.log(result)
		});
	};
});