import express from 'express'
import { createStudent, deleteStudent, fetchAllStudents, updateStudent } from '../controllers/student.controller.js'
const StudentRouter = express.Router()

StudentRouter.get('/', fetchAllStudents)
StudentRouter.post('/', createStudent)
StudentRouter.put('/:id', updateStudent)
StudentRouter.delete('/:id', deleteStudent)

export default StudentRouter