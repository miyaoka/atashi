'use strict';

angular.module('atashiApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menus = [{
      'title': '最初の言葉',
      'link': '/nodes/first'
    },{
      'title': '最後の言葉',
      'link': '/nodes/last'
    }, {
      'title': 'ランダム',
      'link': '/nodes/random'
    }
    ];

  });
