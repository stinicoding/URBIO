const Users = require("../models/Users.js");
const bcrypt = require("bcryptjs"); // https://github.com/dcodeIO/bcrypt.js#readme
const validator = require("validator");

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

module.exports = {
  registerUser,
};
