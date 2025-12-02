const router = require("express").Router();
const controller = require("../controllers/usersController");

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.post("/token", controller.verifyToken);
router.post("/uploadpicture", controller.uploadPicture);
router.delete("/removepicture/:_id", controller.removePicture);

module.exports = router;
