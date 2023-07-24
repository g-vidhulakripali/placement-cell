const Student = require("../models/studentSchema");

// Controller function to render the add student form page
module.exports.addStudent = function (req, res) {
  return res.render("student", { title: "Placement Cell | Student Portal" });
};

// Controller function to create a new student in the database
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
      req.flash("error", "Email already exists");
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
    req.flash("success", "Student Details are Added");
    return res.redirect("/");
  } catch (err) {
    console.log(`Unable to add students in DB ${err}`);
    res.redirect("back");
  }
};

// Controller function to delete a student and remove them from associated companies
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
    req.flash("success", "Student Details are Deleted");
    res.redirect("back");
  } catch (error) {
    console.log(`Error in deleting student ${err}`);
    return res.redirect("back");
  }
};
