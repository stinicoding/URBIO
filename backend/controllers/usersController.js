const Users = require("../models/Users.js");
const bcrypt = require("bcryptjs"); // https://github.com/dcodeIO/bcrypt.js#readme
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (!name || !email || !password || !password2) {
    return res.send({ ok: false, message: "All fields required" });
  }
  if (password !== password2) {
    return res.json({ ok: false, message: "Passwords must match" });
  }
  //run npm i validator in backend
  if (!validator.isEmail(email)) {
    return res.send({ ok: false, message: "Invalid Email" });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
      name: name,
      email: email,
      password: hash,
    };
    await Users.create(newUser);
    res.send({ ok: true, message: "Successfully registered" });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ ok: false, message: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res.send({ ok: false, message: "Invalid Email" });
  }
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.send({ ok: false, message: "Invalid user provided" });
    }
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
		//jwt_secret is a private key to verify the token on the server
      const token = jwt.sign({ userEmail: user.email }, jwt_secret, {
        expiresIn: "365days",
      });
      res.send({ ok: true, message: "Welcome back", token, email });
    } else {
      return res.send({ ok: false, message: "Invalid data provided" });
    }
  } catch (error) {
    res.send({ ok: false, error });
  }
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "Token is corrupted" })
      : res.json({ ok: true, succ });
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};
