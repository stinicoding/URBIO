const Posts = require("../models/Posts.js");

const savePost = async (req, res) => {
  const { owner, caption, description, labels, datetime, location, picture } =
    req.body;
  try {
    const newPost = {
      owner: owner,
      caption: caption,
      description: description,
      labels: labels,
      datetime: datetime,
      location: location,
      picture: picture,
    };
    await Posts.create(newPost);
    res.send({ ok: true, message: "New Post saved" });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

module.exports = {
  savePost,
};
