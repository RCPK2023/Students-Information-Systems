const { Schema, model: _model } = require("mongoose");

const Student = new Schema({
    IdNumber: {type: String, required: true},
    Password: {type: String, required: true},
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    MiddleName: {type: String, required: true},
    Course: {type: String, required: true},
    Year: {type: String, required: true},
},
{ collection: "student-data"});

const model = _model("StudentData", Student);

module.exports = model;