import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, CreditCard, Heart, Settings, LogOut, Bell } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function DashboardPage() {
  const { user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    setUser({ id: '', isLoggedIn: false });
  };

  const mockOrders = [
    {
      id: '1',
      product: 'Shiba Pro Max',
      status: 'Processing',
      amount: '₹29,999',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      product: 'Shiba Lite',
      status: 'Delivered',
      amount: '₹15,999',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'profile', name: 'Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Welcome back!</h1>
                <p className="opacity-90">
                  {user.phone ? `+91 ${user.phone}` : 'Shiba Phone User'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Orders</p>
                <p className="text-2xl font-bold">{mockOrders.length}</p>
              </div>
              <Bell className="w-6 h-6" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link
              to="/products"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/90 transition-colors border border-white/20"
            >
              <div className="text-3xl mb-2">🛍️</div>
              <span className="text-sm font-semibold text-amber-900">Shop More</span>
            </Link>
            <Link
              to="/personal-info"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/90 transition-colors border border-white/20"
            >
              <div className="text-3xl mb-2">📋</div>
              <span className="text-sm font-semibold text-amber-900">Complete Profile</span>
            </Link>
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
                <h3 className="font-bold text-amber-900 mb-4">Account Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-xl">
                    <span className="text-gray-700">Profile Status</span>
                    <span className="text-orange-600 font-medium">Incomplete</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-gray-700">Phone Verified</span>
                    <span className="text-green-600 font-medium">✓ Verified</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Total Spent</span>
                    <span className="font-bold">₹45,998</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="font-bold text-amber-900 mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{order.product}</h4>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-pink-600">{order.amount}</p>
                        <p className={`text-xs ${
                          order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div>
                <h3 className="font-bold text-amber-900 mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <span>UPI Payment</span>
                    </div>
                    <span className="text-green-600 text-sm">Default</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <span>Add Card</span>
                    </div>
                    <span className="text-pink-600 text-sm">+</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 className="font-bold text-amber-900 mb-4">Profile Settings</h3>
                <div className="space-y-3">
                  <Link
                    to="/personal-info"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <span>Personal Information</span>
                    </div>
                    <span className="text-pink-600">→</span>
                  </Link>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-gray-600" />
                      <span>Wishlist</span>
                    </div>
                    <span className="text-pink-600">0</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span>Settings</span>
                    </div>
                    <span className="text-pink-600">→</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-100 text-red-600 py-3 rounded-2xl font-semibold hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;