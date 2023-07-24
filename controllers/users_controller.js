const User = require("../models/userSchema");

// Controller function to render the sign-up form page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: "Placement Cell | Sign Up",
  });
};

// Controller function to render the sign-in form page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", { title: "Placement Cell | Sign In" });
};

// Controller function to create a new user account
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      try {
        await User.create(req.body);
        req.flash("success", "Account Successfully Created");
        return res.redirect("/users/sign-in");
      } catch (err) {
        console.log("Error in creating user while signing up", err);
        return;
      }
    } else {
      req.flash("error", "Account Already Exists");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in finding user in signing up", err);
    return;
  }
};

// Controller function to create a user session (user login)
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

// Controller function to destroy a user session (user logout)
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      req.flash("error", "Unable to Logout!");
      console.log("Error in the user controller", err);
      return res.redirect("back");
    }
  });
  req.flash("success", "Logged Out!");
  return res.redirect("/");
};
