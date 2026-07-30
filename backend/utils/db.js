import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log("MONGO_URI prefix:", process.env.MONGO_URI?.substring(0, 20));

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;