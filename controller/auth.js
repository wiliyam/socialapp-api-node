const User = require("../models/user");
const passUtils = require("../helper/password");
const jwtUtils = require("../helper/jwt");
const expressJwt=require('express-jwt')

exports.signUp = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist)
      return res.status(403).json({ error: "Email is already taken" });

    const details = {
      email: req.body.email,
      name: req.body.name,
      password: await passUtils.encryptPassword(req.body.password)
    };

    const user = await new User(details);
    await user.save();

    res.status(200).json({ message: "SignUp success.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(401)
        .json({ message: "User not exist with this email" });

    let passMatch = await passUtils.comparePassword(
      req.body.password,
      user.password
    );

    if (!passMatch) return res.status(401).json({ message: "Wrong Password" });

    let { _id, name, email } = user;
    const token = await jwtUtils.signToken({ _id });

    res.cookie("token", token, { expire: new Date() + 999 });

    return res.status(200).json({token, _id, name, email});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      error: error
    });
  }
};

exports.signOut=(req,res)=>{
    res.clearCookie("token")

    res.status(200).json({message:'Signout success'})
}

exports.requireSignIn=expressJwt({
    secret:process.env.JWT_KEY,
    userProperty:"auth"
})