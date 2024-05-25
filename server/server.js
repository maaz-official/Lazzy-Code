import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js"; // Import the connection function
import userRoutes from "./routes/userRoutes.js"; // Import user routes

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// Connect to the database
connectToDatabase()
  .then(() => {
    // Define the welcome message endpoint
    app.get("/", (req, res) => {
      res.send("Welcome to the Express API!");
    });

    // Mount user routes on the '/api/users' endpoint
    app.use("/api/users", userRoutes);

    // Start the server after the database connection is established
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if there's an error connecting to the database
  });
