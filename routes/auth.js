const express = require('express');
const router = express.Router();

// Everything is mounted on /auth

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Sign Up POST route
router.post('/signup');

module.exports = router;
