import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, Heart } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function ProductsPage() {
  const { products, searchQuery, setSearchQuery } = useApp();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showSearch, setShowSearch] = useState(searchParams.get('search') === 'true');

  const categories = [
    { id: 'all', name: 'All', emoji: '📱' },
    { id: 'flagship', name: 'Flagship', emoji: '⭐' },
    { id: 'budget', name: 'Budget', emoji: '💰' },
    { id: 'gaming', name: 'Gaming', emoji: '🎮' },
  ];

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Search Bar */}
          {showSearch && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search phones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>
          )}

          {/* Toggle Search */}
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="mb-6 w-full bg-white/80 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-center space-x-2 hover:bg-white/90 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Search phones...</span>
            </button>
          )}

          {/* Categories */}
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center space-x-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/80 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div className="mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-white/20"
              >
                <div className="flex space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-amber-900 text-lg">{product.name}</h3>
                      <Heart className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-amber-700 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews.length} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-pink-600">{formatPrice(product.price)}</p>
                      <div className="text-xs text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                        From ₹{Math.round(product.installmentPlans[0].monthlyPayment)}/mo
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600">No phones found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;