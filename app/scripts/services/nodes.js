'use strict';

angular.module('atashiApp')
  .factory('Nodes', function ($resource) {
    return $resource('/api/nodes/:nodeId', {
      nodeId: '@_id'
    },
    {
      'update': {
        method: 'PUT'
      },
    });
  })
  .factory('NodesChildren', function ($resource) {
    return $resource('/api/nodes/children', {
    });
  })
  .factory('RandomNodes', function ($resource) {
    return $resource('/api/nodes/random', {
    },
    {
      'update': {
        method: 'PUT'
      },
    });
  });