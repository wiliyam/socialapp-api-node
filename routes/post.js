const express = require("express");
const postController = require("../controller/post");
const { requireSignIn } = require("../controller/auth");

const router = express.Router();

router.get("/", postController.getPost);
router.post("/post",requireSignIn, postController.createPost);

module.exports = router;
