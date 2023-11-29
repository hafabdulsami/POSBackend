const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

checkAuthority = (req, res, next) => {
  const { authorization, key } = req.headers;
  console.log(key);
  if (!authorization) {
    return res.status(401).json({ error: "You must be login!" });
  } else {
    const token = authorization.replace("Bearer ", "");
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "You must be login!" });
      } else {
        const { _id } = payload;
        User.findById(_id).then((savedUser) => {
          if (savedUser.role === 0 || savedUser.feature.includes(key)) {
            req.user = savedUser;
            return next();
          }
          return res.status(403).json({ error: "Not Authorized" });
        }).catch(()=>{
          console.log("Not found")
        });
      }
    });
  }
};
module.exports = {
  checkAuthority,
};
