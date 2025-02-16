import express from 'express';
import cors from 'cors';
import router from './routes.js';
import 'dotenv/config';
import Property from './models/Property.js';

const app = express();
await Property.testConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', router);

// Test Route
app.get('/health', (req, res) => {
  res.send('Server is running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Internal Server Error');
});

// Start Server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});