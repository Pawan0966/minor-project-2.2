const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
  coverImage: String,
  duration: Number,
  difficulty: String,
  virtualTourPath: [{
    position: { x: Number, y: Number, z: Number },
    rotation: { x: Number, y: Number, z: Number },
    description: String,
    plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', tourSchema);