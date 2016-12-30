var $ = require('jquery');
var Backbone = require('Backbone');
var _ = require('underscore');

var TweetSet = require('./TweetSet');
var Profile = require('./Profile');

Backbone.$ = $;

var PageView = module.exports = Backbone.View.extend({
    el : 'body',
    events : {},
    initialize : function(attrs) {
        _.extend(this,attrs);

        // Translates vertical scrolling to horizontal scrolling
        /*
        $(window).on("wheel", function(e) {
            $('body').animate({scrollLeft : "+="+(e.originalEvent.deltaY*2)},100,"linear");
        });
        */

        return this;
    },
    render : function() {
        var profile = new Profile();
        var tweetSet = new TweetSet({
            socket : this.model.get("socket")
        });

        profile.setElement('section#profile');
        $('main').append(tweetSet.$el);

        return this;
    }
})