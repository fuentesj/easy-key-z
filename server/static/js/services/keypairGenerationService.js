app.factory("KeypairGenerationService", ["$http", function($http) {
	
	return {
		generateKeypair: function(encryption_method, pkey_size, pkey_file, passphrase) {

			return $http({
				method: 'POST',
				url: 'http://localhost:5000/keypair',
				data: {
					'encryption_method': encryption_method,
					'pkey_size': pkey_size,
					'pkey_file': pkey_file,
					'passphrase': passphrase
				}
			});
		}
	}

}]);