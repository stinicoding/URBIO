const Posts = require("../models/Posts.js");
const Users = require("../models/Users.js");

const savePost = async (req, res) => {
  const { owner, caption, description, labels, datetime, location, picture, rating, comments } =
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
      rating: rating,
      comments: comments
    };
    //save post
    const posting = await Posts.create(newPost);
    //console.log(posting)
    res.send({ ok: true, data: posting });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const displayPosts = async (req, res) => {
  const { owner } = req.body;
  console.log(owner)
  try {
    const postings = await Posts.find({owner: owner}).sort({ datetime: -1 });
    //console.log(postings)
    res.send({ok: true, data: postings})
  } catch(error) {
    res.send({ok: false, message: error})
  }
}

const saveComment = async (req, res) => {
  const { comment } = req.body;
  console.log(comment)
  try {
    //const com = await Posts.({})
    //res.send({ok: true, data: com})
  } catch(error) {
    res.send({ok: false, message: error})
  }
}

module.exports = {
  savePost,
  displayPosts,
  saveComment
};
