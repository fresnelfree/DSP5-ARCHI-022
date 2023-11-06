"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
require('dotenv').config();
const app = (0, express_1.default)();
let profileFacebook;
let profileGoogle;
let profileInstagram;
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'gender', 'emails']
}, function (accessToken, refreshToken, profile, cb) {
    console.log("profile: ", profile);
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);
    console.log("cb: ", cb);
    profileFacebook = profile._json;
    cb(null, profile);
}));
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:4000/auth/google/callback",
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log("profile: ",profile)
//   console.log("accessToken: ",accessToken)  
//   console.log("refreshToken: ",refreshToken)  
//   console.log("cb: ",cb)  
//   cb(null, profile);
//   profileGoogle = profile._json
// }
// ));
// Serialize and deserialize user methods if needed
passport_1.default.serializeUser((user, cb) => {
    cb(null, user);
});
passport_1.default.deserializeUser((user, cb) => {
    cb(null, user);
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'XSQ_=}|#~~|^]]@]})TRTYIGFY',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/auth/facebook', passport_1.default.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
    // Successful authentication, redirect home.
    res.json(profileFacebook);
});
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    // Successful authentication, redirect home.
    res.json(profileGoogle);
});
app.get('/login', (req, res) => {
    res.send({ "login": "login" });
});
app.get('/', (req, res) => {
    res.send(req.body.user ? req.body.user : 'Not logged in, login with Google or facebook');
});
// app.use('/login',UserRouter.router);
app.use(passport_1.default.initialize());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
