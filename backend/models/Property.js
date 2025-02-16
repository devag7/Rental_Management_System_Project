import pg from 'pg';
const { Pool } = pg;

export default class Property {
  static pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  static async create(property) {
    const result = await this.pool.query(
      `INSERT INTO properties 
      (title, price, area, property_type, square_ft, amenities, 
       tenant_preference, ai_rating, ai_color, images, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        property.title, property.price, property.area,
        property.property_type, property.square_ft,
        property.amenities, property.tenant_preference,
        property.ai_rating, property.ai_color,
        property.images, property.user_id
      ]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await this.pool.query(`
      SELECT p.*, u.name as owner 
      FROM properties p
      JOIN users u ON p.user_id = u.id
    `);
    return result.rows;
  }

  static async getByUserId(userId) {
    const result = await this.pool.query(
      `SELECT * FROM properties WHERE user_id = $1`,
      [userId]
    );
    return result.rows;
  }

  static async testConnection() {
    try {
      await this.pool.query('SELECT NOW()');
      console.log('✅ Database connected');
    } catch (err) {
      console.error('❌ Database connection failed:', err);
      process.exit(1);
    }
  }
}