// const mongoose = require('mongoose');

// const urlSchema = new mongoose.Schema({
//   shortCode: { type: String, required: true, unique: true },
//   originalUrl: { type: String, required: true }
// });

// module.exports = mongoose.model('Url', urlSchema);


const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: String,
});

module.exports = mongoose.model('Url', urlSchema);
