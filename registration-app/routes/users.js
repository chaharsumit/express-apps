var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/register',(req, res, next) => {
  res.render('registerForm');
})

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', (req, res) => {
  var { email, password } = req.body;
  if(!email || !password){
    res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if(err){
      return next(err);
    }
    if(!user){
      res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if(err){
        return next(err);
      }
      if(!result){
        res.redirect('/users/login');
      }
    })
  })
})


module.exports = router;