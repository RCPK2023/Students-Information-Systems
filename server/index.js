const express = require("express");
const mongoose = require("mongoose");
const User = require("./user.model");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

mongoose.connect("mongodb://localhost:27017/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.error("Error connecting to MongoDB: ", error)
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
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

app.put("/updateStudent/:id", (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;

  let studentsData = JSON.parse(fs.readFileSync("students.json"));

  const updatedStudentsData = studentsData.map((student) => {
    if (student.IdNumber === studentId) {
      return { ...student, ...updatedStudentData };
    }
    return student;
  });

  fs.writeFileSync(
    "students.json",
    JSON.stringify(updatedStudentsData, null, 2)
  );

  res
    .status(200)
    .json({ success: true, message: "Student data updated successfully" });
});

app.post("/AddStudent", (req, res) => {
  const studentData = req.body;

  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync("students.json"));
  } catch (error) {}
  existingData.push(studentData);
  fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

  res.json({ success: true, message: "Student added Successfully!" });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
})

app.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();

    res.json({ success: true});
  } catch (error) {
    console.error("Error adding user:", error)
  }
})

app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true})

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser); 

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

const port = 1337;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

