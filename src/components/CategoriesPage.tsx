import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Gamepad2, DollarSign } from 'lucide-react';
import Header from './Header';

function CategoriesPage() {
  const categories = [
    {
      id: 'flagship',
      name: 'Flagship Phones',
      description: 'Premium smartphones with cutting-edge features',
      icon: '⭐',
      gradient: 'from-pink-400 to-purple-400',
      products: 1
    },
    {
      id: 'budget',
      name: 'Budget-Friendly',
      description: 'Great value phones for everyday use',
      icon: '💰',
      gradient: 'from-green-400 to-teal-400',
      products: 1
    },
    {
      id: 'gaming',
      name: 'Gaming Phones',
      description: 'High-performance devices for mobile gaming',
      icon: '🎮',
      gradient: 'from-purple-400 to-indigo-400',
      products: 1
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Cases, chargers, and more',
      icon: '📱',
      gradient: 'from-orange-400 to-pink-400',
      products: 0
    }
  ];

  const featuredCollections = [
    {
      title: 'Best Sellers',
      subtitle: 'Most popular this month',
      emoji: '🔥',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Latest Shiba phones',
      emoji: '✨',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Special Offers',
      subtitle: 'Limited time deals',
      emoji: '💝',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📱</div>
            <h1 className="text-2xl font-bold text-amber-900 mb-2">Browse Categories</h1>
            <p className="text-amber-800">Find your perfect Shiba Phone</p>
          </div>

          {/* Featured Collections */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-amber-900 mb-4">Featured Collections</h2>
            <div className="space-y-3">
              {featuredCollections.map((collection, index) => (
                <Link
                  key={index}
                  to="/products"
                  className={`block ${collection.bgColor} rounded-2xl p-4 hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{collection.emoji}</div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${collection.textColor}`}>{collection.title}</h3>
                      <p className={`text-sm opacity-80 ${collection.textColor}`}>{collection.subtitle}</p>
                    </div>
                    <div className={`${collection.textColor}`}>→</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-amber-900 mb-4">Shop by Category</h2>
            <div className="space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-white/20"
                >
                  <div className={`bg-gradient-to-r ${category.gradient} rounded-2xl p-4 mb-4`}>
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">{category.icon}</div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                        {category.products} product{category.products !== 1 ? 's' : ''}
                      </span>
                      <span className="text-pink-600 font-semibold">Browse →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-amber-900 mb-4">Quick Filters</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/products?sort=price-low"
                className="bg-blue-50 rounded-xl p-3 text-center hover:bg-blue-100 transition-colors"
              >
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Lowest Price</span>
              </Link>
              
              <Link
                to="/products?sort=rating"
                className="bg-yellow-50 rounded-xl p-3 text-center hover:bg-yellow-100 transition-colors"
              >
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Top Rated</span>
              </Link>
              
              <Link
                to="/products?category=gaming"
                className="bg-purple-50 rounded-xl p-3 text-center hover:bg-purple-100 transition-colors"
              >
                <Gamepad2 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Gaming</span>
              </Link>
              
              <Link
                to="/products?new=true"
                className="bg-green-50 rounded-xl p-3 text-center hover:bg-green-100 transition-colors"
              >
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <span className="text-sm font-medium text-green-800">Trending</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;