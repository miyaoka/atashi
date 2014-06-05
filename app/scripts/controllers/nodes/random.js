'use strict';

angular.module('atashiApp')
  .controller('NodesRandomCtrl', function ($scope, $location, Global, RandomNodes) {
    Global.logs = [];
    RandomNodes.get(function(res){
      $location.path(/nodes/ + res._id);
    });
  });
