const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const login = async (req, res) => {
  const { username, password } = req.query;
  console.log(req.query);
  console.log(username);
  if (!username || !password) {
    return res
      .status(422)
      .json({ message: "Please provide email or password." });
  } else {
    User.findOne({ username: username }) // Assuming the field in the database is called 'email'
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({ message: "Invalid email or password" });
        }
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            const token = GenerateToken(savedUser);
            const { _id, username, role, phoneNumber } = savedUser;
            // Add return statement for sending response after successful login
            return res.status(200).json({
              token,
              user: {
                _id,
                username,
                role,
                phoneNumber,
              },
            });
          } else {
            return res
              .status(422)
              .json({ message: "Invalid email or password." });
          }
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      });
  }
};

const userList = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(req.query);
    if (_id) {
      const user = await User.findById({ _id: _id });
      return res.status(200).json({ user });
    } else {
      const userList = await User.find({});
      return res.status(200).json({ userList });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: [{ message: "Something went wrong. Please try again." }],
    });
  }
};

const editUser = async (req, res) => {
  const { _id, username, phoneNumber, password, role, feature } = req.body;
  const user = await User.findById({ _id: new ObjectId(_id) });
  if (user) {
    const hashPassword = await generateHash(password);
    await User.findOneAndUpdate(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          username,
          phoneNumber,
          password: hashPassword,
          role,
          feature,
        },
      }
    );
    return res.status(200).json({ message: "User is updated" });
  } else {
    return res.status(400).json({ message: "User not found!" });
  }
};
const addUser = async (req, res) => {
  const { username, phoneNumber, password, role, feature } = req.body;
  if (!username || !phoneNumber || !password || !role || !feature) {
    return res.status(422).json({ message: "Please add all parameters" });
  }

  try {
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    const hashPassword = await generateHash(password);

    const newUser = new User({
      username,
      phoneNumber,
      password: hashPassword,
      role,
      feature,
    });

    await newUser.save();
    return res.status(200).json({ message: "User is Created" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Please check the data!!!" });
  }
};

const generateHash = async (text) => {
  return bcrypt
    .hash(text, 12)
    .then((hashText) => {
      return hashText;
    })
    .catch((err) => {
      console.log("hash cannot be generated", err);
      throw err;
    });
};

function GenerateToken(user) {
  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
}

module.exports = {
  login,
  addUser,
  editUser,
  userList,
};
