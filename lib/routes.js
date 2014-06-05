'use strict';

var nodes = require('./controllers/nodes'),
    fetch = require('./controllers/fetch'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/nodes')
    .get(nodes.find)
    .post(nodes.create)
    .delete(nodes.removeAll);

  app.route('/api/nodes/children')
    .get(nodes.children);

  app.route('/api/nodes/random')
    .get(nodes.randomFind)
    .put(nodes.setRandom);

  app.route('/api/nodes/:nodeId')
    .get(nodes.findOne);


  app.param('nodeId', nodes.node);

  app.route('/api/fetch')
    .get(fetch.find);
  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};