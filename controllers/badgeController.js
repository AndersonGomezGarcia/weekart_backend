import Badge from '../models/badgeModel.js';


export default {
    async list(req, res) {
        try {
            const badges = await Badge.getAllBadges();
            res.status(200).json(badges);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving badges", error });
        }
    },

    async show(req, res) {
        const { id } = req.params;
        try {
            const badge = await Badge.getBadgeById(id);
            if (!badge) {
                return res.status(404).json({ message: "Badge not found" });
            }
            res.status(200).json(badge);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving badge", error });
        }
    },

    async create(req, res) {
        const { name, description, image_url } = req.body;
        try {
            const newBadge = await Badge.createBadge({ name, description, image_url });
            res.status(201).json(newBadge);
        } catch (error) {
            res.status(500).json({
                message: "Error creating badge",
                error: error.message,
                detail: error.detail
            });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, description, image_url } = req.body;
        try {
            const updatedBadge = await Badge.updateBadge(id, { name, description, image_url });
            if (!updatedBadge) {
                return res.status(404).json({ message: "Badge not found" });
            }
            res.status(200).json(updatedBadge);
        } catch (error) {
            res.status(500).json({ message: "Error updating badge", error });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedBadge = await Badge.deleteBadge(id);
            if (!deletedBadge) {
                return res.status(404).json({ message: "Badge not found" });
            }
            res.status(200).json({ message: "Badge deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting badge", error });
        }
    }
    
}