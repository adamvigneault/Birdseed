var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var TweetCollection = require('../collections/TweetCollection');
var TweetView = require('./Tweet');

Backbone.$ = $;

var TweetSet = module.exports = Backbone.View.extend({
    tagName : "ol",
    className : "TweetSet",
    socket : null,
    events : {},
    setMaxLength : 25,
    initialize : function(attrs) {
        _.extend(this, attrs);
        var that = this;

        this.collection = new TweetCollection();
        this.collection.on("update", function(tweets, options) {
            // Remove models if the collection starts getting too long
            while (this.length>that.setMaxLength) {
                var model = this.shift();
            }
            that.addAll(options.changes.added.reverse());
        });

        this.collection.fetch();
        // listen for updates from socket
        if (this.socket) this.socket.on("update tweets", function(tweets) {
            if (that.pause) return;
            that.collection.add(tweets, {merge:true});
        });

        this.render();
        return this;
    },
    render : function() {
        this.start();

        return this;
    },
    addAll : function(tweets) {
        var that = this;

        for (i in tweets) {
            that.addOne(tweets[i], i);
        };

        return this;
    },
    addOne : function(tweet, index) {
        var tweetView = new TweetView({
            tagName : "li",
            model : tweet
        });
        var $view = tweetView.render().$el.hide().prependTo(this.$el);

        setTimeout(function() {
            $view.show("fast");
        }, 100*index);

        return this;
    },
    removeAll : function(tweets) {
        var that = this;
        this.$("li").hide("fast", function() {
            that.$el.empty();
        })

        return this;
    },
    removeOne : function(tweet) {},
    start : function() {
        var that = this;

        $(window).scroll(function(e) {
            that.pause = (this.scrollY>0);
        });
    }
});