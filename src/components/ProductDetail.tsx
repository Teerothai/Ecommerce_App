import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Play, ShoppingCart, Tag, Users } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, setCart, user } = useApp();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showReviews, setShowReviews] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    const plan = selectedPlan ? product.installmentPlans.find(p => p.id === selectedPlan) : undefined;
    const newItem = {
      product,
      plan,
      coupon: couponCode || undefined
    };
    setCart([...cart, newItem]);
    navigate('/checkout');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📱' },
    { id: 'specs', name: 'Specs', icon: '⚙️' },
    { id: 'vod', name: 'Videos', icon: '🎥' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Product Image */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold text-amber-700 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews.length} reviews)</span>
                </div>
              </div>
              <button className="p-3 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors">
                <Heart className="w-6 h-6 text-pink-500" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl p-6 mb-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{formatPrice(product.price)}</h2>
            <p className="opacity-90">Starting from ₹{Math.round(product.installmentPlans[0].monthlyPayment)}/month</p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/80 text-gray-700 hover:bg-teal-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            {activeTab === 'overview' && (
              <div>
                <h3 className="font-bold text-amber-900 mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="font-bold text-amber-900 mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Display:</span>
                    <span className="font-medium">6.7" OLED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM:</span>
                    <span className="font-medium">8GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage:</span>
                    <span className="font-medium">256GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Camera:</span>
                    <span className="font-medium">108MP</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vod' && (
              <div>
                <h3 className="font-bold text-amber-900 mb-3">Product Videos</h3>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-xl p-4 flex items-center space-x-3">
                    <Play className="w-8 h-8 text-pink-500" />
                    <div>
                      <p className="font-medium">Unboxing & First Look</p>
                      <p className="text-sm text-gray-600">5:30 mins</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-4 flex items-center space-x-3">
                    <Play className="w-8 h-8 text-pink-500" />
                    <div>
                      <p className="font-medium">Camera Test</p>
                      <p className="text-sm text-gray-600">3:45 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="font-bold text-amber-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Customer Reviews
                </h3>
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-sm">{review.userName}</span>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Installment Plans */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Choose Installment Plan
            </h3>
            <div className="space-y-3">
              {product.installmentPlans.map((plan) => (
                <label key={plan.id} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="installmentPlan"
                    value={plan.id}
                    checked={selectedPlan === plan.id}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mr-3 text-pink-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{plan.months} Months</span>
                      <span className="font-bold text-pink-600">₹{Math.round(plan.monthlyPayment)}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Total: {formatPrice(plan.totalAmount)}</span>
                      <span>{plan.interestRate}% interest</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="font-bold text-amber-900 mb-4">Apply Coupon Code</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white"
              />
              <button className="px-4 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors">
                Apply
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Available codes: SHIBA10, WELCOME20</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Add to Cart & Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;