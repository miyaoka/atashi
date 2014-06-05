'use strict';

angular.module('atashiApp')
  .controller('NodesListCtrl', function ($scope, $location, Nodes, TableFactory) {
    $scope.tp = TableFactory.sortable({
      sorting: {
        page: 'asc',
        index: 'asc'
      },
      count: 20
    });
    $scope.tp.settings({
      counts : [20, 100, 1000, 10000]
    });

    $scope.view = function(item){
      $location.path(/nodes/ + item._id);
    };
    $scope.search = function(){
      Nodes.query($scope.params, function(res) {
        $scope.tp.setItems(res);
      });
    };
    $scope.reset = function(){
      $scope.params = {};
    };
    $scope.remove = function(){
      Nodes.delete($scope.params, function(res) {
        $scope.search();
      });
    }
    /*
    $scope.random = function(){
      RandomNames.get($scope.params, function(res) {
        $scope.tp.setItems([res]);
      });
    }
    */
  });
