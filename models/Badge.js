import pool from "../config/db.js";


export default class Badge {
  constructor({ id, name, description, image_url }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image_url = image_url;
  }

  static async createBadge(badgeData) {
    const badge = new Badge(badgeData);
  }

  static async getBadgeById(id) {}

  static async getAllBadges() {
    const query = "SELECT * FROM badges";
    const [rows] = await pool.query(query);
    return rows.map((row) => new Badge(row));
  }

    static async updateBadge(id, badgeData) {
        const { name, description, image_url } = badgeData;
        const query =
        "UPDATE badges SET name = $1, description = $2, image_url = $3 WHERE id = $4";
        await pool.query(query, [name, description, image_url, id]);
        return new Badge({ id, name, description, image_url });
    }

    static async deleteBadge(id) {    
        const query = "DELETE FROM badges WHERE id = $1";
        await pool.query(query, [id]);
        return { message: "Badge deleted successfully" };  
    }

    static async getBadgeByName(name) {
        const query = "SELECT * FROM badges WHERE name = $1";
        const [rows] = await pool.query(query, [name]);
        return rows.map((row) => new Badge(row));
    }

    static async getBadgeByDescription(description) {
        const query = "SELECT * FROM badges WHERE description = $1";
        const [rows]
        = await pool.query(query, [description]);
        return rows.map((row) => new Badge(row));
    }
}

