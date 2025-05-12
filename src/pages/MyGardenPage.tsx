import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, AlertCircle, Plus, Sun, CloudRain, ThermometerSun } from 'lucide-react';
import { GardenPlant } from '../types';

const MyGardenPage: React.FC = () => {
  const [myPlants, setMyPlants] = useState<GardenPlant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'healthy' | 'needs_attention' | 'diseased'>('all');

  useEffect(() => {
    // In production, this would fetch from the API
    const fetchMyGarden = async () => {
      try {
        const mockPlants: GardenPlant[] = [
          {
            id: '1',
            plant: {
              id: '1',
              botanicalName: 'Ocimum sanctum',
              commonName: 'Tulsi',
              ayushSystem: ['Ayurveda'],
              description: 'Sacred plant with powerful adaptogenic properties.',
              habitat: 'Tropical regions',
              uses: ['Respiratory health', 'Stress relief'],
              cultivation: 'Easy to grow in containers',
              images: {
                main: 'https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg',
                gallery: []
              }
            },
            plantedDate: new Date('2024-01-15'),
            lastWatered: new Date(),
            notes: ['Growing well', 'New leaves appearing'],
            status: 'healthy',
            progress: 75
          },
          {
            id: '2',
            plant: {
              id: '2',
              botanicalName: 'Withania somnifera',
              commonName: 'Ashwagandha',
              ayushSystem: ['Ayurveda'],
              description: 'Adaptogenic herb for stress relief.',
              habitat: 'Dry regions',
              uses: ['Stress relief', 'Immune support'],
              cultivation: 'Requires well-drained soil',
              images: {
                main: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg',
                gallery: []
              }
            },
            plantedDate: new Date('2024-02-01'),
            lastWatered: new Date(),
            notes: ['Needs more sunlight'],
            status: 'needs_attention',
            progress: 45
          }
        ];
        setMyPlants(mockPlants);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching garden:', error);
        setIsLoading(false);
      }
    };

    fetchMyGarden();
  }, []);

  const filteredPlants = selectedFilter === 'all'
    ? myPlants
    : myPlants.filter(plant => plant.status === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-success-100 text-success-800';
      case 'needs_attention':
        return 'bg-warning-100 text-warning-800';
      case 'diseased':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <Leaf className="h-12 w-12 mx-auto mb-4 text-primary-200" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              My Virtual Garden
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Track and manage your medicinal plants in your personal virtual garden space.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex space-x-2 mb-4 md:mb-0">
            {['all', 'healthy', 'needs_attention', 'diseased'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          
          <button className="flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Add New Plant
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-16">
            <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No plants found</h3>
            <p className="text-gray-500">
              Start growing your virtual garden by adding some medicinal plants.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((gardenPlant, index) => (
              <motion.div
                key={gardenPlant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={gardenPlant.plant.images.main}
                    alt={gardenPlant.plant.commonName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(gardenPlant.status)}`}>
                      {gardenPlant.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">
                    {gardenPlant.plant.commonName}
                  </h3>
                  <p className="text-gray-500 italic text-sm mb-4">
                    {gardenPlant.plant.botanicalName}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Growth Progress</span>
                      <span className="font-medium">{gardenPlant.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 rounded-full h-2"
                        style={{ width: `${gardenPlant.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Sun className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-xs text-gray-600">Full Sun</span>
                    </div>
                    <div className="text-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <CloudRain className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-xs text-gray-600">Water Daily</span>
                    </div>
                    <div className="text-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <ThermometerSun className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-xs text-gray-600">20-25°C</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <Droplets className="h-4 w-4 mr-2" />
                      Water
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Add Note
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGardenPage;