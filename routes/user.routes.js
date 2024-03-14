const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  signup,
  login
} = require("../controllers/user.controller");

const {signupValidation,loginValidation} = require('../validation/user.validation')
const authMiddleware = require('../middleware/authMiddleware')

// AL routes
router.get("/allusers", authMiddleware , getAllUsers);

router.post("/signup", signupValidation, signup);

router.post("/login/",loginValidation, login);

module.exports = router;
