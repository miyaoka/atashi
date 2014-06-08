'use strict';

angular.module('atashiApp')
  .controller('MainCtrl', function ($scope, $routeParams, $location, Nodes, RandomNodes, NodesChildren, TableFactory, Global, $timeout) {
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
    $scope.indexes = [{
      'title' : 'プロローグ',
      'id' : '538f9a665d7a340000baa432'
    },{
      'title' : '第1章',
      'id' : '538f9a685d7a340000baa453'
    },{
      'title' : '第2章',
      'id' : '538f9a765d7a340000baa613'
    },{
      'title' : '第3章',
      'id' : '538f9aa45d7a340000baac11'
    },{
      'title' : '第4章',
      'id' : '538f9ace5d7a340000bab209'
    },{
      'title' : '第5章',
      'id' : '538f9adf5d7a340000bab442'
    },{
      'title' : '第6章',
      'id' : '538f9b1a5d7a340000babc86'
    },{
      'title' : 'トモ',
      'id' : '538f9b365d7a340000bac076'
    },{
      'title' : '第7章',
      'id' : '538f9b985d7a340000bacca2'
    },{
      'title' : '第8章',
      'id' : '538f9bf25d7a340000bad61f'
    },{
      'title' : '最終章',
      'id' : '538f9c205d7a340000badb15'
    }];

    $scope.onSelectStartNode = function(node){
      if(!node){
        return;
      }
      Global.logs = [];
      getNode(node.id);
    };
    $scope.onChangeUseSpeech = function(){
      speechSynthesis.cancel();
    };
    $scope.speek = function(node, cb){
      speechSynthesis.cancel();
      //「…」が「ドットドットドット」と読み上げられてしまうので削除する
      var content = node.content.replace(/…/g, '')
      var msg = new SpeechSynthesisUtterance(content);
      msg.lang = "ja-JP";
      msg.onend = function(e){
        $timeout(function(){
          if(cb){
            cb();
          }
        }, (node.br - 1) * 100)
      }
      window.speechSynthesis.speak(msg);
    };
    var speekList = function(nodes, cb){
      var node = nodes.shift();
      if(!node || !Global.useSpeech){
        cb();
        return;
      }
      $scope.speek(node, function(){
        speekList(nodes, cb);
      });
    }
    $scope.speekAll = function(){
      speekList(angular.copy(Global.logs), function(){
      });
    };
    $scope.setNode = function(node, isParent){
      $scope.currentNode = node;

      if(Global.useSpeech){
        $scope.speek(node);
      }

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
    var getNode = function(id){
      Nodes.get({
        nodeId: id
      }, function(res){
        $scope.setNode(res);
      }, function(err){
        //エラーなら指定ID無しにリダイレクト
        $location.path('/');
      });
    }
    /*
      init
    */
    Global.logs = [];

    //初期ノード取得
    getRandom();

  });
