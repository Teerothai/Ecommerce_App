import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowRight, Shield } from 'lucide-react';
import Header from './Header';
import { useApp } from '../context/AppContext';

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setUser({
        id: '1',
        phone: phone,
        isLoggedIn: true
      });
      setIsLoading(false);
      navigate('/personal-info');
    }, 1500);
  };

  const handleResendOTP = () => {
    // Simulate resend OTP
    alert('OTP resent successfully!');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🐕📱</div>
            <h1 className="text-2xl font-bold text-amber-900 mb-2">Welcome to SHIBA</h1>
            <p className="text-amber-800">Secure login with OTP verification</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            {step === 'phone' ? (
              <>
                <h2 className="font-bold text-amber-900 mb-6 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Enter Phone Number
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength="10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 p-3 rounded-r-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send you a 6-digit OTP for verification
                  </p>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10 || isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <h2 className="font-bold text-amber-900 mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Verify OTP
                </h2>
                
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a 6-digit OTP to <span className="font-semibold">+91 {phone}</span>
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-center text-xl tracking-widest"
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mb-4"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="flex justify-between text-sm">
                  <button
                    onClick={() => setStep('phone')}
                    className="text-pink-600 hover:text-pink-700"
                  >
                    Change Number
                  </button>
                  <button
                    onClick={handleResendOTP}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;