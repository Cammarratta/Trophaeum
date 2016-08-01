'use strict';

// Declare app level module which depends on views, and components
angular.module('myScheduler', [
  'ngRoute',
  'firebase',
  'myScheduler.scheduler'
  ]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/scheduler'});
}]);


  var config = {
    apiKey: "AIzaSyBAogmzNyjYyhDRSYkmPn07O0pezxHOpuw",
    authDomain: "tscheduler-ab005.firebaseapp.com",
    databaseURL: "https://tscheduler-ab005.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);
 