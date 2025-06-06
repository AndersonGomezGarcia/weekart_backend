import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming you have a User model defined
import userController from "./userController.js";
export default {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    try {
        const user = await User.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password"});
      }

      console.log("Contraseña enviada:", password);
console.log("Hash en DB:", user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" + email +"  ::  "  + password });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in"  + await bcrypt.hash(password, 10), error });
    }
  },
  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.createUser({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  },
  async logout(req, res) {
    // Invalidate the token or handle logout logic here
    res.status(200).json({ message: "Logged out successfully" });
  },
};
