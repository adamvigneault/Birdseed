var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Birdseed for Thanx'
  });
});

router.get('/tweets', function(req, res, next) {
  res.json(req.app.locals.tweetCache);
});

router.get('/user', function(req, res, next) {
  res.json(req.app.locals.birdie);
});

module.exports = router;
