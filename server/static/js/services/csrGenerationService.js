app.factory("CsrService", ["$http", function($http){
	
	return {
		fetchGeneratedPrivateKeys: function() {

			return $http({
				method: 'GET',
				url: 'http://52.37.97.92:8080/keypairs'
			})
		},

		generateCsr: function(postData) {

			return $http({
				method: 'POST',
				url: 'http://52.37.97.92:8080/csr',
				data: postData
			})
		}
	}

}]);