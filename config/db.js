import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB)
    console.log("MongoDB Database Connected!")
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
export default connectDB