import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login (req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}