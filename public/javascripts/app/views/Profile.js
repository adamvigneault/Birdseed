var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var ProfileTemplate = require('../templates/profile.ejs');
var ProfileModel = require('../models/ProfileModel');

Backbone.$ = $;

var ProfileView = module.exports = Backbone.View.extend({
    template : ProfileTemplate,
    socket : null,
    initialize : function(attrs) {
        _.extend(this, attrs);
        var that = this;

        this.model = new ProfileModel();
        this.model.on("change", function() {
            that.render();
        });
        this.model.fetch();

        if (this.socket) this.socket.on("update profile", function(profile) {
            that.model.set(profile);
        });

        return this;
    },
    render : function() {
        this.$el.empty();
        var user = this.template(this.model.attributes);

        this.$el.append(user);
        this.start();

        return this;
    },
    start : function() {
        this.$(".User").animate({backgroundPositionX : "-330px"},5000);
    }
});