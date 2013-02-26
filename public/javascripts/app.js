
/**
 * node-angular
 */
 var tsos, atsos;

var app = angular.module('app', ['google-maps'], function($routeProvider) {

  $routeProvider.when('/welcome', {
    templateUrl   : 'partials/welcome.html',
    controller : WelcomeController
  });
  $routeProvider.otherwise({
    redirectTo : '/welcome'
  });

});

app.config(function($locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);
});

/**
 * directives
 */

app.directive("liveClock", function () {
  return {
    restrict: 'E',
    scope: {
      offset:'@',
      format:'@'
    },
    template: "<span>{{time | date:format}}</span>",
    controller: function ($scope,$element,$attrs,$timeout){
      return {
        offset_time: function (time,offset){
          offset=parseFloat(offset);
          var local_offset= -time.getTimezoneOffset()/60;
          var adj_offset= offset-local_offset;
          tsos=time.getTimezoneOffset()/60;
          atsos= adj_offset;
          var hours = time.getHours()+(adj_offset);
          time.setHours(hours);
          time.setMinutes(time.getMinutes()+(60*(adj_offset%1)));
          return time;
        },
        start_time: function () {
          var obj=this;
          $timeout(function(){obj.update_time(); obj.start_time()}, 500)
        },
        update_time: function () {
          return $scope.time=this.offset_time(new Date(),$attrs.offset);
        }
      }
    },
    link: function (scope,element,attrs,controller) {
      if (! attrs.format) attrs.format='h:mm:ss a';
      if (! attrs.offset) attrs.offset= -(new Date()).getTimezoneOffset()/60;
      controller.update_time();
      controller.start_time();
    }
  }
});

/**
 * controllers
 */

function WelcomeController($scope) {
  $scope.pageHeader = 'India';
  $scope.center = {lat:25,lng:77};
  $scope.zoom = 5;
  $scope.markers= [];
};

/* EOF */
