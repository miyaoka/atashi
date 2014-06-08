'use strict';

angular.module('atashiApp')
  .controller('MainCtrl', function ($scope, $routeParams, $location, Nodes, RandomNodes, NodesChildren, TableFactory, Global) {
    $scope.currentTable = TableFactory.sortable({
    });
    $scope.currentTable.settings({
      counts : []
    });
    $scope.parentTable = TableFactory.sortable({
    });
    $scope.parentTable.settings({
      counts : []
    });
    $scope.childrenTable = TableFactory.sortable({
      count : 10
    });
    $scope.childrenTable.settings({
      counts : [10, 100, 1000, 10000]
    });
    $scope.setNode = function(node, isParent){
      $scope.currentNode = node;

      getChildren(node);

      if(isParent){
        Global.logs.pop();
        setScroll();
        return;
      }

      node.brs = [];
      for(var i = 0; i < node.br; i++){
        node.brs.push('');
      }
      //ログに追加
      Global.logs.push(node);

      //ログを最下部にスクロール
      setScroll();
    };
    $scope.clearLog = function(){
      Global.logs = [];
      getRandom();
    };

    var setScroll = function(){
      document.getElementById('logs').scrollTop = document.getElementById('logs').scrollHeight;
    };

    var getChildren = function(node){
      $scope.isChildLoading = true;

      //子ノード
      NodesChildren.query({
        content: node.content
      }, function(res){

        $scope.isChildLoading = false;

        //同じ語の繰り返しだと子に自身が含まれる場合があるので、自身以外のみにする
        var children = [];
        for(var i = 0; i < res.length; i++){
          if(node._id !== res[i]._id){
            children.push(res[i]);
          }
        }

        //親リンクをセット（実際のparentとは別に、contentでfind childした際の親node）
        children.forEach(function(child){
          child.parentLink = node;
        });
        //child配列をシャッフルする
        children.sort(function(){
          return (Math.round(Math.random())-0.5);
        });
        $scope.childrenTable.setItems(children);
      });
    };
    var getRandom = function(){
      RandomNodes.get(function(res){
        $scope.setNode(res);
      });
    };
    /*
      init
    */
    Global.logs = [];

    //初期ノード取得
    var startID = $routeParams.startID;
    if(!startID){
      //指定がなければランダム取得
      getRandom();
    } else if(startID.length != 24){
      //mongoDBのID長でなければリダイレクト
      $location.path('/');
    } else{
      Nodes.get({
        nodeId: startID
      }, function(res){
        $scope.setNode(res);
      }, function(err){
        //エラーなら指定ID無しにリダイレクト
        $location.path('/');
      });
    }


  });
