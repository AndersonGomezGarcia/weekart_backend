import pool from "../config/db.js";

export default class Event {
  constructor({ id, title, description, event_date, image_url }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.event_date = event_date;
    this.image_url = image_url;
  }

  static async createEvent(eventData) {
    const text = `INSERT INTO _events (title, description, event_date, image_url) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [eventData.title, eventData.description, eventData.event_date, eventData.image_url];
    const [result] = await pool.query(text, values);
    return new Event(result);
  }

  static async getEventById(id) {
    const query = "SELECT * FROM events WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    return rows[0] ? new Event(rows[0]) : null;
  }

  static async getEventNameById(id) {
    const query = "SELECT title FROM events WHERE id = $1";
    const {rows} = await pool.query(query, [id]);
    return rows[0] ? rows[0].title : null;
  }

  static async getAllEvents() {
    const query = "SELECT * FROM events";
    const {rows} = await pool.query(query);
    return rows.map((row) => new Event(row));
  }

  static async updateEvent(id, eventData) {
    const { title, description, event_date, image_url } = eventData;
    const query =
      "UPDATE events SET title = $1, description = $2, event_date = $3, image_url = $4 WHERE id = $5";
    await pool.query(query, [
      title,
      description,
      event_date,
      image_url,
      id,
    ]);
    return new Event({ id, title, description, event_date, image_url });
  }

  static async deleteEvent(id) {
    const query = "DELETE FROM events WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Event deleted successfully" };  
    }

  static async getEventByDate(date) {
    const query = "SELECT * FROM events WHERE event_date = $1";
    const [rows] = await pool.query(query, [date]);
    return rows.map((row) => new Event(row));
  }
  static async getEventByTitle(title) {
    const query = "SELECT * FROM events WHERE title = $1";
    const [rows] = await pool.query(query, [title]);
    return rows.map((row) => new Event(row));
  }
}


// const Event = sequelize.define("Event", {