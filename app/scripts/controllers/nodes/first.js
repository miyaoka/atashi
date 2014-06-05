'use strict';

angular.module('atashiApp')
  .controller('NodesFirstCtrl', function ($scope, Global, $location) {
    Global.logs = [];
    $location.path('/nodes/538f9a665d7a340000baa432');
  });
