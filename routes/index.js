var express = require('express');
var router = express.Router();
var Category = require("../models/category");
var Post = require("../models/post");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/category', function(req, res, next) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

router.get('/post', function(req, res, next) {
  Post.find(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get('/bycategory/:id', function(req, res, next) {
  Post.find({category: req.params.id}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get('/post/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
