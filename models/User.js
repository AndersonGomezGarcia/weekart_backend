// models/User.js
import pool from '../config/db.js';
import bcrypt from 'bcrypt';


export default class User {
  constructor({ id, username, email, password, description, image_url, created_at }) {
    this.id          = id;
    this.username    = username;
    this.email       = email;
    this.password    = password;
    this.description = description;
    this.image_url   = image_url;
    this.created_at  = created_at;
  }

  // Crea y devuelve el nuevo usuario
  static async createUser({ username, email, password, description, image_url }) {
    const text = `
      INSERT INTO users
        (username, email, password, description, profile_picture, created_at)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [username, email, await bcrypt.hash(password, 10), description, image_url, new Date()];
    // const values = [username, email, password, description, image_url, new Date().toISOString()];
    const { rows } = await pool.query(text, values);
    return new User(rows[0]);
  }

  
  // Devuelve un solo usuario o null
  static async getUserById(id) {
    const text = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await pool.query(text, [id]);
    return rows[0] ? new User(rows[0]) : null;
  }

  // Devuelve todos los usuarios
  static async getAllUsers() {
    const text = `SELECT * FROM users ORDER BY registration_date DESC`;
    const { rows } = await pool.query(text);
    return rows.map(r => new User(r));
  }

  // Actualiza un usuario y devuelve la versión actualizada
  static async updateUser(id, { username, email, password, description, image_url }) {
    const text = `
      UPDATE users
      SET username     = $1,
          email        = $2,
          password     = $3,
          description  = $4,
          image_url    = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [username, email, password, description, image_url, id];
    const { rows } = await pool.query(text, values);
    return new User(rows[0]);
  }

  // Borra un usuario
  static async deleteUser(id) {
    const text = `DELETE FROM users WHERE id = $1`;
    await pool.query(text, [id]);
    return { message: 'User deleted successfully' };
  }

  // Búsquedas por campo
  static async getUserByUsername(username) {
    const text = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await pool.query(text, [username]);
    return rows.map(r => new User(r));
  }

  static async getUserByEmail(email) {
    const text = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(text, [email]);
    return rows.map(r => new User(r));
  }

  static async getUserByPassword(password) {
    const text = `SELECT * FROM users WHERE password = $1`;
    const { rows } = await pool.query(text, [password]);
    return rows.map(r => new User(r));
  }
}

