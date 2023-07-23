const Student = require("../models/studentSchema");

module.exports.home = async function (req, res) {
  try {
    let students = await Student.find({});
    return res.render("home", {
      title: "Placement Cell | Home",
      students: students,
    });
  } catch (err) {
    console.log(`Error in finding the Student $(err)`) ;
    return res.render("back");
  }
};
