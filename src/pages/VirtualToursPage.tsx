import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Users, Clock, Leaf } from 'lucide-react';
import axios from 'axios';
import { VirtualTour } from '../types';

const VirtualToursPage: React.FC = () => {
  const [tours, setTours] = useState<VirtualTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    // In production, this would fetch from the API
    const fetchTours = async () => {
      try {
        const mockTours: VirtualTour[] = [
          {
            id: '1',
            title: 'Digestive Health Garden',
            description: 'Explore herbs and plants known for their digestive healing properties in Ayurvedic medicine.',
            plants: ['tulsi', 'ginger', 'mint'],
            coverImage: 'https://images.pexels.com/photos/5938413/pexels-photo-5938413.jpeg',
            category: 'health',
            duration: 30,
            difficulty: 'Easy',
            participants: 150
          },
          {
            id: '2',
            title: 'Sacred Plants of Ayurveda',
            description: 'Journey through a collection of the most revered medicinal plants in Ayurvedic tradition.',
            plants: ['tulsi', 'ashwagandha', 'brahmi'],
            coverImage: 'https://images.pexels.com/photos/4099099/pexels-photo-4099099.jpeg',
            category: 'cultural',
            duration: 45,
            difficulty: 'Medium',
            participants: 230
          },
          {
            id: '3',
            title: 'Stress Relief Garden',
            description: 'Discover adaptogenic herbs and calming plants used in traditional medicine.',
            plants: ['ashwagandha', 'brahmi', 'shankhpushpi'],
            coverImage: 'https://images.pexels.com/photos/7474209/pexels-photo-7474209.jpeg',
            category: 'health',
            duration: 25,
            difficulty: 'Easy',
            participants: 180
          }
        ];
        setTours(mockTours);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  const handleStartTour = (tourId: string) => {
    navigate(`/tour/${tourId}`);
  };

  return (
    <div className="pt-20">
      <div className="bg-primary-700 text-white py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Map className="h-12 w-12 mx-auto mb-4 text-primary-200" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Virtual Garden Tours
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Take guided tours through our virtual gardens and discover the healing traditions of AYUSH medicine systems.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {['all', 'health', 'cultural', 'seasonal'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleStartTour(tour.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.coverImage}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tour.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{tour.duration} mins</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{tour.participants} visited</span>
                    </div>
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 mr-1" />
                      <span>{tour.difficulty}</span>
                    </div>
                  </div>

                  <button
                    className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Start Tour
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualToursPage;