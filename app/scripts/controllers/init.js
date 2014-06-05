'use strict';

angular.module('atashiApp')
  .controller('InitCtrl', function ($scope, Global) {
    $scope.global = Global;
  });
