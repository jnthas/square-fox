'use strict';

angular.module('myApp.order', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, OrderService) {
  $routeProvider.when('/order', {
    templateUrl: 'order/order.html',
    controller: 'OrderCtrl',
    resolve: {
    	order: function (OrderService) {
    		return OrderService.getOrder(1000);
    	}
    }
  });
}])


.service('OrderService', ['$http', function ($http) {
	
	this.getClient = function (id) {
		return $http({
			url: 'http://localhost:3000/client',
			method: 'GET',
			params: {id: id}
		});
	};

	this.getProduct = function (id) {
		return $http({
			url: 'http://localhost:3000/product',
			method: 'GET',
			params: {id: id}
		});
	};
	
	this.getOrder = function (id) {
		return $http({
			url: 'http://localhost:3000/order',
			method: 'GET',
			params: {id: id}
		});
	};

}])

.controller('OrderCtrl', ['$scope', 'OrderService', 'order', function($scope, OrderService, order) {
	$scope.order = order.data[0];

	$scope.clientIdChanged = function (clientId) {
		if (!clientId) {
			$scope.selectedClient = {};
			return;
		}

		OrderService.getClient(clientId).then(function (client) {
			$scope.selectedClient = client.data[0];
		}).catch(function () {
			$scope.selectedClient = {};
		});
	};

	$scope.productIdChanged = function (productId) {
		if (!productId) {
			$scope.selectedProduct = {};
			return;
		}

		OrderService.getProduct(productId).then(function (product) {
			$scope.selectedProduct = product.data[0];
		}).catch(function () {
			$scope.selectedProduct = {};
		});
	};

	$scope.quantityEnter = function (event, quantity) {
		if (event.charCode == 13) {
			console.log('quantityEnter');
		}
	};

}]);





