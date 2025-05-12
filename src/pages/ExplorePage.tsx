import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import PlantCard from '../components/plant/PlantCard';
import SearchFilters, { SearchFilters as Filters } from '../components/search/SearchFilters';
import { Plant } from '../types';
import { motion } from 'framer-motion';
import axios from 'axios';

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    systems: [],
    uses: [],
    habitat: [],
  });
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants');
        setPlants(response.data);
        setFilteredPlants(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);
  
  useEffect(() => {
    // Apply search and filters
    let results = plants;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        plant =>
          plant.commonName.toLowerCase().includes(term) ||
          plant.botanicalName.toLowerCase().includes(term) ||
          plant.description.toLowerCase().includes(term)
      );
    }
    
    // Apply system filters
    if (filters.systems.length > 0) {
      results = results.filter(plant =>
        plant.ayushSystem.some(system => filters.systems.includes(system))
      );
    }
    
    // Apply uses filters
    if (filters.uses.length > 0) {
      results = results.filter(plant =>
        plant.uses.some(use => 
          filters.uses.some(filterUse => 
            use.toLowerCase().includes(filterUse.toLowerCase())
          )
        )
      );
    }
    
    // Apply habitat filters
    if (filters.habitat.length > 0) {
      results = results.filter(plant =>
        filters.habitat.some(habitat =>
          plant.habitat.toLowerCase().includes(habitat.toLowerCase())
        )
      );
    }
    
    setFilteredPlants(results);
  }, [searchTerm, filters, plants]);
  
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="pt-20">
      <div className="bg-primary-700 text-white py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Explore Medicinal Plants
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Discover the diverse world of AYUSH medicinal plants, their properties, uses, and cultivation methods.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, property, or use..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <SearchFilters onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No plants found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant, index) => (
              <PlantCard key={plant.id} plant={plant} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;