import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Bookmark, Heart } from 'lucide-react';
import { Plant } from '../../types';
import { motion } from 'framer-motion';

interface PlantCardProps {
  plant: Plant;
  index: number;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card group h-full"
    >
      <div className="relative overflow-hidden">
        <img
          src={plant.images.main}
          alt={plant.commonName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Bookmark className="h-4 w-4 text-primary-600" />
          </button>
          <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-primary-600" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex flex-wrap gap-1">
            {plant.ayushSystem.map((system) => (
              <span 
                key={system} 
                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white"
              >
                {system}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-primary-800">{plant.commonName}</h3>
        <p className="text-sm text-gray-500 italic mb-3">{plant.botanicalName}</p>
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">{plant.description}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/plant/${plant.id}`}
            className="inline-flex items-center text-sm font-medium text-secondary-600 hover:text-secondary-800 transition-colors"
          >
            <span>View Details</span>
            <Info className="ml-1 h-4 w-4" />
          </Link>
          <span className="text-xs text-gray-500">{plant.habitat}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantCard;