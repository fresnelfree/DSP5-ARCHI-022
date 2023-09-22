import express from 'express';
import session from 'express-session';
import { promises } from 'fs';
import passport, { Passport } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';


// let UserProfile:any
const FACEBOOK_CLIENT_ID = '619112930372989'
const FACEBOOK_CLIENT_SECRET = 'f0304cbe255a5ee448a2b212fc7e1dcc'

const getusers = (UserProfile:any) => {
    passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/facebook/callback",
    profileFields: ['id', 'first_name','last_name','picture','gender','email']
    },
    function(accessToken, refreshToken, profile, cb) {
    console.log("profile: ",profile)
    // console.log("accessToken: ",accessToken)  
    // console.log("refreshToken: ",refreshToken)  
    console.log("cb: ",cb)  
    UserProfile = profile._json
    cb(null, profile);
    }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    
    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });

    return UserProfile
}

export default module.exports = {
    getusers
}
