const User = require("../models/user");

exports.userById = async (re, res, next, id) => {
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
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorized)
    return res.status(403).json({ error: "user is not authorize" });

  next();
};
