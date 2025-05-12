import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-white" />
              <span className="font-serif text-xl font-bold">Virtual Herbal Garden</span>
            </Link>
            <p className="text-primary-100 mb-6">
              Explore the fascinating world of AYUSH medicinal plants through our interactive virtual garden.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-200 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-primary-100 hover:text-white transition-colors">
                  Explore Plants
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-primary-100 hover:text-white transition-colors">
                  Virtual Tours
                </Link>
              </li>
              <li>
                <Link to="/my-garden" className="text-primary-100 hover:text-white transition-colors">
                  My Garden
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-primary-100 hover:text-white transition-colors">
                  Plant Chatbot
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">AYUSH Systems</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Ayurveda
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Yoga & Naturopathy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Unani
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Siddha
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Homeopathy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-300 mt-0.5" />
                <span className="text-primary-100">
                  AYUSH Bhawan, B-Block, GPO Complex, INA, New Delhi - 110023
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-300" />
                <span className="text-primary-100">+91 11 2465 1000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-300" />
                <span className="text-primary-100">contact@virtualherbal.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-200 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Virtual Herbal Garden. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-primary-200 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-200 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-200 text-sm hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;