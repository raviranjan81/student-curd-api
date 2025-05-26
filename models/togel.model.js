import { model, Schema } from "mongoose";

const togelSchema = new Schema({
  
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
const TogelModel = model('Togel', togelSchema)

export default TogelModel
