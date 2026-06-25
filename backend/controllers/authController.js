import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      mobile,
      password
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(req.user.id)
        .select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};