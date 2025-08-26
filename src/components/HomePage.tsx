import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Star, Heart, Search, Menu } from 'lucide-react';
import Header from './Header';

function HomePage() {
  const featuredProducts = [
    {
      id: '1',
      name: 'Shiba Pro Max',
      price: '₹29,999',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Shiba Lite',
      price: '₹15,999',
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.3
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative px-4 pt-8 pb-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
            <div className="text-6xl mb-4">🐕📱</div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              SHIBA Phone
            </h1>
            <p className="text-amber-800 mb-6">
              Kawaii smartphones for everyone! 
              <br />
              <span className="text-sm">Self-service shopping made easy</span>
            </p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-block"
            >
              Browse Phones 📱
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-8">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <Link
            to="/categories"
            className="bg-purple-400/80 backdrop-blur-sm rounded-2xl p-4 text-center text-white hover:bg-purple-500/80 transition-colors"
          >
            <Menu className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-semibold">Categories</span>
          </Link>
          <Link
            to="/products?search=true"
            className="bg-teal-400/80 backdrop-blur-sm rounded-2xl p-4 text-center text-white hover:bg-teal-500/80 transition-colors"
          >
            <Search className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-semibold">Search</span>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 mb-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">
            ⭐ Featured Phones
          </h2>
          <div className="space-y-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-white/20"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900">{product.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-amber-700">{product.rating}</span>
                    </div>
                    <p className="text-pink-600 font-bold mt-1">{product.price}</p>
                  </div>
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl p-6 text-center text-white">
          <div className="text-4xl mb-3">💝</div>
          <h3 className="text-lg font-bold mb-2">Special Offers Available!</h3>
          <p className="text-sm mb-4 opacity-90">
            Apply coupon codes and choose flexible installment plans
          </p>
          <Link
            to="/products"
            className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors inline-block"
          >
            View All Deals
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;