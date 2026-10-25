
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [];

// READ: Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// CREATE: Add a student
app.post("/students", (req, res) => {
    const student = {
        id: Date.now(),
        name: req.body.name,
        branch: req.body.branch
    };

    students.push(student);
    res.status(201).json(student);
});

// UPDATE: Change student details
app.patch("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id == req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (req.body.name !== undefined) {
        student.name = req.body.name;
    }

    if (req.body.branch !== undefined) {
        student.branch = req.body.branch;
    }

    res.json(student);
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
    const studentExists = students.some(
        s => s.id == req.params.id
    );

    if (!studentExists) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(
        s => s.id != req.params.id
    );

    res.json({ message: "Student deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
