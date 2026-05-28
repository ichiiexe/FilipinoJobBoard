import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.js";

// Controller function handling a request.
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
    // Normalize comma-separated skills into an array of trimmed values.
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

// Controller function handling a request.
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

// Controller function handling a request.
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    // Sanitize update payload before saving to the database.
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    if (updates.skills) {
      updates.skills =
        typeof updates.skills === "string"
          ? updates.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : Array.isArray(updates.skills)
            ? updates.skills
            : [];
    }

    if (updates.experience) {
      updates.experience =
        typeof updates.experience === "string" && updates.experience.trim()
          ? [updates.experience.trim()]
          : Array.isArray(updates.experience)
            ? updates.experience
            : [];
    }

    if (updates.phoneNumber) {
      updates.phone = Number(updates.phoneNumber);
      delete updates.phoneNumber;
    }

    if (updates.address) {
      updates.address = updates.address.trim();
      delete updates.address;
    }

    if (updates.bio) {
      updates.bio = updates.bio.trim();
      delete updates.bio;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function handling a request.
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
