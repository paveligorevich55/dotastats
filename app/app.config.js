angular.module('dotaStats').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      

      $routeProvider.
        when('/home', {
          template: '<home-page></home-page>'
        }).
        when('/profile', {
          template: '<profile-page></profile-page>'
        }).
        otherwise('/home');
    }
  ]);