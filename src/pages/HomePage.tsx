import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Map, BookOpen, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-6 w-6 text-primary-600" />,
      title: 'Explore Plants',
      description: 'Discover a vast collection of medicinal plants used in AYUSH systems with detailed information and interactive 3D models.',
      link: '/explore',
    },
    {
      icon: <Map className="h-6 w-6 text-primary-600" />,
      title: 'Virtual Tours',
      description: 'Take guided virtual tours through themed collections focusing on specific health benefits or traditional systems.',
      link: '/tours',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary-600" />,
      title: 'Personal Garden',
      description: 'Create your own virtual garden by bookmarking plants and adding personal notes for future reference.',
      link: '/my-garden',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary-600" />,
      title: 'Plant Chatbot',
      description: 'Get instant answers to your questions about medicinal herbs, their uses, and cultivation methods.',
      link: '/chatbot',
    },
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/4947741/pexels-photo-4947741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white z-0"></div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
                Welcome to the Virtual Herbal Garden
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Explore the Healing Power of <span className="text-primary-600">AYUSH</span> Plants
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Discover the rich botanical heritage of traditional Indian medicine systems through our interactive digital garden. Learn, explore, and connect with medicinal plants like never before.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/explore" className="btn btn-primary px-8 py-3">
                  Start Exploring
                </Link>
                <Link to="/about" className="btn btn-outline px-8 py-3">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <a 
            href="#features" 
            className="animate-bounce p-1 bg-white rounded-full shadow-md"
          >
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Leaf className="h-10 w-10 text-primary-600 mx-auto mb-4" />
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Explore Our Features
            </h2>
            <p className="text-lg text-gray-700">
              Our Virtual Herbal Garden offers a range of interactive features to help you explore and learn about medicinal plants used in AYUSH systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    <span>Explore</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Plants Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                Featured Medicinal Plants
              </h2>
              <p className="text-gray-600">
                Discover these powerful healing herbs from traditional medicine systems
              </p>
            </div>
            <Link to="/explore" className="btn btn-outline">
              View All Plants
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Tulsi (Holy Basil)",
                botanicalName: "Ocimum sanctum",
                image: "https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                system: "Ayurveda",
                description: "Sacred plant with powerful adaptogenic and immune-boosting properties."
              },
              {
                name: "Ashwagandha",
                botanicalName: "Withania somnifera",
                image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                system: "Ayurveda",
                description: "Ancient adaptogenic herb that helps reduce stress and promotes vitality."
              },
              {
                name: "Turmeric",
                botanicalName: "Curcuma longa",
                image: "https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                system: "Ayurveda, Unani, Siddha",
                description: "Golden spice with powerful anti-inflammatory and antioxidant properties."
              }
            ].map((plant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {plant.system}
                  </span>
                </div>
                
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-3">
                    {plant.botanicalName}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {plant.description}
                  </p>
                  <Link
                    to="/plant/1"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    <span>Learn More</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Virtual Tours Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Explore Guided Virtual Tours
            </h2>
            <p className="text-lg text-gray-700">
              Take guided tours through our virtual herbal garden focused on specific themes and health benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Digestive Health",
                image: "https://images.pexels.com/photos/5938413/pexels-photo-5938413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                plants: 12,
                description: "Discover plants that aid digestion and promote gut health across Ayurveda and Unani systems."
              },
              {
                title: "Immunity Boosters",
                image: "https://images.pexels.com/photos/7474209/pexels-photo-7474209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                plants: 15,
                description: "Explore herbs and plants known for strengthening the immune system and preventing illness."
              },
              {
                title: "Stress Management",
                image: "https://images.pexels.com/photos/4099099/pexels-photo-4099099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                plants: 10,
                description: "Learn about adaptogenic plants that help reduce stress and promote mental wellbeing."
              }
            ].map((tour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white font-medium">
                      {tour.plants} Plants
                    </span>
                    <h3 className="text-white font-serif text-xl font-semibold">
                      {tour.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-gray-600 mb-4">
                    {tour.description}
                  </p>
                  <Link
                    to="/tours"
                    className="inline-flex items-center text-secondary-600 hover:text-secondary-800 font-medium"
                  >
                    <span>Start Tour</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold mb-6">
              Begin Your Herbal Journey Today
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Explore our virtual garden, learn about medicinal plants, and discover the healing traditions of AYUSH systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/explore" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3">
                Explore Plants
              </Link>
              <Link to="/chatbot" className="btn border border-white text-white hover:bg-primary-600 px-8 py-3">
                Chat with Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;