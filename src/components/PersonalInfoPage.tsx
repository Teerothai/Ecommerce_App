import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function PersonalInfoPage() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [formData, setFormData] = useState({
    fullName: user.name || '',
    email: user.email || '',
    dateOfBirth: '',
    address: '',
    city: '',
    pincode: '',
    occupation: '',
    monthlyIncome: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user context
    setUser(prev => ({
      ...prev,
      name: formData.fullName,
      email: formData.email
    }));
    // Navigate to contract signing
    navigate('/contract');
  };

  const isFormValid = formData.fullName && formData.email && formData.address && formData.city && formData.pincode;

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📋</div>
            <h1 className="text-2xl font-bold text-amber-900 mb-2">Personal Information</h1>
            <p className="text-amber-800">Complete your profile to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="font-bold text-amber-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="font-bold text-amber-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Address Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                      maxLength={6}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="font-bold text-amber-900 mb-4">
                Additional Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="">Select occupation</option>
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="business">Business Owner</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income
                  </label>
                  <select
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="">Select income range</option>
                    <option value="below-25k">Below ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                    <option value="above-100k">Above ₹1,00,000</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <span>Continue to Contract</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-600">
              🔒 Your information is secure and used only for processing your order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoPage;