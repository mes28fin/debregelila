const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username}`);

    // Check if user exists
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(404).send({ message: "User Not found." });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    console.log(`Password check for ${username}: ${passwordIsValid}`);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Initial setup to create a default admin if none exists
exports.createAdmin = async (req, res) => {
    try {
        const count = await User.count();
        if (count === 0) {
            await User.create({
                username: "admin",
                password: bcrypt.hashSync("admin123", 8),
                role: "admin"
            });
            return res.status(201).send({ message: "Default admin user created: admin / admin123" });
        }
        res.status(400).send({ message: "Admin already exists." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
