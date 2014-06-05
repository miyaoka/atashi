'use strict';

angular.module('atashiApp')
  .controller('FetchCtrl', function ($scope, $resource, $timeout, Global, Nodes, RandomNodes) {

    var baseURL = Global.novelURL;
    $scope.page = {
      start: 1,
      end:422
    };

    var saveNode = function(nodes, lastNode, cb){
      var node = nodes.shift();
      if(!node){
        cb(lastNode);
        return;
      }
      if(lastNode){
        node.parent = lastNode._id;
      }
      Nodes.save(node, function(res){
        $scope.node = res;
        saveNode(nodes, res, cb);
      });
    }
    var fetchURL = function(page, endPage, lastNode, cb){

      $scope.fetchingPage = page;
      if(page > endPage){
        cb();
        $scope.fetchingPage = null;
        return;
      }

      $resource('/api/fetch', {
        url: baseURL + page
      }).get(function(res){

        var e = angular.element(res.content);
        var text = e.find('font')[2].textContent;
        //ページ冒頭の改行削除
        text = text.replace(/^[\n]+/m, '');
        //全角空白だけの行を削除
//        text = text.replace(/^[　]+$/gm, '');
        //前後の全角空白を削除
        text = text.replace(/^[　]+/gm, '');
        //改行と文字をsplitしてlist化
        var list = text.split(/([\n]+)/m);
        //最後の改行後の部分を削除
        list.pop();
        var nodes = [];
        for (var i = 0; i < list.length; i+=2){
          nodes.push({
            page: page,
            index: i/2,
            content: list[i],
            br: list[i+1].length
          })
        }
        //dbに書き出し
        saveNode(nodes, lastNode, function(node){
          $timeout(function(){
            fetchURL(++page, endPage, node, cb);
          }, 100)
        })

      });
    };

    $scope.fetch = function(){
      console.log("startfecth");
      fetchURL($scope.page.start, $scope.page.end, null, function(){
        console.log("comp");
      });
    };

    $scope.delete = function(){
      Nodes.remove(function(res){
        console.log('remove', res);
      });
    };

    $scope.setRandom = function(){
      RandomNodes.update(function(res){
        console.log('randomUpdate', res);
      })
    }


  });
