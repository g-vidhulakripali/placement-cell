const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.user._id)
    .then((user) => {
      return res.render("user_profile", {
        title: "User profile",
        users: user,
      });
    })
    .catch((err) => {
      if (err) {
        console.log("Error in profile", err);
        return;
      }
    });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", { title: "Placement Cell | Sign In" });
};

module.exports.create = function (req, res) {
  // console.log(req.body.password);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then(() => {
            return res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log("error in creating user while signing up", err);
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("error in finding user in signing up", err);
      return;
    });
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
