const router = require("express").Router();
const Cities = require("../models/Cities.js");

router.post("/uploadcities", async (req, res) => {
  const { name, url } = req.body;
  try {
    const upload = await Cities.create({ img: url, name: name });
    res.send({ ok: true, data: upload });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/getallcities", async (req, res) => {
  try {
    const cities = await Cities.find();
    res.send({ ok: true, data: cities });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
