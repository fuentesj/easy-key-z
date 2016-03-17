app.factory("CsrService", ["$http", function($http){
	
	return {
		fetchGeneratedPrivateKeys: function() {

			return $http({
				method: 'GET',
				url: 'http://localhost:8080/keypairs'
			})
		},

		generateCsr: function(commonName, organization, organizationalUnit, city, state, country, email, pkey, csrFilename) {

			return $http({
				method: 'POST',
				url: 'http://localhost:5000/csr',
				data: {
					'commonName': commonName,
					'organization': organization,
					'organizationalUnit': organizationalUnit,
					'city': city,
					'state': state,
					'country': country,
					'email': email,
					'pkey': pkey,
					'csrFilename': csrFilename
				}
			})
		}
	}

}]);