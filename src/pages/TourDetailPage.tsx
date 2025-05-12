import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, Leaf, ChevronRight, Play, Pause } from 'lucide-react';
import { VirtualTour } from '../types';
import PlantModel from '../components/3d/PlantModel';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<VirtualTour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // In production, this would fetch from the API
    const fetchTour = async () => {
      try {
        // Simulated API response
        const mockTour: VirtualTour = {
          id: '1',
          title: 'Digestive Health Garden',
          description: 'Explore herbs and plants known for their digestive healing properties in Ayurvedic medicine. This guided tour will introduce you to the most effective medicinal plants used traditionally for digestive health.',
          plants: ['tulsi', 'ginger', 'mint'],
          coverImage: 'https://images.pexels.com/photos/5938413/pexels-photo-5938413.jpeg',
          category: 'health',
          duration: 30,
          difficulty: 'Easy',
          participants: 150
        };
        setTour(mockTour);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tour:', error);
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < tourSteps.length - 1 ? prev + 1 : prev));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const tourSteps = [
    {
      title: 'Welcome to the Garden',
      description: 'Begin your journey through our medicinal herb garden focused on digestive health.',
      modelUrl: '' // Empty string will trigger the fallback UI
    },
    {
      title: 'Tulsi (Holy Basil)',
      description: 'Our first stop is at the sacred Tulsi plant, known for its ability to support digestive function and reduce bloating.',
      modelUrl: '' // Empty string will trigger the fallback UI
    },
    {
      title: 'Ginger Root',
      description: 'Next, we explore the powerful ginger plant, a cornerstone of digestive health in Ayurvedic medicine.',
      modelUrl: '' // Empty string will trigger the fallback UI
    },
    {
      title: 'Mint Garden',
      description: 'Finally, we visit our mint garden, showcasing various mint varieties used for digestive comfort.',
      modelUrl: '' // Empty string will trigger the fallback UI
    }
  ];

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="pt-20 container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Tour not found</h2>
        <p className="mb-6">The virtual tour you're looking for doesn't exist or has been removed.</p>
        <Link to="/tours" className="btn btn-primary">
          Browse Other Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-primary-700 text-white py-10 px-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/tours" className="flex items-center text-primary-100 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Tours</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-primary-600 rounded-full text-xs font-medium">
                {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {tour.title}
            </h1>

            <p className="text-lg text-primary-100 mb-6 max-w-3xl">
              {tour.description}
            </p>

            <div className="flex items-center space-x-6 text-primary-100">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{tour.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{tour.participants} participants</span>
              </div>
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                <span>{tour.difficulty}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="aspect-[16/9] relative">
                <PlantModel 
                  modelUrl={tourSteps[currentStep].modelUrl} 
                  name={tourSteps[currentStep].title} 
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-semibold text-gray-900">
                    {tourSteps[currentStep].title}
                  </h2>
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  {tourSteps[currentStep].description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {tourSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleStepChange(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentStep 
                            ? 'w-8 bg-primary-600' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    Step {currentStep + 1} of {tourSteps.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Tour Progress
                </h3>
                <div className="space-y-4">
                  {tourSteps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => handleStepChange(index)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        currentStep === index
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        currentStep === index
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      <ChevronRight className={`h-5 w-5 ${
                        currentStep === index
                          ? 'text-primary-600'
                          : 'text-gray-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Tour Information
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 text-primary-600 mr-2" />
                    <span>Duration: {tour.duration} minutes</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-primary-600 mr-2" />
                    <span>Participants: {tour.participants}</span>
                  </li>
                  <li className="flex items-center">
                    <Leaf className="h-5 w-5 text-primary-600 mr-2" />
                    <span>Difficulty: {tour.difficulty}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;