const Posts = require("../models/Posts.js");
const Users = require("../models/Users.js");

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
    //save post
    const posting = await Posts.create(newPost);
    console.log(posting)
    //push post to user postings array
    //await Users.findOneAndUpdate({email: owner}, { $push: { postings: posting._id } }, {new: true});
    res.send({ ok: true, message: "New Post saved" });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const displayPosts = async (req, res) => {
  const { owner } = req.params;
  try {
    const postings = await Posts.find({owner: owner})
    res.send({ok: true, message: postings})
  } catch(error) {
    res.send({ok: false, message: error})
  }
}

module.exports = {
  savePost,
  displayPosts
};
