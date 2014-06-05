'use strict';

angular.module('atashiApp')
  .controller('NodesViewCtrl', function ($scope, $routeParams, $location, Nodes, NodesChildren, TableFactory, Global) {
    $scope.node = TableFactory.sortable({
    });
    $scope.node.settings({
      counts : []
    });
    $scope.parent = TableFactory.sortable({
    });
    $scope.parent.settings({
      counts : []
    });
    $scope.children = TableFactory.sortable({
      count : 10
    });
    $scope.children.settings({
      counts : [10, 100, 1000, 10000]
    });

    $scope.view = function(item, isParent){
      //親へ遷移する場合は現ノードと親ノードのログを消す
      if(isParent){
        Global.logs.pop();
        Global.logs.pop();
      };
      $location.path(/nodes/ + item._id);
    };
    $scope.clearLog = function(){
      Global.logs = [];
    };


    Nodes.get({
      nodeId: $routeParams.nodeId
    }, function(res) {

      res.brs = [];
      for(var i = 0; i < res.br; i++){
        res.brs.push('');
      }

      //ログに追加
      Global.logs.push(res);

      //ログを最下部にスクロール
      document.getElementById('logs').scrollTop = document.getElementById('logs').scrollHeight;

      $scope.node.setItems([res]);
      if(res.parent){
        $scope.parent.setItems([res.parent]);
      }

      NodesChildren.query({
        content: res.content
      }, function(res){
        //child配列をシャッフルする
        res.sort(function(){
          return (Math.round(Math.random())-0.5);
        });
        $scope.children.setItems(res);
      });
    });


  });
