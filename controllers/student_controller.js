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

module.exports.delete = async function (req, res) {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (student && student.interviews.length > 0) {
      for (let item of student.interviews) {
        const company = await Company.findOne({ name: item.company });
        if (company) {
          for (let i = 0; i < company.students.length; i++) {
            if (company.students[i].student.toString() === id) {
              company.students.splice(i, 1);
              company.save();
              break;
            }
          }
        }
      }
    }
    await Student.findByIdAndDelete(id);
    res.redirect("back");
  } catch (error) {
    console.log(`Error in deleting student ${err}`);
    return res.redirect("back");
  }
};
