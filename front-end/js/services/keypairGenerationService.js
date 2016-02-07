app.factory("KeypairGenerationService", ["$http", function($http) {
	
	return {
		generateKeypair: function(encryption_method, pkey_size) {
			return $http({
				method: 'POST',
				url: 'http://localhost:5000/keypair?encryption_method='+encryption_method+'&'+'pkey_size='+pkey_size
			}).then(
				function successfulCallback(response) {
					console.log("success");
					return response;
				},
				function errorCallback(err) {
					console.log("error")
					return err;				
				}
			);
		}
	}

}]);