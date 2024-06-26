const express = require("express");
const mongoose = require("mongoose");
const User = require("./user.model");
const Students = require("./student.model");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// MARK: Users connection
mongoose.connect("mongodb://localhost:27017/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB [Users]");
}).catch(error => {
  console.error("Error connecting to MongoDB[Users]: ", error)
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//MARK: Superannuated code
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

//MARK: Amongoose endpoints 

//MARK: VIEW USERS
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
})

//MARK: ADD USERS
app.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    const newUser = new User(userData);
    await newUser.save();

    res.json({ success: true, message: 'User account created successfully' });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


//MARK: UPDATE USERS
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

//MARK: LOGIN
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) {
      if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password', userType: 'User' });
      }

      return res.status(200).json({ message: 'Login successful!', userType: 'User', user });
    }

    let IdNumber = email;

    let student = await Students.findOne({ IdNumber });

    if (student) {
      if (student.Password !== password) {

        return res.status(401).json({ 
          message: 'Incorrect password', 
          userType: 'Student' , 
          studentPassword: student.Password, 
          studentInputPassword: password 
        });
      }

      return res.status(200).json({ message: 'Login successful!', userType: 'Student', student});
    }

    res.status(404).json({ message: 'User not found in both Users and Students', userType: null});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



//MARK: New Students

//MARK: Get student data
app.get("/api/viewStudents", async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
})

//MARK: Get a single student data
app.get('/api/getStudent', async (req, res) => {
  const studentIdNumber = req.query.id;

  try {
    const student = await Students.findOne({ IdNumber: studentIdNumber }); 
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});




//MARK: Add student data
app.post("/api/addStudents", async (req, res) => {
  try {
    const studentsData = req.body;

    const existingStudents = await User.findOne({ IdNumber: studentsData.IdNumber });

    if (existingStudents) {
      return res.status(400).json({ success: false, error: 'IDNumber already exists' });
    }

    const newStudent = new Students(studentsData);
    await newStudent.save();

    res.json({ success: true, message: 'Student account created successfully' });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

//MARK: Update student data
app.put("/api/updateStudents/:id", async (req, res) => {
  const studentsId = req.params.id;
  const updatedStudentData = req.body;

  try {
    const updatedStudent = await Students.findByIdAndUpdate(studentsId, updatedStudentData, { new: true})

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ studentData: updatedStudent, success: true });

  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

const port = 1337;


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

