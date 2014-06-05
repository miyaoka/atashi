'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Node Schema
 */
var NodeSchema = new Schema({
  page: Number,
  index: Number,
  content: String,
  br: Number,
  parent: {type: Schema.Types.ObjectId, ref: 'Node'},
  random: Number
});
/**
 * Validations
 */
NodeSchema.path('br').validate(function (num) {
  return num >= 0;
}, 'BR count must be higher than 0');

mongoose.model('Node', NodeSchema);
