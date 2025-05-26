import express from 'express'
import { createStudent, deleteStudent, fetchAllStudents, test, updateStudent } from '../controllers/student.controller.js'
const StudentRouter = express.Router()

StudentRouter.get('/', fetchAllStudents)
StudentRouter.get('/test', test)
StudentRouter.post('/', createStudent)
StudentRouter.put('/:id', updateStudent)
StudentRouter.delete('/:id', deleteStudent)
StudentRouter.post('/checkbox', (req, res) => {
  const { checked } = req.body;

  if (typeof checked !== "boolean") {
    return res.status(400).json({ success: false, message: "Invalid checkbox value" });
  }

  return res.status(200).json({ success: true, checked });
});


export default StudentRouter