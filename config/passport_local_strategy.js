// Importing the required modules and the User model.
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");

// Configuring authentication using passport with LocalStrategy.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // Find the user in the database based on the provided email.
      User.findOne({ email: email })
        .then((user) => {
          // If user is not found or password does not match, return false.
          if (!user || user.password != password) {
            req.flash("error", "Invalid Username/Password");
            console.log("Invalid Username/Password");
            return done(null, false);
          }

          // If user is found and password matches, return the user.
          return done(null, user);
        })
        .catch((err) => {
          // If any error occurs during authentication, pass the error to the done function.
          if (err) {
            console.log("Error in passport");
            return done(err);
          }
        });
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies.
passport.deserializeUser(function (id, done) {
  // Find the user in the database based on the user ID.
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      // If any error occurs during deserialization, pass the error to the done function.
      if (err) {
        console.log("Error in finding user");
        return done(err);
      }
    });
});

// Custom middleware to check if the user is authenticated.
passport.checkAuthentication = function (req, res, next) {
  // If the user is authenticated, call the next middleware.
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not signed in, redirect to sign-in page.
  return res.redirect("/users/sign-in");
};

// Middleware to set authenticated user in res.locals.user for use in views.
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.locals.user = req.user;
  }
  next();
};

// Exporting the passport configuration module.
module.exports = passport;
