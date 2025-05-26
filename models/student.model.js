import { model, Schema } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})
const StudentModel = model('Student', studentSchema)

export default StudentModel
