const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.register = async (userData) => {
  if (userData.password !== userData.repeatPassword) {
    throw new Error("Passwords do not match");
  }

  const user = await User.create(userData);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const payload = { _id: user._id, email: user.email };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });
  return token;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const payload = { _id: user._id, email: user.email };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
};
