'use strict';

angular.module('atashiApp')
  .factory('Global', function () {
    return {
      logs: [],
      appVersion: '1.0.1 (2014.06.05)',
      novelURL: 'http://no-ichigo.jp/read/page/book_id/148920/page/'
    };
  });
