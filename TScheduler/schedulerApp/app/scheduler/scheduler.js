'use strict';

angular.module('myScheduler.scheduler', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scheduler', {
    templateUrl: 'scheduler/scheduler.html',
    controller: 'SchedulerCtrl'
  }).

when('/edit/:appointmentId?', {
    templateUrl: 'scheduler/schedulerEdit.html',
    controller: 'SchedulerEditCtrl',
    resolve: {
    	appointmentData: function($firebaseArray){
    		var ref = firebase.database().ref();
    		return $firebaseArray(ref).$loaded();
    	}
    }
  });
}])


.controller('SchedulerCtrl',['$scope','$routeParams','$firebaseArray',function($scope,$routeParams,$firebaseArray) {
	var appointmentId = $routeParams.appointmentId;

	var ref = firebase.database().ref();
	$scope.appointments = $firebaseArray(ref);	

	var editForm = false;

	$scope.showEditForm = function(appointment){
	};

	$scope.removeAppointment = function(appointment){
		console.log('Removing Appointment.....');

		$scope.appointments.$remove(appointment);

		$scope.msg = "Removed appointment!";
	};
 
}])

.controller('SchedulerEditCtrl',['$scope','$routeParams','$filter','appointmentData',function($scope,$routeParams,$filter,appointmentData) {

	$scope.appointments = appointmentData;
	$scope.editForm = false;

	var appointmentId = $routeParams.appointmentId;
			
	if (appointmentId){
		$scope.editForm = true;
		editAppointment(appointmentId);
	} else {
		$scope.editForm = false;
	}


	$scope.editFormSubmit = function(){
		var id = $scope.$id;
		console.log('Updating Appointment with id:' +appointmentId);
		var appointmentData = $scope.appointments.$getRecord(appointmentId);

		appointmentData.name = $scope.name;
		appointmentData.date = $scope.date.getTime();
		appointmentData.start_time = $scope.start.getTime();
		appointmentData.end_time = $scope.end.getTime();
		appointmentData.reason = $scope.reason;

		//Save Appointment
		$scope.appointments.$save(appointmentData).then(function(ref){
			console.log(ref.key);
		})

		clearFields();

		//Hide Edit Form
		$scope.editForm = false;

		$scope.msg = "Appointment Updated!";

	};


	function editAppointment(appointmentId){
		var appointmentInfo = $scope.appointments.$getRecord(appointmentId);

		var timezone = '-0600';

		var filterDate = new Date($filter('date')(appointmentInfo.date, 'shortDate', timezone));
		var filterStartTime = new Date($filter('date')(appointmentInfo.start_time, 'medium', timezone));
		var filterEndTime = new Date($filter('date')(appointmentInfo.end_time, 'medium', timezone));

		$scope.name = appointmentInfo.name;
		$scope.date = filterDate;
		$scope.start = filterStartTime;
		$scope.end = filterEndTime;
		$scope.reason = appointmentInfo.reason;
	};


	function clearFields(){
		$scope.name = "";
		$scope.date = "";
		$scope.start = "";
		$scope.end = "";
		$scope.reason = "";
	};

	$scope.addFormSubmit = function(){	
		console.log('Adding appointment.....');	

		//Assign Values
		if($scope.name){ var name = $scope.name } else { var name = null; }
		if($scope.date){ var date = $scope.date.getTime(); } else { var date = null; }
		if($scope.start){ var start_time = $scope.start.getTime(); } else { var start_time = null; }
		if($scope.end){ var end_time = $scope.end.getTime(); } else { var end_time = null; }
		if($scope.reason){ var reason = $scope.reason; } else { var reason = null; }

		//Build the JSON object
		$scope.appointments.$add({
			name: name,
			date: date,
			start_time: start_time,
			end_time: end_time,
			reason: reason
		}).then(function(ref){
			var id = ref.key;
			console.log('added record with id: ' + id);
		})
		
		clearFields()
		$scope.msg = "Appointment Added";
	};
}]);