app.controller("CsrGenerationController", ["$scope", "CsrService", function($scope, CsrService) {

	$scope.generated_csrs = undefined;
	$scope.private_key_selected = false;

	$scope.privateKeySelected = function(index) {
		$scope.selected = index;
		$scope.private_key_selected = true;
	};

	$scope.$watch('$viewContentLoaded', function() {

		if (!$scope.generated_csrs) {
			var promise = CsrService.fetchGeneratedPrivateKeys()
			promise.then(
				function success(response){
					$scope.generated_csrs = response.data.results;
					console.log(response);
				},
				function error(error){

				}
			);
		}
		
	});

}]);