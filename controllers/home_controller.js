const Student = require("../models/studentSchema");

module.exports.home = async function (req, res) {
  let students = await Student.find({});
  return res.render("home", {
    title: "Placement Cell | Home",
    students: students,
  });
};
