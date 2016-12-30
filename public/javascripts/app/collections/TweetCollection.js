var Backbone = require('backbone');
var _ = require('underscore');

var TweetModel = require('../models/TweetModel');

var TweetCollection = module.exports = Backbone.Collection.extend({
    url : "/tweets",
    model : TweetModel
});