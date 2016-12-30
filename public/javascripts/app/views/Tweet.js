var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var linkify = require('linkifyjs');
var linkifyHTML = require('linkifyjs/html');

var TweetTemplate = require('../templates/tweet.ejs');
var TweetModel = require('../models/TweetModel');

Backbone.$ = $;

var TweetView = module.exports = Backbone.View.extend({
    className : "TweetColumn",
    events : {},
    model : new TweetModel(),
    template : TweetTemplate,
    initialize : function(attrs) {
        _.extend(this, attrs);
        var that = this;
        
        this.model.on("update", this.render);
        this.model.on("remove", function() {
            that.remove(); // cleanup
        });

        return this;
    },
    render : function() {
        var text = this.model.get("text");
        text = linkifyHTML(text);
        this.model.attributes['text'] = text;

        this.$el.append(this.template(this.model.attributes));

        return this;
    }
});