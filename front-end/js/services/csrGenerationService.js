app.factory("CsrService", ["$http", function($http){
	
	return {
		fetchGeneratedPrivateKeys: function() {

			return $http({
				method: 'GET',
				url: 'http://localhost:5000/keypairs'
			})
		}
	}

}]);