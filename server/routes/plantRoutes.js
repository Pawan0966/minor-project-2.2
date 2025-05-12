const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id); // Corrected the code to use req.params.id
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add initial plants data
const initializePlants = async () => {
  try {
    const count = await Plant.countDocuments();
    if (count === 0) {
      const plants = [
        {
          botanicalName: 'Ocimum sanctum',
          commonName: 'Tulsi (Holy Basil)',
          ayushSystem: ['Ayurveda'],
          description: 'Sacred plant with powerful adaptogenic and immune-boosting properties.',
          habitat: 'Tropical regions of Southeast Asia',
          uses: ['Respiratory disorders', 'Fever', 'Stress relief', 'Immune support'],
          cultivation: 'Requires well-drained soil and full sunlight',
          images: {
            main: 'https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg',
            gallery: ['https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg']
          }
        },
        {
          botanicalName: 'Withania somnifera',
          commonName: 'Ashwagandha',
          ayushSystem: ['Ayurveda'],
          description: 'Adaptogenic herb known for reducing stress and boosting immunity.',
          habitat: 'Dry regions of India',
          uses: ['Stress relief', 'Immune support', 'Energy boost', 'Sleep improvement'],
          cultivation: 'Prefers dry, well-drained soil',
          images: {
            main: 'https://images.pexels.com/photos/4099099/pexels-photo-4099099.jpeg',
            gallery: ['https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg']
          }
        },
        {
          botanicalName: 'Curcuma longa',
          commonName: 'Turmeric',
          ayushSystem: ['Ayurveda', 'Unani', 'Siddha'],
          description: 'Golden spice with powerful anti-inflammatory properties.',
          habitat: 'Tropical South Asia',
          uses: ['Anti-inflammatory', 'Joint health', 'Digestive health', 'Immune support'],
          cultivation: 'Requires warm climate and well-drained soil',
          images: {
            main: 'https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg',
            gallery: ['https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg']
          }
        },
        {
          botanicalName: 'Azadirachta indica',
          commonName: 'Neem',
          ayushSystem: ['Ayurveda', 'Unani'],
          description: 'Versatile medicinal tree with antibacterial properties.',
          habitat: 'South Asia',
          uses: ['Skin care', 'Dental health', 'Blood purification', 'Pest control'],
          cultivation: 'Hardy tree that grows in various conditions',
          images: {
            main: 'https://images.pexels.com/photos/9217889/pexels-photo-9217889.jpeg',
            gallery: ['https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg']
          }
        },
        {
          botanicalName: 'Bacopa monnieri',
          commonName: 'Brahmi',
          ayushSystem: ['Ayurveda'],
          description: 'Memory-enhancing herb used in traditional medicine.',
          habitat: 'Wetlands of India',
          uses: ['Cognitive enhancement', 'Memory improvement', 'Anxiety reduction', 'Brain health'],
          cultivation: 'Grows well in moist, boggy conditions',
          images: {
            main: 'https://images.pexels.com/photos/7194828/pexels-photo-7194828.jpeg',
            gallery: ['https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg']
          }
        },
        {
          botanicalName: 'Centella asiatica',
          commonName: 'Gotu Kola',
          ayushSystem: ['Ayurveda', 'Siddha'],
          description: 'Brain tonic herb known for longevity benefits.',
          habitat: 'Tropical wetlands',
          uses: ['Brain health', 'Wound healing', 'Circulation', 'Anxiety relief'],
          cultivation: 'Prefers partial shade and moist soil',
          images: {
            main: 'https://images.pexels.com/photos/7194564/pexels-photo-7194564.jpeg',
            gallery: ['https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg']
          }
        },
        {
          botanicalName: 'Phyllanthus emblica',
          commonName: 'Amla (Indian Gooseberry)',
          ayushSystem: ['Ayurveda', 'Unani', 'Siddha'],
          description: 'Vitamin C-rich fruit with numerous health benefits.',
          habitat: 'Tropical India',
          uses: ['Immune support', 'Hair health', 'Digestion', 'Anti-aging'],
          cultivation: 'Requires full sun and regular watering',
          images: {
            main: 'https://images.pexels.com/photos/7194564/pexels-photo-7194564.jpeg',
            gallery: ['https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg']
          }
        },
        {
          botanicalName: 'Terminalia chebula',
          commonName: 'Haritaki',
          ayushSystem: ['Ayurveda'],
          description: 'One of the three fruits in Triphala, known for digestive benefits.',
          habitat: 'South Asia forests',
          uses: ['Digestive health', 'Detoxification', 'Skin health', 'Eye care'],
          cultivation: 'Grows in various soil conditions',
          images: {
            main: 'https://images.pexels.com/photos/5938413/pexels-photo-5938413.jpeg',
            gallery: ['https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg']
          }
        },
        {
          botanicalName: 'Glycyrrhiza glabra',
          commonName: 'Mulethi (Licorice)',
          ayushSystem: ['Ayurveda', 'Unani'],
          description: 'Sweet root with anti-inflammatory properties.',
          habitat: 'Mediterranean region',
          uses: ['Respiratory health', 'Digestive aid', 'Throat soothing', 'Stress relief'],
          cultivation: 'Needs deep, fertile soil',
          images: {
            main: 'https://images.pexels.com/photos/4099099/pexels-photo-4099099.jpeg',
            gallery: ['https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg']
          }
        },
        {
          botanicalName: 'Tinospora cordifolia',
          commonName: 'Guduchi',
          ayushSystem: ['Ayurveda'],
          description: 'Immune-boosting climber with adaptogenic properties.',
          habitat: 'Tropical regions',
          uses: ['Immune enhancement', 'Fever reduction', 'Diabetes management', 'Stress relief'],
          cultivation: 'Climbing plant needing support',
          images: {
            main: 'https://images.pexels.com/photos/7474209/pexels-photo-7474209.jpeg',
            gallery: ['https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg']
          }
        },
        {
          botanicalName: 'Piper longum',
          commonName: 'Long Pepper',
          ayushSystem: ['Ayurveda', 'Siddha'],
          description: 'Spicy fruit used for respiratory conditions.',
          habitat: 'Indo-Malayan region',
          uses: ['Respiratory health', 'Digestion', 'Metabolism boost', 'Pain relief'],
          cultivation: 'Requires warm climate and support for climbing',
          images: {
            main: 'https://images.pexels.com/photos/4099099/pexels-photo-4099099.jpeg',
            gallery: ['https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg']
          }
        },
        {
          botanicalName: 'Asparagus racemosus',
          commonName: 'Shatavari',
          ayushSystem: ['Ayurveda'],
          description: 'Female reproductive tonic with adaptogenic properties.',
          habitat: 'Tropical regions',
          uses: ['Women\'s health', 'Digestive aid', 'Immune support', 'Stress relief'],
          cultivation: 'Needs well-drained soil and partial shade',
          images: {
            main: 'https://images.pexels.com/photos/5938413/pexels-photo-5938413.jpeg',
            gallery: ['https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg']
          }
        },
        {
          botanicalName: 'Commiphora mukul',
          commonName: 'Guggulu',
          ayushSystem: ['Ayurveda'],
          description: 'Resin used for joint and cholesterol health.',
          habitat: 'Dry regions of India',
          uses: ['Cholesterol control', 'Joint health', 'Weight management', 'Anti-inflammatory'],
          cultivation: 'Grows in dry, sandy soil',
          images: {
            main: 'https://images.pexels.com/photos/7474209/pexels-photo-7474209.jpeg',
            gallery: ['https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg']
          }
        }
      ];
      await Plant.insertMany(plants);
      console.log('Plants data inserted');
    }
  } catch (error) {
    console.error('Error inserting initial plants data:', error.message);
  }
};

// Initialize plants data
initializePlants();

module.exports = router;
