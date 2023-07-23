const Student = require("../models/studentSchema");

module.exports.addStudent = function (req, res) {
  return res.render("student", { title: "Placement Cell | Student Page" });
};

module.exports.create = async function (req, res) {
  try {
    const {
      name,
      email,
      batch,
      college,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    } = req.body;
    const student = await Student.findOne({ email });

    if (student) {
      console.log("Email already exists");
      return res.redirect("back");
    }

    await Student.create({
      name,
      email,
      college,
      batch,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    });

    return res.redirect("/");
  } catch (err) {
    console.log(`Unable to add students in DB ${err}`);
    res.redirect("back");
  }
};
