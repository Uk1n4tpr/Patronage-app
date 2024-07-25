const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = 8000;
const session = require("express-session");
const path = require('path');
const cors = require('cors'); // Import cors module

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      secure: false,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173", // Replace with your frontend URL
}));

// Routes
app.use("/", require("./routes/auth"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});