import StudentModel from "../models/student.model.js";

export const fetchAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Fetched All Students!",
      totalStudents: students.length,
      students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    const newStudent = new StudentModel({ name, email, age });

    await newStudent.save();
    res.json({
      success: true,
      message: "New Student Created!",
      newStudent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const updated = await StudentModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    res.json({
      success: true,
      message: "Student Updated Successfully!",
      updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await StudentModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
    console.log(err.message)
  }
};
