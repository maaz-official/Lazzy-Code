import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const uri = process.env.DB_LOCATION || "mongodb+srv://project_1_blog:project_1_blog@cluster0.zpgx61r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🎉🎉🎉🎉🎉Connected to MongoDB 🎉🎉🎉🎉🎉🎉"); // Log with celebration emoji
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
