const Student = require("../models/studentSchema");
const Company = require("../models/companySchema");

module.exports.company = async function (req, res) {
  try {
    let students = await Student.find({});
    return res.render("company_home", {
      title: "Placement Cell | Company Portal",
      students: students,
    });
  } catch (err) {
    console.log(`Error in finding the Student ${err}`);
    return res.render("back");
  }
};

module.exports.interview = async function (req, res) {
  try {
    const students = await Student.find({});

    return res.render("company_interview_form", {
      title: "Placement Cell | Company Portal",
      students: students,
    });
  } catch (err) {
    console.log(`Error in finding the student: ${err}`);
    return res.redirect("back");
  }
};

module.exports.create = async function (req, res) {
  const { id, company, date } = req.body;
  try {
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: id,
      date,
      result: "Pending",
    };
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      for (let student of existingCompany.students) {
        // if student id already exists
        if (student.student._id === id) {
          console.log("Interview with this student already scheduled");
          return res.redirect("back");
        }
      }
      existingCompany.students.push(obj);
      existingCompany.save();
    }

    const student = await Student.findById(id);

    if (student) {
      const interview = {
        company,
        date,
        result: "Pending",
      };
      student.interviews.push(interview);
      student.save();
    }
    console.log("Interview Scheduled Successfully");
    return res.redirect("/company/home");
  } catch (error) {
    console.log(`Error in finding the student ${error}`);
    return res.redirect("back");
  }
};

module.exports.update = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          student.save();
          break;
        }
      }
    }
    const company = await Company.findOne({ name: companyName });

    if (company) {
      for (let std of company.students) {
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.save();
        }
      }
    }
    console.log("Interview Status Changed Successfully");
    return res.redirect("back");
  } catch (error) {
    console.log(`Error in updating ${error}`);
    res.redirect("back");
  }
};
