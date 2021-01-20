const express = require('express');
const router = express.Router();
const db = require('../models');

// Everything is mounted on /auth

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Sign Up POST route
router.post('/signup', (req, res) => {
  // Find or Create a new user based on the email (or private key)

  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password      
    }
  }).then(([user, created]) => {
    if(created) {
      console.log(`😎`)
      res.redirect('/');
    } else {
      console.log(`👎 ${user.name} already exists`)
      res.redirect('/auth/signup'); // 👋 We need the full path for a redirect
    }
  }).catch( error => {
    console.log(`⚠️ Signup Error:`, error)
    res.redirect('/auth/signup'); 
  });


  // res.send(req.body)
});

module.exports = router;
