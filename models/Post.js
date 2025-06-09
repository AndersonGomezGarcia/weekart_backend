import pool from "../config/db.js";
import User from "./User.js";
import Event from "./Event.js";
import dotenv from "dotenv";


dotenv.config();

export default class Post {
    constructor({ id, title, description, user_id, username, created_at, event_id, image_url, event, votes  }) {  
        this.id = id;
        this.title = title;
        this.description = description;
        this.username = username; // Placeholder for username, will be set later
        this.user_id = user_id;
        this.created_at = created_at;
        this.event = event;
        this.event_id = event_id;
        this.image_url = image_url;
        this.votes = votes
    }

   static async createPost({ user_id, event_id, title, description, image_url, createdAt }) {
    const text = `
        INSERT INTO posts (user_id, event_id, title, description, image_url, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const values = [user_id, event_id, title, description, image_url, createdAt];
    const { rows } = await pool.query(text, values);
    return new Post(rows[0]);
}

    static async getPostById(id) {
        const query = "SELECT * FROM posts WHERE id = $1";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0] ? new Post(rows[0]) : null;
    }

    
    


    static async getAllPosts() {
        const query = "SELECT * FROM posts";
        const { rows } = await pool.query(query);
        console.log("Rows:", rows);
        // Remove duplicate rows if any
        // Map user_id to username using User.getUsernameById
        const postsWithUsernames = await Promise.all(rows.map(async (row) => {
            try {
            const username = await User.getUserNameById(row.user_id);
            const event = await Event.getEventNameById(row.event_id);
            const site_url = process.env.SITE_URL || "http://localhost:3000";
            const image_url = site_url + row.image_url || site_url + "/media/ejemplo.jpg"; // Default image URL if not provided
            return new Post({ ...row, username: username, event: event, image_url: image_url });
            }catch (error) {
                return new Post({ ...row, username: "Unknown", event: "Unknown", image_url:  site_url + "/media/ejemplo.jpg" });
            }
        }));

        return postsWithUsernames;
    }

    static async updatePost(id, postData) {
        const { title, description, user_id, event_id } = postData;

        const query = "UPDATE posts SET title = $1, description = $2, user_id = $3, event_id = $4 WHERE id = $5";
        const values = [title, description, user_id, event_id, id];
        await pool.query(query, values);
        return new Post({ id, title, description, user_id, event_id, created_at: new Date() });         
    }


    static async deletePost(id) {    
        const query = "DELETE FROM posts WHERE id = $1";
        await pool.query(query, [id]);
        return { message: "Post deleted successfully" };  
    }   


    static async getPostsByUserId(user_id) {
        const query = "SELECT * FROM posts WHERE user_id = $1";
        const {rows} = await pool.query(query, [user_id]);
        console.log("Rows:", rows);
        console.log("User ID:", user_id);
        return rows.map((row) => new Post(row));
    }


    static async getPostsByTitle(title) {
        const query = "SELECT * FROM posts WHERE title = $1";
        const {rows} = await pool.query(query, [title]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByDescription(description) {
        const query = "SELECT * FROM posts WHERE description = $1";
        const {rows} = await pool.query(query, [description]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByDate(date) {
        const query = "SELECT * FROM posts WHERE created_at = $1";
        const [rows] = await pool.query(query, [date]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByDateRange(startDate, endDate) {
        const query = "SELECT * FROM posts WHERE created_at BETWEEN $1 AND $2";
        const [rows] = await pool.query(query, [startDate, endDate]);
        return rows.map((row) => new Post(row));
    }


    static async getPostsByKeyword(keyword) {
        const query = "SELECT * FROM posts WHERE description LIKE $1";
        const [rows] = await pool.query(query, [`%${keyword}%`]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByuserName(userName) {
        const query = `
            SELECT p.* FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE u.name LIKE $1
        `;
        const [rows] = await pool.query(query, [`%${userName}%`]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByTag(tag) {
        const query = `
            SELECT p.* FROM posts p
            JOIN post_tags pt ON p.id = pt.post_id
            JOIN tags t ON pt.tag_id = t.id
            WHERE t.name LIKE $1
        `;
        const [rows] = await pool.query(query, [`%${tag}%`]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByCategory(category) {
        const query = `
            SELECT p.* FROM posts p
            JOIN post_categories pc ON p.id = pc.post_id
            JOIN categories c ON pc.category_id = c.id
            WHERE c.name LIKE $1
        `;
        const [rows] = await pool.query(query, [`%${category}%`]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByStatus(status) {
        const query = "SELECT * FROM posts WHERE status = $1";
        const [rows] = await pool.query(query, [status]);
        return rows.map((row) => new Post(row));

    }
}

