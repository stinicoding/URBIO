const router = require("express").Router();
const controller = require("../controllers/commentsController");

router.post("/newcomment", controller.saveComment);
router.delete("/deletecomment/:comment_id", controller.deleteComment);
router.post("/:post_id", controller.displayComments);

module.exports = router;
