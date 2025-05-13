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
        const query = 'INSERT INTO votes (user_id, event_id, post_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [vote.user_id, vote.event_id, vote.post_id, vote.created_at];
        const result = await pool.query(query, values);
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

    static async updateVote(id, voteData) {
        const { user_id, event_id, post_id } = voteData;
        const query = 'UPDATE votes SET user_id = $1, event_id = $2, post_id = $3 WHERE id = $4 RETURNING *';
        const values = [user_id, event_id, post_id, id];
        const result = await pool.query(query, values);
        return result.rows[0];  
    }

    static async deleteVote(id) {    
        const query = 'DELETE FROM votes WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  
    }

    static async getVotesByUserId(user_id) {
        const query = 'SELECT * FROM votes WHERE user_id = $1';
        const values = [user_id];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));   
    }

    static async getVotesByEventId(event_id) {
        const query = 'SELECT * FROM votes WHERE event_id = $1';
        const values = [event_id];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));
    }

    static async getVotesByPostId(post_id) {
        const query = 'SELECT * FROM votes WHERE post_id = $1';
        const values = [post_id];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));
    }

    static async getVotesByCreatedAt(created_at) {
        const query = 'SELECT * FROM votes WHERE created_at = $1';
        const values = [created_at];
        const result = await pool.query(query, values);
        return result.rows.map(row => new Vote(row));
    }

}

