app.factory("TruststoreConfigurationService", ["$http", function($http) {

	return {

		fetchTruststores: function() {

			return $http({
				method: 'GET',
				url: 'http://52.37.97.92:8080/truststores'
			})
		}

	}

}]);