import User from "../models/User.js";


export default {
    async list(req, res) {

        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users", error });
        }
    },

    async show(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user", error });
        }
    },

    async create(req, res) {
        const { username, email, password, description, image_url } = req.body;
        try {
            const newUser = await User.createUser({ username, email, password, description, image_url });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({
                message: "Error creating user",
                error: error.message,
                detail: error.detail
            });
        }
    },
    async update(req, res) {
        const { id } = req.params;
        const { username, email, password, description, image_url } = req.body;
        try {
            const updatedUser = await User.updateUser(id, { username, email, password, description, image_url });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    },
    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await User.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
}




