const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate("postedBy", "_id name");
    if (!post) return res.status(400).json({ error: "Post not found" });

    req.post = post;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.isPoster = (req, res, next) => {
  const isPoster =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;

  if (!isPoster)
    return res.status(403).json({ error: "User is not authorized" });

  next();
};
exports.getPost = async (req, res) => {
  try {
    const posts = await Post.find({}, { title: 1, body: 1 }).populate(
      "postedBy",
      "_id name"
    );
    res
      .json({
        posts: posts
      })
      .status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.createPost = (req, res) => {
  const form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: "Image not uploaded." });
    let post = new Post(fields);
    post.postedBy = req.profile;

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    try {
      let result = await post.save();
      res.status(200).json({
        message: "post added",
        post: post
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "internal server error",
        error: error
      });
    }
  });
};

exports.postByUser = async (req, res) => {
  const posts = await Post.find({ postedBy: req.profile.id })
    .populate("postedBy", "_id name")
    .sort("_created");

  res.json({ posts });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.removePost = async (req, res) => {
  let post = req.post;

  try {
    const delPost = await post.remove();

    res.json({ messagae: `deleted post title with ${delPost.title}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.updatePost = async (req, res, next) => {
  let post = req.post;
  console.log(post);
  console.log("body", req.body);
  post = _.extend(post, req.body);
  post.updated = Date.now();

  console.log("new post", post);

  try {
    const updatedPost = await post.save();

    res.json({ message: "update successfully", updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};
