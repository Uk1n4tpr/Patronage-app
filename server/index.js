const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = 8000;
const cookieParser = require('cookie-parser')

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
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use("/", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
