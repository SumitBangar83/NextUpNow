import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/jwt.js";
import { isValidGmail } from "../utils/validations.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if all fields are present
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  if (!isValidGmail(email)) {
    throw new Error("please enter valid email")
  }
  // 2. Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409); // 409 Conflict is more specific here
    throw new Error("User with this email already exists");
  }

  // 3. Create a new user (password will be hashed automatically by mongoose middleware)
  const user = await User.create({
    name,
    email,
    password,
  });

  // 4. If user created successfully, send back data with token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("please enter all fields")
  }

  if (!isValidGmail(email)) {
    throw new Error("please enter valid email")
  }
  // 1. Find user by email
  const user = await User.findOne({ email });

  // 2. Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.token,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 401 Unauthorized
    throw new Error("Invalid email or password");
  }
});


export { registerUser, loginUser };