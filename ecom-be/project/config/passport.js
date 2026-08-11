const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

let strategyRegistered = false;

/**
 * Lazily register the Google OAuth strategy the first time it's used.
 * This lets the server boot even when Google OAuth env vars aren't set yet.
 */
function ensureGoogleStrategy() {
  if (strategyRegistered) return;
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth not configured (set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)');
  }
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails && profile.emails[0] ? profile.emails[0].value : null;
          if (!email) return done(new Error('Google account has no email'), null);

          const avatar =
            profile.photos && profile.photos[0] ? profile.photos[0].value : null;

          let user = await User.findOne({ email: email.toLowerCase() });
          if (!user) {
            user = await User.create({
              name: profile.displayName || 'Google User',
              email: email.toLowerCase(),
              googleId: profile.id,
              isGuest: false,
              isEmailVerified: true,
              authProvider: 'google',
              avatar,
            });
          } else {
            let changed = false;
            if (!user.googleId) {
              user.googleId = profile.id;
              changed = true;
            }
            if (!user.isEmailVerified) {
              user.isEmailVerified = true;
              changed = true;
            }
            if (user.isGuest) {
              user.isGuest = false;
              changed = true;
            }
            if (avatar && user.avatar !== avatar) {
              user.avatar = avatar;
              changed = true;
            }
            if (!user.name && profile.displayName) {
              user.name = profile.displayName;
              changed = true;
            }
            if (changed) {
              await user.save();
            }
          }

          const token = generateToken(user._id, user.role);
          return done(null, { user, token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  strategyRegistered = true;
}

passport.serializeUser((data, done) => done(null, data));
passport.deserializeUser((data, done) => done(null, data));

module.exports = { passport, ensureGoogleStrategy };
