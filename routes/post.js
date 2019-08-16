const express = require("express");
const postController = require("../controller/post");
const { requireSignIn } = require("../controller/auth");
const user=require('../controller/user')

const router = express.Router();

router.get("/posts", postController.getPost);
router.post("/post/new/:userId",requireSignIn, postController.createPost);
router.get("/post/by/:userId",requireSignIn,postController.postByUser)
router.delete("/post/:postId",requireSignIn,postController.isPoster,postController.removePost)
router.put("/post/:postId",requireSignIn,postController.isPoster,postController.updatePost)

router.param("userId",user.userById)
router.param("postId",postController.postById)

module.exports = router;
