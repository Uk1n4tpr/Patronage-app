const { Router } = require("express");
const router = Router();
const cors = require("cors");
const {
  test,
  registerUser,
  profileSetUser,
  loginUser,
  getProfile,
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
router.post("/profileSet", profileSetUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

module.exports = router;
