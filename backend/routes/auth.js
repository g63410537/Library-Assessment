const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    const { userType, userFullName, admissionId, employeeId, age, dob, gender, address, mobileNumber, email, password, isAdmin } = req.body;

    // Salting and Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      userType,
      userFullName,
      admissionId,
      employeeId,
      age,
      dob,
      gender,
      address,
      mobileNumber,
      email,
      password: hashedPass,
      isAdmin,
    });

    // Save User and Return
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* User Login */
router.post("/signin", async (req, res) => {
  try {
    console.log(req.body, "req");
    const user = req.body.admissionId
      ? await User.findOne({
          admissionId: req.body.admissionId,
        })
      : await User.findOne({
          employeeId: req.body.employeeId,
        });

    console.log(user, "user");

    !user && res.status(404).json("User not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    !validPass && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports =  router
