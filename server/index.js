const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json());
 
 
app.get("/", (req, res) => {
    res.send("Hello, world!");
  });
 
app.post("/AddStudent", (req, res) => {
  const studentData = req.body;
 
  let existingData = [];
  try{
    existingData = JSON.parse(fs.readFileSync("students.json"));
  }catch(error) {

  }
  existingData.push(studentData);
  fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));
 
  res.json({ success: true, message: "Student added Successfully!" });
})
  const port = 1337;
 
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
 
app.get("/viewStudents", (req, res) => {
  try {
    const studentData = JSON.parse(fs.readFileSync("students.json"));
    res.json(studentData);
  } catch (error) {
    console.error("Error reading student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.put("/editStudent", (req, res) => {
//   const updateStudentData = req.body;
//   let existingData = [];

//   try {
//       existingData = JSON.parse(fs.readFileSync("students.json"));
//       const index = existingData.findIndex(student => student.ID == updateStudentData.ID);

//       if (index !== -1) {
//           existingData[index] = updateStudentData;
//           fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));
//           res.json({ success: true, message: "Student updated successfully!" });
//       } else {
//           res.status(404).json({ error: "Student not found" });
//       }
//   } catch (error) {
//       console.error("Error updating student data:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.put('/updateStudent/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;
  
  let studentsData = JSON.parse(fs.readFileSync('students.json'));

  const updatedStudentsData = studentsData.map(student => {
    if (student.IdNumber === studentId) {
      return { ...student, ...updatedStudentData };
    }
    return student;
  });

  fs.writeFileSync('students.json', JSON.stringify(updatedStudentsData, null, 2));

  res.json({ success: true, message: 'Student data updated successfully' });
});
