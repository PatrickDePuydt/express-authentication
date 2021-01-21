const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// passport will serialize objects
/// Converts the user to an identifier (id)
passport.serializeUser( ( user, callbackFunction ) => {
  callbackFunction(null, user.id);
});

// Passport Deserializing an object /// finds user in DB via deserialized identifier (id)
passport.deserializeUser( ( user, callbackFunction ) => {
  db.user.findByPk(id).then( user => {
    callbackFunction(null, user);
  }).catch( error => callbackFunction(err, null));
});

// Passport using it's strategy to provide local auth. We need to give the LocalStrategy the following info:

// Configuration
//
passport.use( new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, ( email, password, callbackFunction ) => {
  db.user.findOne({
    where: { email }
  }).then( user => {
      if (user && user.validPassword(password)) {
        callbackFunction(null, user);
      } else {
        callbackFunction(null, false)
      }
  }).catch(callbackFunction);
}));

module.exports = passport;