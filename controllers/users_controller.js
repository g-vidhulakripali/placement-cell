const User = require("../models/userSchema");

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: " Placement Cell  | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", { title: "Placement Cell | Sign In" });
};

module.exports.create = async function (req, res) {
  // console.log(req.body.password);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      try {
        await User.create(req.body);
        return res.redirect("/users/sign-in");
      } catch (err) {
        console.log("error in creating user while signing up", err);
        return;
      }
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in finding user in signing up", err);
    return;
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  //passport gives this funtion in built
  req.logout(function (err) {
    if (err) {
      console.log("Error in the user controller", err);
      return;
    }
  });
  return res.redirect("/");
};
