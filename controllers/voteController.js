import Vote from '../models/Vote.js';


export default {
    async list(req, res) {
        try {
            const votes = await Vote.getAllVotes();
            res.status(200).json(votes);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving votes", error });
        }
    },

    async show(req, res) {
        const { id } = req.params;
        try {
            const vote = await Vote.getVoteById(id);
            if (!vote) {
                return res.status(404).json({ message: "Vote not found" });
            }
            res.status(200).json(vote);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving vote", error });
        }
    }, 

    async create(req, res) {
        const { user_id, post_id, vote_type } = req.body;
        try {
            const newVote = await Vote.createVote({ user_id, post_id, vote_type });
            res.status(201).json(newVote);
        } catch (error) {
            res.status(500).json({
                message: "Error creating vote",
                error: error.message,
                detail: error.detail
            });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { user_id, post_id, vote_type } = req.body;
        try {
            const updatedVote = await Vote.updateVote(id, { user_id, post_id, vote_type });
            if (!updatedVote) {
                return res.status(404).json({ message: "Vote not found" });
            }
            res.status(200).json(updatedVote);
        } catch (error) {
            res.status(500).json({ message: "Error updating vote", error });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedVote = await Vote.deleteVote(id);
            if (!deletedVote) {
                return res.status(404).json({ message: "Vote not found" });
            }
            res.status(200).json({ message: "Vote deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting vote", error });
        }
    }

}
//