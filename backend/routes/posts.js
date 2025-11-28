const router = require("express").Router();
const controller = require("../controllers/postsController");

router.post("/newpost", controller.savePost);
router.post("/getposts", controller.displayPosts);
router.get("/getpost/:post_id", controller.getPost)
router.patch("/updatepost", controller.updatePost)

module.exports = router;
