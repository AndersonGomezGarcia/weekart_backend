import pool from "../config/db.js";

export default class Post {
    constructor({ id, title, content, author_id, created_at }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author_id = author_id;
        this.created_at = created_at;
    }
    
    static async createPost(id, title, content, author_id, created_at) {
        const text = `
            INSERT INTO posts (id, title, content, author_id, created_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [id, title, content, author_id, created_at];
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
        return rows.map((row) => new Post(row));
    }

    static async updatePost(id, postData) {
        const { title, content, author_id } = postData;

            
        const query = "UPDATE posts SET title = $1, content = $2, author_id = $3 WHERE id = $4";    
        const values = [title, content, author_id, id];
        await pool.query(query, values);
        return new Post({ id, title, content, author_id });
    }


    static async deletePost(id) {    
        const query = "DELETE FROM posts WHERE id = $1";
        await pool.query(query, [id]);
        return { message: "Post deleted successfully" };  
    }   


    static async getPostsByAuthorId(author_id) {
        const query = "SELECT * FROM posts WHERE author_id = $1";
        const [rows] = await pool.query(query, [author_id]);
        return rows.map((row) => new Post(row));
    }


    static async getPostsByTitle(title) {
        const query = "SELECT * FROM posts WHERE title = $1";
        const [rows] = await pool.query(query, [title]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByContent(content) {
        const query = "SELECT * FROM posts WHERE content = $1";
        const [rows] = await pool.query(query, [content]);
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
        const query = "SELECT * FROM posts WHERE content LIKE $1";
        const [rows] = await pool.query(query, [`%${keyword}%`]);
        return rows.map((row) => new Post(row));
    }

    static async getPostsByAuthorName(authorName) {
        const query = `
            SELECT p.* FROM posts p
            JOIN users u ON p.author_id = u.id
            WHERE u.name LIKE $1
        `;
        const [rows] = await pool.query(query, [`%${authorName}%`]);
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

