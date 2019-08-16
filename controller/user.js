const User = require("../models/user");
const _ = require("lodash");

exports.userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });

    req.profile = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized)
    return res.status(403).json({ error: "user is not authorize" });

  next();
};

exports.allUser = async (req, res) => {
  try {
    const users = await User.find({}).select("name email updated created");
    res.json({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  req.profile.__v = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res, next) => {
  let user = req.profile;

  user = _.extend(user, req.body);
  user.updated = Date.now();

  try {
   const updatedUser= await user.save();
    req.profile.password = undefined;
    req.profile.__v = undefined;
    res.json({ updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.removeUser = async (req, res) => {
    let user = req.profile;
  
    try {
     let delUser= await user.remove();
      res.json({ message:`User name with ${delUser.name} has been deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "internal server error",
        error: error
      });
    }
  };
  