import pool from "../config/db.js";

export default class Comment {
  constructor({ id, author_id, post_id, content, created_at, reply_to }) {
    this.id = id;
    this.author_id = author_id;
    this.post_id = post_id;
    this.content = content;
    this.created_at = created_at;
    this.reply_to = reply_to;
  }

static async createComment({ author_id, post_id, content, reply_to = null, created_at }) {
    const query = `
        INSERT INTO comments (author_id, post_id, content, reply_to, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const values = [author_id, post_id, content, reply_to, created_at];
    console.log("Creating comment with values:", values);
    const { rows } = await pool.query(query, values);
    return new Comment(rows[0]);
}

  static async getCommentsByPost(post_id) {
    const query = `SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC`;
    const { rows } = await pool.query(query, [post_id]);
    return rows.map(row => new Comment(row));
  }

  static async getCommentById(id) {
    const query = `SELECT * FROM comments WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0] ? new Comment(rows[0]) : null;
  }

  static async deleteComment(id) {
    const query = `DELETE FROM comments WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0] ? new Comment(rows[0]) : null;
  }
}