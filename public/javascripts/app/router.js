var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("underscore");
var PageView = require("./views/Page");
var PageModel = require("./models/PageModel");

Backbone.$ = $;

var Router = module.exports = Backbone.Router.extend({
    routes : {
        "" : "showIndex"
    },
    initialize : function() {
        Backbone.history.start();
    },
    showIndex : function() {
        var page = new PageView({
            model : new PageModel({
                socket : io()
            })
        });

        page.render();
    }
});