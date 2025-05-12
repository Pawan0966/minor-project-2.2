import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <img 
          src="https://images.pexels.com/photos/7345444/pexels-photo-7345444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Page not found" 
          className="w-64 h-64 mx-auto mb-8 rounded-full object-cover"
        />
        <h1 className="font-serif text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Perhaps you can find what you're looking for in our Virtual Herbal Garden.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="btn bg-primary-600 text-white hover:bg-primary-700 inline-flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
          <Link 
            to="/explore" 
            className="btn border border-primary-600 text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center"
          >
            <Search className="mr-2 h-5 w-5" />
            Explore Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;