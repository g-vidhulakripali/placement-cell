const Student = require("../models/studentSchema");
const fs = require("fs");
const path = require("path");

module.exports.download = async function (req, res) {
  try {
    const students = await Student.find({});

    let data = "";
    let no = 1;
    let csv =
      "Sl.No, Name, Email, College, Placement, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result";

    for (let student of students) {
      data =
        no +
        "," +
        student.name +
        "," +
        student.email +
        "," +
        student.college +
        "," +
        student.placement +
        "," +
        student.contactNumber +
        "," +
        student.batch +
        "," +
        student.dsa +
        "," +
        student.webd +
        "," +
        student.react;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data +=
            "," +
            interview.company +
            "," +
            interview.date.toString() +
            "," +
            interview.result;
        }
      }
      no++;
      csv += "\n" + data;
    }

    const dataFile = fs.writeFile(
      path.join(__dirname, "../assets/reports/report.csv"),
      csv,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirect("back");
        }
        console.log("Report generated successfully");
        return res.download(
          path.join(__dirname, "../assets/reports/report.csv")
        );
      }
    );
  } catch (err) {
    console.log(`Error in downloading file ${err}`);
    return res.redirect("back");
  }
};
