const router = require("express").Router();
const controller = require("../controllers/citiesController.js");

router.post("/uploadcities", controller.uploadCities)
router.get("/getallcities", controller.getAllCities)

module.exports = router;