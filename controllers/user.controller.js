const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add New User
const signup = async (req, res) => {
  const user = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  const result = await User.create({
    username: user.username,
    password: hashedPassword,
  });
  console.log(result);
  return res.status(201).json({ msg: "user created successfully!" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect password");
    }

    console.log("loggedIn");

    let data = {
      usename: username,
      password: password,
    };
    const token = jwt.sign(data, "secretkey");
    return res.send({ user, token: token , msg: "loggedIn!"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get All Users Info
const getAllUsers = async (req, res) => {
  const allusers = await User.find({});
  res.status(200).send(allusers);
};

module.exports = {
  getAllUsers,
  signup,
  login,
};
