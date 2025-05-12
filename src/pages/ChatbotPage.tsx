import React from 'react';
import Chatbot from '../components/chat/Chatbot';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Plane as Plant, Send } from 'lucide-react';

const ChatbotPage: React.FC = () => {
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
            <Bot className="h-12 w-12 mx-auto mb-4 text-primary-200" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Virtual Herbal Assistant
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Your AI guide to medicinal plants and traditional healing. Ask questions, identify plants, and discover
              the wisdom of AYUSH systems.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Plant className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                Plant Identification
              </h3>
              <p className="text-gray-600">
                Upload images of plants to identify them and learn about their medicinal properties in AYUSH systems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                Healing Knowledge
              </h3>
              <p className="text-gray-600">
                Ask about traditional uses, preparation methods, and benefits of medicinal plants in different systems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <Send className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                Growing Tips
              </h3>
              <p className="text-gray-600">
                Get personalized advice on cultivating medicinal herbs in your climate and garden conditions.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Chatbot />
          </motion.div>
          
          <div className="mt-12 bg-gray-50 p-8 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6 text-center">
              Example Questions to Ask
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "What are the health benefits of Tulsi?",
                "How do I grow Ashwagandha at home?",
                "Can you identify this plant from an image?",
                "What herbs are used for digestive health in Ayurveda?",
                "Tell me about the medicinal properties of Turmeric",
                "What's the difference between Ayurveda and Unani systems?",
                "What plants help with stress according to AYUSH?",
                "How is Neem used in traditional medicine?"
              ].map((question, index) => (
                <div 
                  key={index}
                  className="bg-white p-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-primary-50 hover:border-primary-200 transition-colors cursor-pointer"
                >
                  "{question}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;