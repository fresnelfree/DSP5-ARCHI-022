"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
// let UserProfile:any
const FACEBOOK_CLIENT_ID = '619112930372989';
const FACEBOOK_CLIENT_SECRET = 'f0304cbe255a5ee448a2b212fc7e1dcc';
const getusers = (UserProfile) => {
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        profileFields: ['id', 'first_name', 'last_name', 'picture', 'gender', 'email']
    }, function (accessToken, refreshToken, profile, cb) {
        console.log("profile: ", profile);
        // console.log("accessToken: ",accessToken)  
        // console.log("refreshToken: ",refreshToken)  
        console.log("cb: ", cb);
        UserProfile = profile._json;
        cb(null, profile);
    }));
    passport_1.default.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport_1.default.deserializeUser((user, cb) => {
        cb(null, user);
    });
    return UserProfile;
};
exports.default = module.exports = {
    getusers
};
