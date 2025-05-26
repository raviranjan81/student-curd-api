import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import StudentRouter from './routes/student.route.js'
const app = express()


connectDB()

const PORT = process.env.PORT || 8080


app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
}))


app.use('/api/v1/students', StudentRouter);

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`)
})

