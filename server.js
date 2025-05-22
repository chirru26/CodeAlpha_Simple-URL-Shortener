require('dotenv').config(); // Must be at the top

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Url = require('./models/Url');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API to shorten URL
app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortCode = nanoid(6);
  const newUrl = new Url({ originalUrl: url, shortCode });

  try {
    await newUrl.save();
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save URL' });
  }
});

// Redirect short URL
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const found = await Url.findOne({ shortCode });
    if (found) {
      res.redirect(found.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
