import Property from '../models/Property.js';
import { calculatePriceRating } from '../utils/priceAI.js';
import { upload } from '../utils/upload.js';

// Add this export
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.getAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const files = req.files.map(file => `/uploads/${file.filename}`);
    const { rating, color } = calculatePriceRating(req.body);
    
    const property = await Property.create({
      ...req.body,
      images: files,
      ai_rating: rating,
      ai_color: color,
      user_id: req.user.id
    });
    
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserProperties = async (req, res) => {
    try {
      const properties = await Property.getByUserId(req.user.id);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };