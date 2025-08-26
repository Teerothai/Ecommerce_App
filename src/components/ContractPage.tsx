import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Check, ArrowRight, Shield } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function ContractPage() {
  const navigate = useNavigate();
  const { cart } = useApp();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignContract = async () => {
    if (!agreedToTerms || !agreedToPrivacy || !digitalSignature.trim()) {
      alert('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate contract processing
    setTimeout(() => {
      setIsSubmitting(false);
      alert('🎉 Contract signed successfully! Welcome to Shiba Phone family!');
      navigate('/dashboard');
    }, 2000);
  };

  const totalAmount = cart.reduce((total, item) => {
    const price = item.plan ? item.plan.totalAmount : item.product.price;
    return total + price;
  }, 0);

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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📄</div>
            <h1 className="text-2xl font-bold text-amber-900 mb-2">Digital Contract</h1>
            <p className="text-amber-800">Review and sign your purchase agreement</p>
          </div>

          {/* Contract Summary */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl p-6 mb-6 text-white">
            <h2 className="text-lg font-bold mb-4">Contract Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Products:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Contract Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Terms & Conditions
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto">
              <div className="text-sm space-y-2">
                <h4 className="font-semibold">1. Purchase Agreement</h4>
                <p>By signing this contract, you agree to purchase the selected Shiba Phone products under the specified installment plan.</p>
                
                <h4 className="font-semibold">2. Payment Terms</h4>
                <p>Monthly payments must be made on or before the due date. Late payment fees may apply.</p>
                
                <h4 className="font-semibold">3. Product Warranty</h4>
                <p>All Shiba Phone products come with a 1-year manufacturer warranty.</p>
                
                <h4 className="font-semibold">4. Return Policy</h4>
                <p>Products can be returned within 7 days of delivery in original condition.</p>
                
                <h4 className="font-semibold">5. Data Privacy</h4>
                <p>Your personal information will be protected as per our privacy policy.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 text-pink-500 focus:ring-pink-400"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the <span className="text-pink-600 font-semibold">Terms and Conditions</span>
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-1 text-pink-500 focus:ring-pink-400"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <span className="text-pink-600 font-semibold">Privacy Policy</span> and data processing
                </span>
              </label>
            </div>
          </div>

          {/* Digital Signature */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Digital Signature
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type your full name as digital signature *
              </label>
              <input
                type="text"
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                required
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Legal Notice:</span> By typing your name above, you are creating a legally binding digital signature equivalent to a handwritten signature.
              </p>
            </div>
          </div>

          {/* Sign Button */}
          <button
            onClick={handleSignContract}
            disabled={!agreedToTerms || !agreedToPrivacy || !digitalSignature.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <Check className="w-6 h-6" />
                <span>Sign Contract & Complete Purchase</span>
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-600">
              🔒 This is a secure digital contract protected by encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractPage;