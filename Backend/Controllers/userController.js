const Users = require("../Models/usersSchema");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("profilePicture");

// Create a new user
exports.createUser = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, email, password, role } = req.body;
    let profilePicture = req.file ? req.file.path : "";

    try {
      if (!name || !email || !password || !role) {
        return res
          .status(400)
          .json({ error: "All fields except profile picture are required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Users({
        name,
        email,
        password: hashedPassword,
        role,
        profilePicture,
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({}); //populate("events createdEvents bookedEvents");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id); //populate("events createdEvents bookedEvents");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, email, password, role } = req.body;
    let profilePicture = req.file ? req.file.path : "";

    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      if (role) user.role = role;
      if (profilePicture) user.profilePicture = profilePicture;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
