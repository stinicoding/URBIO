const router = require("express").Router();
const Posts = require("../models/Posts.js");
const Comments = require("../models/Comments.js");

//Cloudinary for uploading pictures
const cloudinary = require("cloudinary");
require("dotenv").config({ path: "./.env" });
console.log(5, process.env.API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/newpost", async (req, res) => {
  const {
    owner,
    caption,
    description,
    labels,
    datetime,
    location,
    pictures,
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
      pictures: pictures,
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
});

router.post("/getposts", async (req, res) => {
  //used in groups (show all posts) and in blog (show only my posts)
  let owner;
  if (req?.body?.owner) {
    owner = req.body.owner;
  }
  console.log(`owner: ${owner}`);
  let postings;
  try {
    if (owner === undefined) {
      postings = await Posts.find().sort({ datetime: -1 });
    } else {
      postings = await Posts.find({ owner: owner }).sort({
        datetime: -1,
      });
    }
    //console.log(postings)
    res.send({ ok: true, data: postings });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/getpost/:post_id", async (req, res) => {
  const { post_id } = req.params;
  //console.log(post_id);
  try {
    const posting = await Posts.findById({ _id: post_id });
    res.send({ ok: true, data: posting });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.patch("/updatepost", async (req, res) => {
  const {
    post_id,
    caption,
    description,
    labels,
    datetime,
    location,
    pictures,
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
        pictures: pictures,
        rating: rating,
      }
    );
    res.send({ ok: true, data: post });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.delete("/deletepost/:post_id", async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await Posts.findByIdAndDelete(post_id);
    const com = await Comments.deleteMany({ post_id: post_id });
    console.log(`delete: ${(post, com)}`);
    res.send({ ok: true, data_post: post, data_com: com });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
