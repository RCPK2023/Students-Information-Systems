const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json());

const path = require('path');

app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

app.post("/addStudent", (req, res) => 
{
    const studentData = req.body;
    const filePath = path.join(__dirname, "students.json");
    let existingData = [];
    try
    {
        existingData = JSON.parse(fs.readFileSync("students.json"));
    }catch(error)
    {

    }

    existingData.push(studentData);

    fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: "Student added successfully!"});
})
  const port = 1337;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});