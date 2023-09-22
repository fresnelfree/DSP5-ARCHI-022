// import { Request, Response } from 'express';
import User from '../models/User';
import passport, { Passport } from 'passport';

import { Strategy as FacebookStrategy } from 'passport-facebook';
/**
 * Welcome Screen http://localhost:3000/
 */

const getAllUsers = (req, res) =>{    

  const FACEBOOK_CLIENT_ID = '619112930372989'
  const FACEBOOK_CLIENT_SECRET = 'f0304cbe255a5ee448a2b212fc7e1dcc'
  
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL:'/login/facebook/callback',
    profileFields: ['emails', 'displayName', 'name', 'picture']
  }, (accessToken, refreshToken, profile, callback)=>{
    callback(null, profile)
  }))
  const pass = passport.authenticate('facebook', {scope: ['email']})
}

const authFacebook = (req, res) =>{    

  const FACEBOOK_CLIENT_ID='619112930372989'
  const FACEBOOK_CLIENT_SECRET='f0304cbe255a5ee448a2b212fc7e1dcc'
  
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL:'/login/facebook/callback',
    profileFields: ['emails', 'displayName', 'name', 'picture']
  }, (accessToken, refreshToken, profile, callback)=>{
    callback(null, profile)
  }))
  const pass = passport.authenticate('facebook', {scope: ['email']})
  console.log('passport : ',pass)
}

const authFacebookCallback = (req, res) =>{    
  const pass = passport.authenticate('facebook')
  res.send(req.body.user? req.body.user: 'Not logged in, login with Google or facebook');
  console.log('passport : ',pass)
}

export default module.exports = {
  getAllUsers,
  authFacebook,
  authFacebookCallback
}