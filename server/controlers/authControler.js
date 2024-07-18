const User = require("../models/User");
const {
  hashPassword,
  comparePasswords,
  sendMail,
} = require("../helpers/authHelp");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs')

const test = (req, res) => {
  res.json("test is working");
};

//upload picture setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("profilePicture");

//register endpoint

const registerUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      mjestoPrebivalista,
      struka,
      vrstaUsluga,
      godineStaza,
      oKorisniku,
    } = req.body;
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
      mjestoPrebivalista,
      struka,
      vrstaUsluga,
      godineStaza,
      oKorisniku,
    });

    let sentMail = await sendMail(user._id, user.email);
    console.log(sentMail);
    return res.json(user);
  } catch (error) {
    console.log(error);
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
      req.session.user = {
        name: user.name,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        facebook: user.facebook,
        instagram: user.instagram,
        mjestoPrebivalista: user.mjestoPrebivalista,
        struka: user.struka,
        vrstaUsluga: user.vrstaUsluga,
        godineStaza: user.godineStaza,
        oKorisniku: user.oKorisniku,
        firstLogin: user.firstLogin,
        image: user.image,
        joiningDate: user.joiningDate,
        isActivated: user.isActivated,
      };
      res.json(user);
    }
    if (!match) {
      res.json({ error: "Passwords do not match" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json(user);
  } else {
    res.json(null);
  }
};

const profileSetUp = async (req, res) => {
  try {
    const {
      email,
      phone,
      facebook,
      instagram,
      mjestoPrebivalistaCheck,
      strukaCheck,
      vrsteUslugaCheck,
      godineStazaCheck,
      oKorisnikuCheck,
    } = req.body;
    const filter = await User.findOne({ email });
    const update = {
      $set: {
        phone: phone,
        facebook: facebook,
        instagram: instagram,
        mjestoPrebivalista: mjestoPrebivalistaCheck,
        struka: strukaCheck,
        godineStaza: godineStazaCheck,
        oKorisniku: oKorisnikuCheck,
        firstLogin: 1,
      },
      $push: { vrstaUsluga: { $each: vrsteUslugaCheck } },
    };
    const options = { upsert: false };
    const result = await User.updateOne(filter, update, options);
    res.json(result);
    getProfile(req, res);
  } catch (error) {
    console.log(error);
  }
};

const logOut = (req, res) => {
  let result = req.session.destroy();
  res.json(result);
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const uploadImg = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Upload error: ", err.message);
      return res
        .status(500)
        .json({ message: "Upload failed", error: err.message });
    }
    console.log("File uploaded successfully", req.file);
    const userName = req.body.userName;
    const profilePicturePath = req.file.path;
    try {
      const user = await User.findOneAndUpdate(
        { userName },
        { image: profilePicturePath }
      );
      console.log("user updated sucessfully: ", user);
      res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
    } catch (error) {
      console.error("user update error: ", error.message);
      res
        .status(500)
        .json({ message: "Error updating user profile", error: error.message });
    }
  });
};

const setImage = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ userName: username });

    if (!user || !user.image) {
      return res.status(404).json({ error: "user not found" });
    }

    const filename = path.basename(user.image)
    const imagePath = path.join(__dirname, '../uploads', filename);

    if(!fs.existsSync(imagePath)){
      return res.status(404).json({error: 'image file not found'})
    }
    const imageBase64 = fs.readFileSync(imagePath, {encoding:'base64'})

    res.json({ imageBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  profileSetUp,
  logOut,
  getUsers,
  uploadImg,
  setImage,
};
