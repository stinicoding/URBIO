const router = require("express").Router();
const controller = require("../controllers/commentsController");

router.post("/newcomment", controller.saveComment);
router.post("/:post_id", controller.displayComments);

module.exports = router;
