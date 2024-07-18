const { Router } = require("express");
const router = Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  profileSetUp,
  logOut,
  getUsers,
  uploadImg,
  setImage,
} = require("../controlers/authControler");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/profileSetUp", profileSetUp);
router.get("/logout", logOut);
router.get("/usersFind", getUsers);
router.post("/upload", uploadImg);
router.get('/user/:username/image', setImage)

module.exports = router;
