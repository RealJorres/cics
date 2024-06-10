// Import the express module
const express = require("express");
const mongoose = require("mongoose");
const userRotes = require("./routes/userRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());

let dbURI = "mongodb+srv://superusername:superpassword@projectcluster.rn8pcf9.mongodb.net/mit_db?retryWrites=true&w=majority&appName=projectcluster";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// Define a route handler for the default home page
app.use("/api/users", userRotes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/auth/", authRoutes);
app.get("/api", (req, res) => {
  res.send("API is working...");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
