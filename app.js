var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var Twitter = require('twitter');
var ioApi = require('./ioApi');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Attributes
attrs = {
  "query" : "monkeys",
  "maxCount" : 25,
  "user" : "FlashFreeze"
}

/** 
 * Start polling twitter
 */
if (!process.env.TWITTER_BEARER_TOKEN) 
require('./certs.js')(function(authenticated, error) {
  if (!authenticated) return;

  var client = new Twitter({
    consumer_token  : process.env.TWITTER_CONSUMER_TOKEN,
    consumer_secret : process.env.TWITTER_CONSUMER_SECRET,
    bearer_token    : process.env.TWITTER_BEARER_TOKEN
  });

  // Update the user info
  var updateUser = function() {
    client.get(
      "users/show",
      {screen_name : attrs.user},
      function(error, userData, res) {
        app.locals.birdie = userData;
      }
    );
  };

  // Update cache and clients if there are new tweets
  app.locals.tweetCache = [];
  var storeTweets = function(tweets) {
    if (app.locals.tweetCache.length<=0 ||
        app.locals.tweetCache[0].id != tweets[0].id) {
      app.locals.tweetCache = tweets; // update the cache
      ioApi.updateClients(tweets); // update the clients
    };
  };

  // Occasionally polls Twitter for updates
  (function twitterPoll() {
    client.get(
      "search/tweets",
      {q: attrs.query, count: attrs.maxCount},
      function(error, tweets, res) {
        updateUser();
        storeTweets(tweets.statuses);
      }
    );
    setTimeout(twitterPoll, 15000);
  })();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Pass packages to the frontend
var common = ['jquery', 'backbone', 'underscore','linkifyjs','linkifyjs/html','linkifyjs/plugins/hashtag'];
app.get("/javascripts/bundle.js",
  browserify(common));
app.get("/javascripts/app.js",
  browserify(__dirname+"/public/javascripts/app/main.js", {
    external:common,
    transform: ['browserify-ejs-tran']
  }));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;