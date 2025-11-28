const Comments = require("../models/Comments.js");

const saveComment = async (req, res) => {
  const { owner, post_id, comment } = req.body;
  //console.log(comment);
  try {
    const newComment = { owner: owner, post_id: post_id, comment: comment };
    const com = await Comments.create(newComment);
    //console.log(com);
    res.send({ ok: true, data: com });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const displayComments = async (req, res) => {
  const { post_id } = req.params;
  console.log(post_id);
  try {
    const comments = await Comments.find({ post_id: post_id }).sort({
      datetime: -1,
    });
    console.log(comments);
    res.send({ ok: true, data: comments });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

module.exports = {
  saveComment,
  displayComments,
};
