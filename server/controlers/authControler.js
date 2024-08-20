const User = require("../models/User");
const Comment = require("../models/Comments");
const {
  hashPassword,
  comparePasswords,
  sendMail,
} = require("../helpers/authHelp");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

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

    // Find the user by email
    const filter = { email };
    const user = await User.findOne(filter);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare the pull array
    const pullArray = user.vrstaUsluga.filter((usluga) =>
      vrsteUslugaCheck.includes(usluga)
    );

    // Update operation to pull items
    await User.updateOne(filter, {
      $pull: { vrstaUsluga: { $in: pullArray } },
    });

    // Update operation to push new items
    await User.updateOne(filter, {
      $push: { vrstaUsluga: { $each: vrsteUslugaCheck } },
    });

    // Update other fields
    await User.updateOne(filter, {
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
    });

    // Send response
    res.json({ message: "Profile updated successfully" });

    // Call getProfile function (assumed to be defined elsewhere)
    /* getProfile(req, res); */
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

    const filename = path.basename(user.image);
    const imagePath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "image file not found" });
    }
    const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

    res.json({ imageBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

const postComment = async (req, res) => {
  try {
    const { userId, name, comment, userName, replies } = req.body;

    // Create new comment using Comment model
    const newComment = new Comment({
      userId,
      name,
      comment,
      userName,
      replies,
    });

    // Save the comment
    await newComment.save();

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (err) {
    console.error("Error creating comment:", err);
    res
      .status(500)
      .json({ message: "Failed to create comment", error: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const username = req.params.userName;
    const comments = await Comment.find({ userName: username }).sort({
      created: -1,
    }); // Fetch comments sorted by creation date (newest first)
    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const commentReply = async (req, res) => {
  try {
    const replyBody = req.body.reply;
    console.log(replyBody);
    const comment = req.params;
    const filter = await Comment.findOne(comment);
    const update = {
      $push: { replies: replyBody },
    };
    const result = await Comment.updateOne(filter, update);
    res.json(result);
    console.log(result);
  } catch (error) {
    console.error({ message: error.message });
  }
};

const getReplyes = async (req, res) => {
  try {
    const comment = req.params;
    const filter = await Comment.findOne(comment);
    console.log(filter.replies);
    res.json(filter);
  } catch (error) {
    console.error(error);
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
  postComment,
  getComments,
  commentReply,
  getReplyes,
};
