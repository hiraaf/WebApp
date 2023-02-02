var express = require('express');
var router = express.Router();
var isLoggedIn = require("../middleware/routeprotectors").userIsLoggedIn;
var {getRecentPosts , getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require('../conf/database');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'Express', name:"Hira Afzal" });
});

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.get('/registration', (req, res, next) => {
  res.render('registration');
})
router.use('/postimage', isLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render('postimage');
})


router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
    res.render('Imagepost', {title: `Post ${req.params.id}`});
});



module.exports = router;
