import pg from 'pg';
const { Pool } = pg;

export default class User {
  static pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  static async create(userData) {
    const result = await this.pool.query(
      `INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role`,
      [userData.name, userData.email, userData.password, userData.role]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async getById(id) {
    const result = await this.pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}