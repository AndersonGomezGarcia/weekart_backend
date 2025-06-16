import pool from "../config/db.js";


export default class Vote {
    constructor({ id, user_id, event_id, post_id, created_at }) {
        this.id = id;
        this.user_id = user_id;
        this.event_id = event_id;
        this.post_id = post_id;
        this.created_at = created_at;
    }
    
    static async createVote(voteData) {
        const vote = new Vote(voteData);
        const query = 'INSERT INTO votes (user_id, post_id, created_at) VALUES ($1, $2, $3) RETURNING *';
        const values = [vote.user_id, vote.post_id, vote.created_at];
        const result = await pool.query(query, values);

        // Update the votes column in the posts table for the given post_id
        const updatePostQuery = 'UPDATE posts SET votes = votes + 1 WHERE id = $1';
        await pool.query(updatePostQuery, [vote.post_id]);

        return result.rows[0];
    }

    static async getVoteById(id) {
        const query = 'SELECT * FROM votes WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }


    static async getAllVotes() {
        const query = 'SELECT * FROM votes';
        const result = await pool.query(query);
        return result.rows.map(row => new Vote(row));   
    }

    static async getVotesByUserId(user_id) {
        const query = 'SELECT * FROM votes WHERE user_id = $1';
        const values = [user_id];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));   
    }

    static async getVotesByPostId(post_id) {
        const query = 'SELECT * FROM votes WHERE post_id = $1';
        const values = [post_id];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));
    }
    static async getVotesByUserAndPost(user_id, post_id) {
        const query = 'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2';
        const values = [user_id, post_id];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));
    }
    

    static async updateVote(id, voteData) {
        const { user_id, post_id } = voteData;
        const query = 'UPDATE votes SET user_id = $1, post_id = $2 WHERE id = $3 RETURNING *';
        const values = [user_id, post_id, id];
        const result = await pool.query(query, values);
        return result.rows[0];  
    }
    static async deleteVote(id) {    
        // First, get the vote to know the post_id
        const getVoteQuery = 'SELECT * FROM votes WHERE id = $1';
        const getVoteResult = await pool.query(getVoteQuery, [id]);
        const vote = getVoteResult.rows[0];

        if (!vote) {
            return null;
        }
        console.log("Vote to delete:", vote);

        // Delete the vote
        const deleteQuery = 'DELETE FROM votes WHERE id = $1 RETURNING *';
        const deleteResult = await pool.query(deleteQuery, [id]);
       



        // Decrement the votes column in the posts table for the given post_id
        const updatePostQuery = 'UPDATE posts SET votes = votes - 1 WHERE id = $1';
        await pool.query(updatePostQuery, [vote.post_id]);

        return deleteResult.rows[0];  
    }
    static async deleteVoteByUserAndPost(user_id, post_id) {
        // First, get the vote to know the post_id
        const getVoteQuery = 'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2';
        const getVoteResult = await pool.query(getVoteQuery, [user_id, post_id]);
        const vote = getVoteResult.rows[0];

        if (!vote) {
            return null;
        }
        console.log("Vote to delete:", vote);

        // Delete the vote
        const deleteQuery = 'DELETE FROM votes WHERE user_id = $1 AND post_id = $2 RETURNING *';
        const deleteResult = await pool.query(deleteQuery, [user_id, post_id]);

        // Decrement the votes column in the posts table for the given post_id
        const updatePostQuery = 'UPDATE posts SET votes = votes - 1 WHERE id = $1';
        await pool.query(updatePostQuery, [post_id]);

        return deleteResult.rows[0];
    }

    static async getVotesByCreatedAt(created_at) {
        const query = 'SELECT * FROM votes WHERE created_at = $1';
        const values = [created_at];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));
    }

}

