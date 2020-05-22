(function (angular) {
   var notesModule = angular.module('notesView', [], function ($interpolateProvider) {
      $interpolateProvider.startSymbol('[{');
      $interpolateProvider.endSymbol('}]');
   });
   //var notesModule = angular.module("notesView", []);
   
   notesModule.controller("notesViewController",
   ["$scope", "$window", "$http",
      function($scope, $window, $http){
         $scope.notes = [];
         var urlParts = $window.location.pathname.split("/");
         var categoryName = urlParts[urlParts.length - 1];
         
         var notesUrl = "/api/notes/" + categoryName;
         $http.get(notesUrl)
         .then(function (result){
            //success
            $scope.notes = result.data;
         }, function (err){
            //error

         });



      }
   ]);

})(window.angular);