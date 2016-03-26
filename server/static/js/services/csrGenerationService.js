app.factory("CsrService", ["$http", function($http){
	
	return {
		fetchGeneratedPrivateKeys: function() {

			return $http({
				method: 'GET',
				url: 'http://52.37.97.92:8080/keypairs'
			})
		},

		generateCsr: function(commonName, organization, organizationalUnit, city, state, country, email, pkey, passphrase, csrFilename) {

			return $http({
				method: 'POST',
				url: 'http://52.37.97.92:8080/csr',
				data: {
					'commonName': commonName,
					'organization': organization,
					'organizationalUnit': organizationalUnit,
					'city': city,
					'state': state,
					'country': country,
					'email': email,
					'pkey': pkey,
					'passphrase': passphrase
					'csrFilename': csrFilename
				}
			})
		}
	}

}]);