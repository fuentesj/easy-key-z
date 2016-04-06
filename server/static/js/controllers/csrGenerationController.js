app.controller("CsrGenerationController", ["$scope", "CsrService", function($scope, CsrService) {

	$scope.private_keys = undefined;
	$scope.private_key_selected = false;
	$scope.private_key = null;
	$scope.showSuccessAlert = false;
	$scope.showErrorAlert = false;
	$scope.errorMessage = "";
	$scope.csr = "";
	$scope.isEncrypted = false;
	$scope.commonName = null;
	$scope.organization = null;
	$scope.organizationalUnit = null;
	$scope.city = null;
	$scope.state = null;
	$scope.country = null;
	$scope.email = null;
	$scope.private_key = null;
	$scope.passphrase = null;
	$scope.csrFilename = null;

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

	$scope.generateCsr = function() {
		
		if (!$scope.private_key || !$scope.commonName || $scope.csrFilename) {
			if ($scope.showSuccessAlert) {
				$scop.showSuccessAlert = false;
			}
			$scope.errorMessage = "Please fill out all required fields.";
			$scope.showErrorAlert = true;
		}

		var postData = {
			"commonName": $scope.commonName,
			"organization": $scope.organization,
			"organizationalUnit": $scope.organizationalUnit,
			"city": $scope.city,
			"state": $scope.state,
			"country": $scope.country,
			"email": $scope.email,
			"private_key": $scope.private_key,
			"passphrase": $scope.passphrase,
			"csrFilename": $scope.csrFilename
		};

		var promise = CsrService.generateCsr(postData)
		promise.then(
			function successfulCallback(response) {
				console.log(response)
				if ($scope.showErrorAlert) {
					$scope.showErrorAlert = false;
				}
				$scope.showSuccessAlert = true;
				$scope.csr = response.data["csr"][0]
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