import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const generateAccessToken = (user) => {
  const payload = {
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

const RegisterUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10); // Hash the password

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      username,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accesToken = user.generateAccessToken(); // Generate generateAccessToken token
    const refreshToken = jwt.sign(
      { email: email },
      Process.env.REFRESH_SECRET,
      { expiresIn: "7d" },
    ); // Generate refresh token

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "User logged in successfully",
      user,
      accesToken,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }
  const refreshToken = cookies.refreshToken;

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const user = { email: decoded.email }; // Create a user object with the email from the decoded token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const accesToken = generateAccessToken(user); // Generate a new access token

    res.json({ accesToken });
  });
};

const LogoutUser = (req, res) => {
  res.clearCookie("refreshToken");
};

module.exports = {
  RegisterUser,
  LoginUser,
  refreshToken,
  LogoutUser,
};
