'use strict';

angular.module('atashiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTable'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/fetch', {
        templateUrl: 'partials/fetch',
        controller: 'FetchCtrl'
      })
      .when('/nodes/list', {
        templateUrl: 'partials/nodes/list',
        controller: 'NodesListCtrl'
      })
      .when('/nodes/random', {
        templateUrl: 'partials/nodes/random',
        controller: 'NodesRandomCtrl'
      })
      .when('/nodes/first', {
        templateUrl: 'partials/nodes/first',
        controller: 'NodesFirstCtrl'
      })
      .when('/nodes/last', {
        templateUrl: 'partials/nodes/last',
        controller: 'NodesLastCtrl'
      })
      .when('/nodes/:nodeId', {
        templateUrl: 'partials/nodes/view',
        controller: 'NodesViewCtrl'
      })
      .otherwise({
        redirectTo: '/nodes/random'
      });

    $locationProvider.html5Mode(true);
  });