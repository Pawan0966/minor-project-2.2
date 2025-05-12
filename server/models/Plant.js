const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  botanicalName: { type: String, required: true },
  commonName: { type: String, required: true },
  ayushSystem: [{ type: String, enum: ['Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy'] }],
  description: { type: String, required: true },
  habitat: { type: String, required: true },
  uses: [String],
  cultivation: { type: String, required: true },
  images: {
    main: String,
    gallery: [String]
  },
  model3d: String,
  audio: String,
  videos: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plant', plantSchema);