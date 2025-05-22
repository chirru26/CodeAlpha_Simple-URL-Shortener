import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Url from './models/Url.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API to shorten URL
// app.post('/api/shorten', async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   const shortCode = nanoid(6);
//   const newUrl = new Url({ originalUrl: url, shortCode });

//   try {
//     await newUrl.save();
//     res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to save URL' });
//   }
// });

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    console.log("❌ Missing URL in request body");
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortCode = nanoid(6);
  const newUrl = new Url({ originalUrl: url, shortCode });

  try {
    await newUrl.save();
    console.log(`✅ Saved: ${url} as ${shortCode}`);
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
  } catch (err) {
    console.error('❌ Error saving URL:', err);
    res.status(500).json({ error: 'Failed to save URL' });
  }
});
// API to get original URL


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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
