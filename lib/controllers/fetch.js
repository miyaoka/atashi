'use strict';

var scraper = require('scraper');

exports.find = function(req, res) {
  scraper(req.query.url, function(err, $) {
    if(err) {
      return res.send(err);
    }
    return res.json({'content': $('html').html()});
  });
};