
const bcrypt = require("bcrypt");



const salt=process.env.SALT


  exports.encryptPassword= async password => {
    return await bcrypt.hash(password, salt);
  },
  exports.comparePassword= async (password,hash) => {
    return await bcrypt.compare(password, hash);
  }