'use strict';

var mongoose = require('mongoose'),
    Node = mongoose.model('Node'),
    _ = require('lodash');


var conv_query = function(q){
  var p = {};
  if(q.content){
    p.content = new RegExp(q.content, 'i');
  }
  return _.extend(q, p);
};
exports.node = function(req, res, next, id) {
  Node.findOne({
    _id: id
  }).populate('parent').exec(function(err, node) {
    if (err) return next(err);
    if (!node) return next(new Error('Failed to load: ' + id));
    req._node = node;
    next();
  });
};
exports.findOne = function(req, res) {
  res.json(req._node);
};
exports.find = function(req, res) {
  return Node.find(conv_query(req.query), function (err, nodes) {
    if (!err) {
      return res.json(nodes);
    } else {
      return res.send(err);
    }
  });
};
exports.create = function(req, res) {
  //配列なら複数作成
  if(Array.isArray(req.body)){
    Node.create(req.body, function(err, node){
      if (!err) {
        return res.json(node);
      } else {
        return res.send(err);
      }
    });
    return;
  }
  //一件作成
  var node = new Node(req.body);
  return node.save(function (err, n) {
    if (!err) {
      return res.json(n);
    } else {
      return res.send(err);
    }
  });
};
exports.removeAll = function(req, res) {
  return Node.find(conv_query(req.query)).remove(function (err, count) {
    if (!err) {
      return res.json({count: count});
    } else {
      return res.send(err);
    }
  });
};

var getChildren = function(nodes, children, cb){
  var node = nodes.shift();
  if(!node){
    return cb(null, children);
  }

  Node.findOne({
    parent: node._id
  }, function(err, n){
    if (err) {
      return cb(err);
    }
    if(n){
      children.push(n);
    }
    getChildren(nodes, children, cb);

  });

};
exports.children = function(req, res){
  return Node.find(req.query, function (err, nodes) {
    if (err) {
      return res.send(err);
    }
    getChildren(nodes, [], function(err, children){
      if (err) {
        return res.send(err);
      }
      return res.json(children);
    });
  });
};
exports.randomFind = function(req, res) {
  var q = conv_query(req.query);
  var asc = Node.find(q).sort({random: 1});
  var desc = Node.find(q).sort({random: -1});
  var rand = Math.random();

  //asc sortしたリストからランダム値を超えるものを取得
  return asc.findOne({random: {$gte : rand}}, function (err, node) {
    if (err) {
      return res.send(err);
    } else {
      if(node) {
        return res.json(node);
      }
      //無ければ逆順
      desc.findOne({random: {$lte : rand}}, function (err, node) {
        if (err) {
          return res.send(err);
        } else {
          return res.json(node);
        }
      });
    }
  });
};

var setRand = function(nodes, cb){
  var node = nodes.shift();
  if(!node){
    return cb();
  }
  node.random = Math.random();
  node.save(function(err){
    if(!err) {
//          console.log('rand saved', node.random);
    } else {
      console.log('rand err', err);
    }
    setRand(nodes, cb);
  });
}
//ランダム検索用のキーを設定する
exports.setRandom = function(req, res) {
  return Node.find(function (err, nodes) {
    if (err) {
      return res.send(err);
    }
    setRand(nodes, function(){
      return res.json({count: nodes.length});
    })
  });
};