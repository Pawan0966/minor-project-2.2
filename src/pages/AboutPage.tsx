import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Leaf, BookOpen, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
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
              About Our Virtual Herbal Garden
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Bridging traditional knowledge with modern technology to preserve and share the wisdom of AYUSH medicinal systems.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-gray-900">Our Mission</h2>
            <p>
              At Virtual Herbal Garden, our mission is to preserve, document, and share the rich botanical heritage of AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy) systems through an immersive digital platform. We aim to make traditional plant knowledge accessible to everyone, regardless of geographical location or background.
            </p>
            <p>
              We believe that the ancient wisdom contained in these traditional healing systems has profound relevance in today's world. By creating a comprehensive, interactive resource, we hope to inspire a new generation of healers, researchers, and enthusiasts to explore and appreciate the profound connection between plants and human health.
            </p>
            
            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12">What We Offer</h2>
            <p>
              Our Virtual Herbal Garden provides a unique educational experience through:
            </p>
            <ul>
              <li>Interactive 3D models of medicinal plants that allow for detailed examination</li>
              <li>Comprehensive information on botanical characteristics, medicinal uses, and cultivation methods</li>
              <li>High-quality images and multimedia content to enhance the learning experience</li>
              <li>Advanced search and filter options to easily find specific plants</li>
              <li>Guided virtual tours focused on specific health themes or healing traditions</li>
              <li>Personalized features to save favorites and take notes for your own learning journey</li>
              <li>AI-powered chatbot to answer questions and provide plant identification</li>
            </ul>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Heart className="h-8 w-8 text-primary-600" />,
                title: "Preserving Traditions",
                description: "Documenting and safeguarding traditional plant knowledge for future generations."
              },
              {
                icon: <Users className="h-8 w-8 text-primary-600" />,
                title: "Building Community",
                description: "Creating a global community interested in traditional plant medicine and healing practices."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-primary-600" />,
                title: "Educational Resource",
                description: "Providing an accessible learning platform for students, practitioners, and enthusiasts."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">The AYUSH Systems</h2>
            <div className="bg-white p-8 rounded-xl shadow-md mb-16">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  {
                    name: "Ayurveda",
                    description: "Ancient Indian system of medicine focusing on holistic health through diet, herbs, and lifestyle.",
                    color: "bg-primary-100 text-primary-800"
                  },
                  {
                    name: "Yoga",
                    description: "System promoting physical, mental, and spiritual well-being through physical postures, breath control, and meditation.",
                    color: "bg-secondary-100 text-secondary-800"
                  },
                  {
                    name: "Unani",
                    description: "Traditional medicine system originating from Greece, emphasizing the four humors and natural treatments.",
                    color: "bg-accent-100 text-accent-800"
                  },
                  {
                    name: "Siddha",
                    description: "Ancient Tamil system focusing on the balance of bodily elements using herbal preparations and minerals.",
                    color: "bg-success-100 text-success-800"
                  },
                  {
                    name: "Homeopathy",
                    description: "Medical system based on the principle of 'like cures like' using highly diluted substances.",
                    color: "bg-warning-100 text-warning-800"
                  }
                ].map((system, index) => (
                  <div key={index} className={`p-5 rounded-lg ${system.color}`}>
                    <h3 className="font-serif text-lg font-semibold mb-2">
                      {system.name}
                    </h3>
                    <p className="text-sm">
                      {system.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Amrita Sharma",
                  role: "Ayurvedic Physician & Botanical Advisor",
                  image: "https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  name: "Prof. Rajendra Kumar",
                  role: "Medicinal Plant Researcher",
                  image: "https://images.pexels.com/photos/5325948/pexels-photo-5325948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  name: "Meera Patel",
                  role: "3D Modeling & Digital Experience Lead",
                  image: "https://images.pexels.com/photos/3782123/pexels-photo-3782123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 mb-3">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-primary-50 p-8 rounded-xl text-center"
          >
            <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Be part of our growing community dedicated to preserving and sharing traditional plant knowledge. Connect with experts, enthusiasts, and learners from around the world.
            </p>
            <button className="btn btn-primary px-8 py-3">
              Subscribe to Newsletter
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;