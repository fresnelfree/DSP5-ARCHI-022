require('dotenv').config();
import express from 'express';
import session from 'express-session';
import UserRouter from './routes/index';
import passport, { Passport } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as InstagramStrategy } from 'passport-instagram';


const app = express();
let profileFacebook:any
let profileGoogle:any
let profileInstagram:any

passport.use(new FacebookStrategy({
  clientID:'834324708244777',
  clientSecret: 'b23338d8d100a9f261b7d3199fe7ef06',
  callbackURL: "http://localhost:4000/auth/facebook/callback",
  profileFields: ['id', 'first_name','last_name','picture','gender','emails']
},
function(accessToken, refreshToken, profile, cb) {
  console.log("profile: ",profile)
  console.log("accessToken: ",accessToken)  
  console.log("refreshToken: ",refreshToken)  
  console.log("cb: ",cb)  
  profileFacebook = profile._json
  cb(null, profile);
}
));

passport.use(new GoogleStrategy({
  // clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientID: '574508009757-dfq7soqtakor952logu1rup06r53hsjr.apps.googleusercontent.com',
  // clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  clientSecret: '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',  
  callbackURL: "http://localhost:4000/auth/google/callback",
},
function(accessToken, refreshToken, profile, cb) {
  console.log("profile: ",profile)
  console.log("accessToken: ",accessToken)  
  console.log("refreshToken: ",refreshToken)  
  console.log("cb: ",cb)  
  cb(null, profile);
  profileGoogle = profile._json
}
));

// passport.use(new InstagramStrategy({
//   clientID:'845755590386107',
//   clientSecret: '5a45c87aed47793d0f88f92f56d1f2c5',
//   callbackURL: "http://localhost:4000/auth/instagram/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log("profile: ",profile)
//   console.log("accessToken: ",accessToken)  
//   console.log("refreshToken: ",refreshToken)  
//   console.log("cb: ",cb)  
//   cb(null, profile);
//   profileInstagram = profile._json
// }
// ));

// Serialize and deserialize user methods if needed
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.use(express.json());
app.use(session({
  secret: 'XSQ_=}|#~~|^]]@]})TRTYIGFY',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json(profileFacebook)
});

app.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json(profileGoogle)
});

// app.get('/auth/instagram',passport.authenticate('instagram'));
// app.get('/auth/instagram/callback', 
//   passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.get('/login', (req,res)=>{
    res.send({"login":"login"})
});

app.get('/',(req,res)=>{
    res.send(req.body.user? req.body.user: 'Not logged in, login with Google or facebook');
})


// app.use('/login',UserRouter.router);
app.use(passport.initialize()); 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});