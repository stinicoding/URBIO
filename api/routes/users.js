const router = require("express").Router();
const Users = require("../models/Users.js");
const bcrypt = require("bcryptjs"); // https://github.com/dcodeIO/bcrypt.js#readme
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
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
});

router.post("/token", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "Token is corrupted" })
      : res.json({ ok: true, succ });
  });
});

router.patch("/updategroups", async (req, res) => {
  const { owner, labels } = req.body;
  try {
    const user = await Users.findOneAndUpdate(
      { email: owner },
      { groups: labels },
    );
    //console.log(user);
    res.send({ ok: true, data: user });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/getinfo/:owner", async (req, res) => {
  const { owner } = req.params;
  try {
    const user = await Users.find({ email: owner });
    res.send({ ok: true, data: user[0].name });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/getgroups/:owner", async (req, res) => {
  const { owner } = req.params;
  //console.log(owner);
  try {
    const user = await Users.find({ email: owner }); //find returns an array
    res.send({ ok: true, data: user[0].groups }); //only send group array to the frontend
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

//Profile Picture
router.patch("/uploadpicture/:owner", async (req, res) => {
  try {
    const { owner, file } = req.body;
    const picture = {
      public_id: file.uploadInfo.public_id,
      photo_url: file.uploadInfo.secure_url,
    };
    const user = await Users.findOneAndUpdate(
      { owner },
      { picture },
      { new: true },
    );
    res.json({ ok: true, data: user.picture });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.delete("/removepicture/:owner", async (req, res) => {
  try {
    const { owner } = req.body
    const user = await Users.findOne({ owner });
    if (!user?.picture?.public_id) {
      return res.json({ ok: false });
    }
    await cloudinary.v2.uploader.destroy(user.picture.public_id);
    user.picture = null;
    await user.save();
    res.json({ ok: true });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});


module.exports = router;
