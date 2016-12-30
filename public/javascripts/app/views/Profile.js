var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var ProfileTemplate = require('../templates/profile.ejs');
var ProfileModel = require('../models/ProfileModel');

Backbone.$ = $;

var ProfileView = module.exports = Backbone.View.extend({
    template : ProfileTemplate,
    initialize : function(attrs) {
        _.extend(this, attrs);
        var that = this;

        this.model = new ProfileModel();
        this.model.on("change", function() {
            that.render();
        });
        this.model.fetch();

        return this;
    },
    render : function() {
        var user = this.template(this.model.attributes);

        this.$el.append(user);
        this.start();

        return this;
    },
    start : function() {
        this.$(".User").animate({backgroundPositionX : "-330px"},5000);
    }
});