const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignupController(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Please provide  required fields: email, password, and name",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel({
      email,
      password: hashPassword,
      name,
    });

    const savedUser = await userData.save();

    return res.status(201).json({
      message: "User registered successfully",
      data: savedUser,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignupController;
