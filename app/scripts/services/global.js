'use strict';

angular.module('atashiApp')
  .factory('Global', function () {
    return {
      logs: [],
      appVersion: '1.0.3 (2014.06.09)',
      novelURL: 'http://no-ichigo.jp/read/page/book_id/148920/page/',
      useSpeech: false
    };
  });
