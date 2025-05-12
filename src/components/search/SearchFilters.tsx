import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { AyushSystem } from '../../types';

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  systems: AyushSystem[];
  uses: string[];
  habitat: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    systems: [],
    uses: [],
    habitat: [],
  });
  
  const ayushSystems: AyushSystem[] = ['Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy'];
  
  const medicinialUses = [
    'Digestive Health', 
    'Immune Support', 
    'Respiratory System', 
    'Skin Care',
    'Nervous System',
    'Anti-inflammatory',
    'Diabetes Management',
    'Heart Health',
    'Anti-microbial',
    'Pain Relief'
  ];
  
  const habitats = [
    'Tropical', 
    'Sub-tropical', 
    'Temperate', 
    'Alpine', 
    'Aquatic',
    'Desert'
  ];
  
  const handleSystemToggle = (system: AyushSystem) => {
    const newSystems = filters.systems.includes(system)
      ? filters.systems.filter(s => s !== system)
      : [...filters.systems, system];
    
    const newFilters = { ...filters, systems: newSystems };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleUseToggle = (use: string) => {
    const newUses = filters.uses.includes(use)
      ? filters.uses.filter(u => u !== use)
      : [...filters.uses, use];
    
    const newFilters = { ...filters, uses: newUses };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleHabitatToggle = (habitat: string) => {
    const newHabitats = filters.habitat.includes(habitat)
      ? filters.habitat.filter(h => h !== habitat)
      : [...filters.habitat, habitat];
    
    const newFilters = { ...filters, habitat: newHabitats };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const emptyFilters = { systems: [], uses: [], habitat: [] };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filter Plants</span>
        </button>
        
        {(filters.systems.length > 0 || filters.uses.length > 0 || filters.habitat.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in-down">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Filter Options</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">AYUSH Systems</h4>
              <div className="space-y-2">
                {ayushSystems.map(system => (
                  <label key={system} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.systems.includes(system)}
                      onChange={() => handleSystemToggle(system)}
                      className="rounded text-secondary-600 focus:ring-secondary-500"
                    />
                    <span className="text-gray-700">{system}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Medicinal Uses</h4>
              <div className="space-y-2">
                {medicinialUses.map(use => (
                  <label key={use} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.uses.includes(use)}
                      onChange={() => handleUseToggle(use)}
                      className="rounded text-secondary-600 focus:ring-secondary-500"
                    />
                    <span className="text-gray-700">{use}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Habitat</h4>
              <div className="space-y-2">
                {habitats.map(habitat => (
                  <label key={habitat} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.habitat.includes(habitat)}
                      onChange={() => handleHabitatToggle(habitat)}
                      className="rounded text-secondary-600 focus:ring-secondary-500"
                    />
                    <span className="text-gray-700">{habitat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Active filters */}
      {(filters.systems.length > 0 || filters.uses.length > 0 || filters.habitat.length > 0) && (
        <div className="flex flex-wrap gap-2 pt-2">
          {filters.systems.map(system => (
            <span 
              key={system}
              className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
            >
              {system}
              <button 
                onClick={() => handleSystemToggle(system)}
                className="ml-1.5 text-primary-500 hover:text-primary-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          
          {filters.uses.map(use => (
            <span 
              key={use}
              className="inline-flex items-center bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm"
            >
              {use}
              <button 
                onClick={() => handleUseToggle(use)}
                className="ml-1.5 text-secondary-500 hover:text-secondary-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          
          {filters.habitat.map(habitat => (
            <span 
              key={habitat}
              className="inline-flex items-center bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm"
            >
              {habitat}
              <button 
                onClick={() => handleHabitatToggle(habitat)}
                className="ml-1.5 text-accent-500 hover:text-accent-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

export { SearchFilters }