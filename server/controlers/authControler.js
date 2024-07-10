const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../helpers/authHelp");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//register endpoint

const registerUser = async (req, res) => {
  try {
    const { name, lastName, userName, email, password } = req.body;

    //check name
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    //check lastName
    if (!lastName) {
      return res.json({
        error: "lastName is required",
      });
    }
    //check userName
    const userNameExists = await User.findOne({ userName });
    if (userNameExists || !userName) {
      return res.json({
        error:
          "userName already exists and is required that you input valid username",
      });
    }
    //check email
    const emailExists = await User.findOne({ email });
    if (emailExists || !email) {
      return res.json({
        error: "email is already registered and its required to input email",
      });
    }
    //check password
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast 6 character long",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//set profile requirements

const profileSetUser = async (req, res) => {
  const { mjestoPrebivalista, struka, vrsteUsluga, godineStaza, oKorisniku } =
    req.body;
  try {
    const newSetProfile = await User.findByIdAndUpdate(
      User._id,
      {
        $set: {
          mjestoPrebivalista: mjestoPrebivalista,
          struka: struka,
          vrstaUsluga: vrsteUsluga,
          godineStaza: godineStaza,
          oKorisniku: oKorisniku,
        },
      },
      { new: true, useFindAndModify: false }
    );
    console.log("Updated User:", newSetProfile);
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    //check userName
    const userNick = await User.findOne({ userName });
    if (!userNick) {
      return res.json({
        error: "no user with this username",
      });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    }
    //check password match
    const match = await comparePasswords(password, user.password);
    if (match) {
      jwt.sign(
        {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          mjestoPrebivalista: user.mjestoPrebivalista,
          sturka: user.struka,
          vrsteUsluga: user.vrstaUsluga,
          godineStaza: user.godineStaza,
          oKorisniku: user.oKorisniku,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({ error: "Passwords do not match" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        throw err;
      }
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  profileSetUser,
  loginUser,
  getProfile,
};
