const passport = require('passport-local-mongoose')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./User')


passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())