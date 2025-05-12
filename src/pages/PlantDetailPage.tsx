import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share, Info, Check, Beaker, Flower, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Plant } from '../types';
import PlantModel from '../components/3d/PlantModel';
import { motion } from 'framer-motion';

const PlantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'cultivation' | 'uses' | 'gallery'>('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch plant details
    setTimeout(() => {
      // This would be replaced with actual API call
      const mockPlant: Plant = {
        id: '1',
        botanicalName: 'Ocimum sanctum',
        commonName: 'Tulsi (Holy Basil)',
        ayushSystem: ['Ayurveda'],
        description: `Tulsi (Holy Basil) is one of the most sacred herbs in India, revered as an incarnation of Lakshmi, the goddess of wealth and prosperity. In Ayurveda, it is known as "The Incomparable One" and "Mother Medicine of Nature" due to its remarkable healing properties. 

Tulsi has been used for thousands of years to treat various ailments including respiratory disorders, fever, stress, and to boost immunity. It's adaptogenic properties help the body adapt to both psychological and physiological stress. 

The plant contains essential oils like eugenol, which gives it its characteristic aroma and contributes to many of its medicinal properties. Modern research has confirmed many of its traditional uses, showing anti-bacterial, anti-fungal, anti-viral, and immune-modulating properties.`,
        habitat: 'Tropical regions of Southeast Asia, particularly abundant throughout India',
        uses: [
          'Respiratory disorders including bronchitis, asthma, and colds',
          'Fever reduction',
          'Stress and anxiety relief',
          'Immune system support',
          'Digestive issues',
          'Heart health and blood pressure regulation',
          'Dental and oral health',
          'Anti-inflammatory properties'
        ],
        cultivation: `Tulsi is relatively easy to grow and thrives in warm, tropical climates. It requires well-drained soil, moderate watering, and full sunlight for optimal growth.

Seeds should be sown in spring and lightly covered with soil. They typically germinate within 1-2 weeks. Young plants should be spaced about 1-2 feet apart to allow proper growth.

The plant grows as a bushy annual in temperate climates but can be perennial in tropical regions, reaching heights of 1-2 feet. Regular pruning encourages bushier growth and more leaf production.

Tulsi is sensitive to frost and cold temperatures. In colder regions, it can be grown indoors in containers or brought inside during winter months.

Regular harvesting of leaves actually promotes growth. Leaves can be harvested once the plant is at least 8-10 inches tall by pinching off the top few leaves from each stem.`,
        images: {
          main: 'https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          gallery: [
            'https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/9217889/pexels-photo-9217889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          ]
        },
        model3d: '/models/tulsi.glb',
        audio: '/audio/tulsi-description.mp3'
      };
      
      setPlant(mockPlant);
      setIsLoading(false);
    }, 1500);
  }, [id]);
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save the bookmark to user's profile
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plant?.commonName,
        text: `Learn about ${plant?.commonName} (${plant?.botanicalName}) on Virtual Herbal Garden`,
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (isLoading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!plant) {
    return (
      <div className="pt-20 container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Plant not found</h2>
        <p className="mb-6">The plant you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="btn btn-primary">
          Explore Other Plants
        </Link>
      </div>
    );
  }
  
  return (
    <div className="pt-20">
      <div 
        className="bg-primary-700 text-white py-10 px-4"
      >
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/explore" className="flex items-center text-primary-100 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Explore</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {plant.ayushSystem.map(system => (
                    <span key={system} className="px-3 py-1 bg-primary-600 rounded-full text-xs font-medium">
                      {system}
                    </span>
                  ))}
                </div>
                
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                  {plant.commonName}
                </h1>
                <p className="text-lg text-primary-100 italic mb-4">
                  {plant.botanicalName}
                </p>
                <div className="flex items-center text-primary-100">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{plant.habitat}</span>
                </div>
              </motion.div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleBookmark}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isBookmarked 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-white' : ''} mr-2`} />
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <Share className="h-5 w-5 mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PlantModel modelUrl={plant.model3d || ''} name={plant.commonName} />
              
              {plant.audio && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-2">Audio Description</h3>
                  <audio controls className="w-full">
                    <source src={plant.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">Quick Facts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                      <Flower className="h-3.5 w-3.5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Botanical Family</p>
                      <p className="text-gray-600">Lamiaceae (Mint family)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Native Region</p>
                      <p className="text-gray-600">Indian Subcontinent</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                      <Beaker className="h-3.5 w-3.5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Active Compounds</p>
                      <p className="text-gray-600">Eugenol, Ursolic acid, Rosmarinic acid</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                      <HelpCircle className="h-3.5 w-3.5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Common Names</p>
                      <p className="text-gray-600">Holy Basil, Tulasi, Sacred Basil</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    <button
                      onClick={() => setSelectedTab('overview')}
                      className={`px-4 py-3 text-sm font-medium ${
                        selectedTab === 'overview'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Info className="h-4 w-4 inline mr-1" />
                      <span>Overview</span>
                    </button>
                    <button
                      onClick={() => setSelectedTab('uses')}
                      className={`px-4 py-3 text-sm font-medium ${
                        selectedTab === 'uses'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Check className="h-4 w-4 inline mr-1" />
                      <span>Medicinal Uses</span>
                    </button>
                    <button
                      onClick={() => setSelectedTab('cultivation')}
                      className={`px-4 py-3 text-sm font-medium ${
                        selectedTab === 'cultivation'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Flower className="h-4 w-4 inline mr-1" />
                      <span>Cultivation</span>
                    </button>
                    <button
                      onClick={() => setSelectedTab('gallery')}
                      className={`px-4 py-3 text-sm font-medium ${
                        selectedTab === 'gallery'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span>Gallery</span>
                    </button>
                  </nav>
                </div>
                
                <div className="p-6">
                  {selectedTab === 'overview' && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                        About {plant.commonName}
                      </h2>
                      <div className="prose max-w-none text-gray-700">
                        {plant.description.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedTab === 'uses' && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                        Medicinal Uses
                      </h2>
                      <ul className="space-y-3">
                        {plant.uses.map((use, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 mt-0.5">
                              <Check className="h-3.5 w-3.5 text-success-600" />
                            </div>
                            <p className="text-gray-700">{use}</p>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 bg-primary-50 p-4 rounded-lg">
                        <h3 className="font-medium text-primary-800 mb-2">Traditional Preparations</h3>
                        <p className="text-gray-700 mb-3">
                          In Ayurveda, Tulsi is commonly prepared in several ways:
                        </p>
                        <ul className="space-y-2">
                          <li className="text-gray-700">
                            <strong>Tulsi Tea:</strong> Fresh or dried leaves infused in hot water
                          </li>
                          <li className="text-gray-700">
                            <strong>Tulsi Powder:</strong> Dried leaves ground into a fine powder, taken with water or honey
                          </li>
                          <li className="text-gray-700">
                            <strong>Tulsi Tincture:</strong> Leaves extracted in alcohol to make a concentrated liquid
                          </li>
                          <li className="text-gray-700">
                            <strong>Tulsi Oil:</strong> Essential oil extracted from leaves for topical use or aromatherapy
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {selectedTab === 'cultivation' && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                        How to Grow {plant.commonName}
                      </h2>
                      <div className="prose max-w-none text-gray-700">
                        {plant.cultivation.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                      
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">Sunlight</h3>
                          <p className="text-gray-700">Full sun, at least 6 hours daily.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">Water</h3>
                          <p className="text-gray-700">Moderate, allow soil to dry between watering.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">Soil</h3>
                          <p className="text-gray-700">Well-drained, fertile soil with neutral pH.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedTab === 'gallery' && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
                        Photo Gallery
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {plant.images.gallery.map((image, index) => (
                          <div key={index} className="overflow-hidden rounded-lg">
                            <img
                              src={image}
                              alt={`${plant.commonName} - Gallery image ${index + 1}`}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                    Related Plants
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Ashwagandha",
                        image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        id: "2"
                      },
                      {
                        name: "Turmeric",
                        image: "https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        id: "3"
                      },
                      {
                        name: "Neem",
                        image: "https://images.pexels.com/photos/9217889/pexels-photo-9217889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        id: "4"
                      }
                    ].map((relatedPlant, index) => (
                      <Link key={index} to={`/plant/${relatedPlant.id}`} className="group">
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={relatedPlant.image}
                            alt={relatedPlant.name}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="mt-2 font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                          {relatedPlant.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;