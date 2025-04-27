const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());  // Allow all origins in development

// Serve static files from the Client directory
app.use(express.static(path.join(__dirname, '../Client')));

// MongoDB Connection Options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4  // Force IPv4
};

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Initialize MongoDB connection
connectDB();

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

// Serve HTML files for different routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/contact.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/dashboard.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/cart.html'));
});

// Catch-all route for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
 