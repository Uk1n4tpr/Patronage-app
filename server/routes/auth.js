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
  postComment,
  getComments,
  commentReply,
  getReplyes,
} = require("../controlers/authControler");


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
router.post('/commentPost', postComment)
router.get('/comments/:userName', getComments)
router.post('/comment-reply/:comment', commentReply)
router.get('/fetch-replyes/:comment', getReplyes)

module.exports = router;
