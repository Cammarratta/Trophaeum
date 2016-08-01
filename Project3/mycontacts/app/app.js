'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
  $routeProvider.otherwise({redirectTo: '/contacts'});

  	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAs350cLYrbenxDUYeFfBYKsBjT_nfiRWY",
		authDomain: "clangular.firebaseapp.com",
		databaseURL: "https://clangular.firebaseio.com/",
		//storageBucket: "clangular.appspot.com",
	};

	firebase.initializeApp(config);
}]);
