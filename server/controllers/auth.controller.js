import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      firstName,
      lastName,
      email,
      password,
      bio = "",
      skills = "",
      phoneNumber,
      address = "",
      experience = "",
      resumeLink = "",
    } = req.body;

    const fullName = name || `${firstName || ""} ${lastName || ""}`.trim();
    const skillArray =
      typeof skills === "string"
        ? skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : Array.isArray(skills)
          ? skills
          : [];

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      bio,
      skills: skillArray,
      address,
      phone: phoneNumber ? Number(phoneNumber) : 0,
      experience:
        typeof experience === "string" && experience.trim()
          ? [experience.trim()]
          : Array.isArray(experience)
            ? experience
            : [],
      resume: resumeLink || "",
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // `protect` middleware attaches `req.user`
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
