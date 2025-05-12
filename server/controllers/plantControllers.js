const Plant = require("../models/Plant");

// GET all plants
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// GET a single plant by ID
exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plant", error: err });
  }
};

// POST a new plant (for development/admin use)
exports.createPlant = async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err });
  }
};
