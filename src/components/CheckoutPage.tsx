import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Smartphone, ArrowRight } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, user, setCart } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('qr');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.plan ? item.plan.totalAmount : item.product.price;
      return total + price;
    }, 0);
  };

  const handleProceedToPayment = () => {
    if (!user.isLoggedIn) {
      navigate('/login');
    } else {
      // Simulate payment success and proceed to dashboard
      navigate('/personal-info');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 text-white px-6 py-3 rounded-2xl hover:bg-pink-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">
            🛍️ Checkout Summary
          </h1>

          {/* Cart Items */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h2 className="font-bold text-amber-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex space-x-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900">{item.product.name}</h3>
                    {item.plan && (
                      <p className="text-sm text-teal-600">
                        {item.plan.months} months @ ₹{Math.round(item.plan.monthlyPayment)}/mo
                      </p>
                    )}
                    {item.coupon && (
                      <p className="text-sm text-green-600">Coupon: {item.coupon}</p>
                    )}
                    <p className="font-bold text-pink-600">
                      {formatPrice(item.plan ? item.plan.totalAmount : item.product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl p-6 mb-6 text-white">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Amount:</span>
              <span className="text-2xl font-bold">{formatPrice(calculateTotal())}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="font-bold text-amber-900 mb-4">Choose Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qr"
                  checked={paymentMethod === 'qr'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-pink-500"
                />
                <QrCode className="w-6 h-6 mr-3 text-gray-600" />
                <div>
                  <span className="font-medium">QR Code Payment</span>
                  <p className="text-sm text-gray-600">Scan and pay with any UPI app</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-pink-500"
                />
                <Smartphone className="w-6 h-6 mr-3 text-gray-600" />
                <div>
                  <span className="font-medium">Bank Transfer</span>
                  <p className="text-sm text-gray-600">Direct transfer to our account</p>
                </div>
              </label>

              <label className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-pink-500"
                />
                <CreditCard className="w-6 h-6 mr-3 text-gray-600" />
                <div>
                  <span className="font-medium">Credit/Debit Card</span>
                  <p className="text-sm text-gray-600">Pay securely with your card</p>
                </div>
              </label>
            </div>
          </div>

          {/* Login Notice for Non-logged Users */}
          {!user.isLoggedIn && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <span className="font-semibold">📱 Login Required:</span> You'll be redirected to login with OTP to complete your purchase.
              </p>
            </div>
          )}

          {/* Proceed Button */}
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>{user.isLoggedIn ? 'Proceed to Payment' : 'Login & Pay'}</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Security Info */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              🔒 Secure payment powered by Shiba Phone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;