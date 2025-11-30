const Posts = require("../models/Posts.js");
const Users = require("../models/Users.js");

const savePost = async (req, res) => {
  const {
    owner,
    caption,
    description,
    labels,
    datetime,
    location,
    picture,
    rating,
    comments,
  } = req.body;
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
      comments: comments,
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
  //console.log(owner);
  try {
    const postings = await Posts.find({ owner: owner }).sort({ datetime: -1 });
    //console.log(postings)
    res.send({ ok: true, data: postings });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const getPost = async (req, res) => {
  const { post_id } = req.params;
  //console.log(post_id);
  try {
    const post = await Posts.findById({ _id: post_id });
    res.send({ ok: true, data: post });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const updatePost = async (req, res) => {
  const {
    post_id,
    caption,
    description,
    labels,
    datetime,
    location,
    picture,
    rating,
  } = req.body;
  //console.log(`post_id: ${post_id} `);
  try {
    const post = await Posts.findByIdAndUpdate(
      { _id: post_id },
      {
        caption: caption,
        description: description,
        labels: labels,
        datetime: datetime,
        location: location,
        picture: picture,
        rating: rating,
      }
    );
    res.send({ ok: true, data: post });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

const deletePost = async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await Posts.findByIdAndDelete(post_id);
    console.log(`delete: ${post}`);
    res.send({ ok: true, data: post });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
};

module.exports = {
  savePost,
  displayPosts,
  getPost,
  updatePost,
  deletePost,
};
