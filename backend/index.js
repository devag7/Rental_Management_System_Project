require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rental_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: process.env.MAX_FILE_SIZE || 5000000 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));

// AI Pricing Algorithm
const calculateAIPrice = (size, rooms, location) => {
  const base = location === 'city' ? 8000 : 5000;
  return Math.round(base * rooms + size * 0.5);
};

// Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/properties', upload.array('images', 5), async (req, res) => {
  const { title, location, size, rooms, price, landlord_id, location_link } = req.body;
  const images = req.files?.map(file => file.filename) || [];
  
  try {
    const ai_price = calculateAIPrice(size, rooms, location);
    const result = await pool.query(
      `INSERT INTO properties 
      (title, location, size, rooms, price, landlord_id, ai_suggestion, location_link, images)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, location, size, rooms, price, landlord_id, ai_price, location_link, images]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.name AS landlord_name 
      FROM properties p
      JOIN users u ON p.landlord_id = u.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/messages', async (req, res) => {
  const { property_id, tenant_id, landlord_id, content } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO messages 
      (property_id, tenant_id, landlord_id, content)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [property_id, tenant_id, landlord_id, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});