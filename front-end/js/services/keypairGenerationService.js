app.factory("keypairGenerationService", ["$http", function($http) {

	return {
		postKeypairGeneration: function(encryption_method, pkey_size) {
			return $http({
				method: 'GET',
				url: 'http://localhost:9200/gen_private_key?encryption_method='+encryption_method+'&'+'pkey_size='+pkey_size
			}).then(
				function successfulCallback(response) {
					return response;
				},
				function errorCallback(err){
					return err;
				}

			);
		}
	}
}]);