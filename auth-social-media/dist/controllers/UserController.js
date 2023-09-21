"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
/**
 * Welcome Screen http://localhost:3000/
 */
const getAllUsers = (req, res) => {
    const FACEBOOK_CLIENT_ID = '619112930372989';
    const FACEBOOK_CLIENT_SECRET = 'f0304cbe255a5ee448a2b212fc7e1dcc';
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/login/facebook/callback',
        profileFields: ['emails', 'displayName', 'name', 'picture']
    }, (accessToken, refreshToken, profile, callback) => {
        callback(null, profile);
    }));
    const pass = passport_1.default.authenticate('facebook', { scope: ['email'] });
};
const authFacebook = (req, res) => {
    const FACEBOOK_CLIENT_ID = '619112930372989';
    const FACEBOOK_CLIENT_SECRET = 'f0304cbe255a5ee448a2b212fc7e1dcc';
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/login/facebook/callback',
        profileFields: ['emails', 'displayName', 'name', 'picture']
    }, (accessToken, refreshToken, profile, callback) => {
        callback(null, profile);
    }));
    const pass = passport_1.default.authenticate('facebook', { scope: ['email'] });
    console.log('passport : ', pass);
};
const authFacebookCallback = (req, res) => {
    const pass = passport_1.default.authenticate('facebook');
    res.send(req.body.user ? req.body.user : 'Not logged in, login with Google or facebook');
    console.log('passport : ', pass);
};
exports.default = module.exports = {
    getAllUsers,
    authFacebook,
    authFacebookCallback
};
