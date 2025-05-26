import express from 'express'
import { createStudent, deleteStudent, fetchAllStudents, test, updateStudent } from '../controllers/student.controller.js'
const StudentRouter = express.Router()

StudentRouter.get('/', fetchAllStudents)
StudentRouter.get('/test', test)
StudentRouter.post('/', createStudent)
StudentRouter.put('/:id', updateStudent)
StudentRouter.delete('/:id', deleteStudent)

export default StudentRouter