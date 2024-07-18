const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = 8000;
const session = require("express-session");
const path = require('path')

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
