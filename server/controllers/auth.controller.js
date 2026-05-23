import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
