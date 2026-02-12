import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // No options needed for Mongoose v7+
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection error!", error);
    process.exit(1);
  }
};

export { connectDB };
