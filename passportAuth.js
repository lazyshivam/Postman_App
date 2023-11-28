const passport = require('passport');
const  GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
// Replace with your own credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = '/auth/google/callback';
//  console.log(GOOGLE_CLIENT_SECRET)
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  // passReqToCallback:false
},
function(accessToken, refreshToken, profile, done){
     
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails[0].value,
    picture: profile.photos[0].value,
    accessToken: accessToken, // Store the access token here
  };
   
   done(null, user);
}));  


passport.serializeUser((user, done) => {
  // Serialize user profile to store in the session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user profile from the session
  done(null, user);
});

module.exports = passport;