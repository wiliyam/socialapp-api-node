const Post = require("../models/post");
const Joi = require('joi');

exports.getPost =async (req, res) => {



try {
    const posts=await Post.find({},{title:1,body:1})
        res
        .json({
          posts:posts
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

exports.createPost = async (req, res) => {
  const post = new Post(req.body);

  console.log("Creating post", post);

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
};

