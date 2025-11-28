const router = require("express").Router();
const controller = require("../controllers/postsController");

router.post("/newpost", controller.savePost);
router.post("/getposts", controller.displayPosts);

module.exports = router;
