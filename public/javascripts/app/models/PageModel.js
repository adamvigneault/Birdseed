var Backbone = require('backbone');
var _ = require('underscore');

var PageModel = module.exports = Backbone.Model.extend({
    initialize : function(attrs) {
        _.extend(this,attrs);
    }
});