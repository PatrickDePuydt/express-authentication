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
    //// If user was created
    ////// Redirect to homepage or profile
    //// else there was NOT a user created
    ////// redirect to auth/signup
  });


  // res.send(req.body)
});

module.exports = router;
